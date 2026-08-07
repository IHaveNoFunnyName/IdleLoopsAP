import { setup_scout } from "./scout.js";
import { limitedActions, name_map_reverse, skill_requirements } from "./data.js";

export function hook_action(IdleLoopsAP, action) {

    action.visible = function () {
        return unlocked(IdleLoopsAP, IdleLoopsAP.state, this);
    }
    if (IdleLoopsAP.slotData.logic_vanilla_all) {
        action._unlocked = action.unlocked;
        action.unlocked = function () {
            return unlocked(IdleLoopsAP, IdleLoopsAP.state, this) && this._unlocked();
        }
    } else {
        if (IdleLoopsAP.slotData.logic_vanilla && action.varName in skill_requirements) {
            const skill_req = skill_requirements[action.varName];
            action.unlocked = function () {
                return unlocked(IdleLoopsAP, IdleLoopsAP.state, this) && skill_req()
            }
        } else {
            action.unlocked = function () {
                return unlocked(IdleLoopsAP, IdleLoopsAP.state, this);
            }
        }
    }

    // I decided to remove the "Zx" suffix from actions like buymana on the AP side, because it's redundent with the "Zx - blah" notation 
    let name = action.varName.startsWith("BuyMana") ? `BuyMana` : action.varName;
    name = name.startsWith("APShop") ? "APShop" : name;
    action._finish = action.finish;
    action.finish = function () {

        if (name === "APShop") {
            IdleLoopsAP.location(IdleLoopsAP.nextShop(action.townNum)[0]);
            return;
        }

        IdleLoopsAP.location(`Z${action.townNum + 1} - ${name_map_reverse[name]}`);
        if (this.varName == IdleLoopsAP.goalAction) {
            if (this.varName == "FaceJudgement") {
                // Thank you global scope (for once)
                if (resources.reputation >= 50 || resources.reputation <= -50) {
                    IdleLoopsAP.client.goal();
                    this.finish = this._finish;
                } else {
                    // Early exit to not unhook if the action fails
                    return this._finish();
                }
            } else {
                IdleLoopsAP.client.goal();
            }
        }
        // We only need this for first finish locations
        // So unhooking stops a bunch of processsing on the most common occurance in the game.'
        // It seems like it's not persisting across loops, but it is only trying once in a loop
        // i guess something in the game copies actions into the list and processes them there.
        this.finish = this._finish;
        return this._finish();
    }

    // Hooking in here instead of overwriting a higher level "addSkillExp()"
    if ("skills" in action) {
        action.skills = new Proxy(action.skills, {
            get: (target, prop, receiver) => {
                let exp = Reflect.get(target, prop, receiver);
                if (typeof exp === "function") {
                    exp = exp();
                }
                exp *= IdleLoopsAP.slotData.skill_exp_mult;
                return exp;
            }
        });
        view.requestUpdate("adjustExpGain", action);
    }

    setup_scout(IdleLoopsAP, action);
}

function unlocked(IdleLoopsAP, state, action) {
    let defaultVisible = false;
    if (action.type == "limited") {
        defaultVisible = effectiveLimited(IdleLoopsAP, state, action.varName) > 0 || (towns[action.townNum][`total${action.varName}`] && `Z${action.townNum + 1} - ${action.varName} - Search` in state);
    }
    return defaultVisible || `Z${action.townNum + 1} - ${action.varName}` in state;
}

// Unsure if to have these two here on in a zone.js, eh
export function effectiveLimited(IdleLoopsAP, state, varName) {
    let extra = state["Progressive Lootable"];
    let oldExtra = extra;

    // Edge case for LQuests, we want an extra 'fake' LQuests with max 2, to guarantee 2 rep.
    if ((state["Z1 - LQuests"]) < 2) {
        extra -= Math.max(0, 2 - state["Z1 - LQuests"]);
        if (extra <= 0) {
            if (varName === "LQuests") {
                return (state["Z1 - LQuests"]) + oldExtra;
            } else {
                return state[`Z${limitedActions?.[varName]?.town + 1} - ${varName}`];
            }
        }
        // Edge case for the edge case - if we somehow managed to cap SQuests with Progressive before finding 2 LQuests,
        // we don't want to double use progressives on LQuests.
        if (oldExtra !== extra && (state["Z1 - SQuests"] + extra >= 20)) {
            extra += oldExtra - extra;
        } else if (varName === "LQuests") {
            // This path is reached if we have enough to get 2 LQuests but not enough to get 20 SQuests, to which we always return 2
            return 2;
        }
        oldExtra = extra;
    }

    for (const limited in limitedActions) {

        if (limitedActions[limited].town > IdleLoopsAP.slotData.goal) {
            continue;
        }

        const limitedObj = limitedActions[limited];
        if (varName === limited) {
            extra -= Math.max(0, limitedObj.max - (state[`Z${limitedObj.town + 1} - ${limited}`] + (state[`Z${limitedObj.town + 1} - x${limitedObj.bulk} ${limited}`] * limitedObj.bulk)));
            if (extra <= 0) {
                return (state[`Z${limitedObj.town + 1} - ${limited}`] + (state[`Z${limitedObj.town + 1} - x${limitedObj.bulk} ${limited}`] * limitedObj.bulk)) + (oldExtra * limitedObj.bulk);
            } else {
                return limitedObj.max;
            }
        }
        extra -= Math.max(0, limitedObj.max - ((state[`Z${limitedObj.town + 1} - ${limited}`] + (state[`Z${limitedObj.town + 1} - x${limitedObj.bulk} ${limited}`] * limitedObj.bulk)) / limitedObj.bulk));
        if (extra <= 0) {
            break;
        }
        oldExtra = extra;
    }
    const limitedObj = limitedActions[varName];
    if (!limitedObj) {
        return 0;
    }
    return state[`Z${limitedObj.town + 1} - ${varName}`] + (state[`Z${limitedObj.town + 1} - x${limitedObj.bulk} ${varName}`] * limitedObj.bulk);
}

export function lastEffectiveLimited(IdleLoopsAP, state, endVarName) {
    let extra = state["Progressive Lootable"];
    let oldExtra = extra;

    if ((state["Z1 - LQuests"]) < 2) {
        extra -= Math.max(0, 2 - state["Z1 - LQuests"]);
        if (extra <= 0) {
            if (endVarName === "LQuests" || typeof endVarName === "undefined") {
                return "LQuests";
            }
            return false;
        }
        if (oldExtra !== extra && (state["Z1 - SQuests"] + extra >= 20)) {
            extra += oldExtra - extra;
        }
    }

    for (const limited in limitedActions) {

        if (limitedActions[limited].town > IdleLoopsAP.slotData.goal) {
            continue;
        }

        const limitedObj = limitedActions[limited];
        extra -= Math.max(0, limitedObj.max - ((state[`Z${limitedObj.town + 1} - ${limited}`] + (state[`Z${limitedObj.town + 1} - x${limitedObj.bulk} ${limited}`] * limitedObj.bulk)) / limitedObj.bulk));
        if (extra <= 0) {
            return endVarName === limited || typeof endVarName === "undefined" ? limited : false;
        }
        if (endVarName === limited) {
            return false;
        }
        oldExtra = extra;
    }
}
