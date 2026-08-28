import { limitedActions, limits, name_map_reverse, skill_requirements } from "./data.js";

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
                    return () => Math.floor(exp() * (IdleLoopsAP.slotData.skill_exp_mult ?? 1));
                }
                exp *= (IdleLoopsAP.slotData.skill_exp_mult ?? 1);
                return Math.floor(exp);
            }
        });
        view.requestUpdate("adjustExpGain", action);
    }
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
    // This is called a bit, probably a good refactor to only update these when we get an item.
    // But for now at the very least, 'a bit' is only once per loop restart (...per limited action), so it's not going to cause bad performance
    const count = new Proxy({}, {
        get: (target, prop) => {
            if (prop in target || !(prop in limitedActions)) {
                return target[prop];
            } else {
                const bulk = limitedActions[prop]?.bulk || 1;
                const bulknum = bulk * state[`Z${limitedActions[prop].town + 1} - x${bulk} ${String(prop)}`];
                const num = state[`Z${limitedActions[prop].town + 1} - ${String(prop)}`] + bulknum;
                Reflect.set(target, prop, num);
                return num;
            }
        }
    });

    let extra = state["Progressive Lootable"];
    for (const [name, limit] of limits) {
        if (limitedActions[name].town > IdleLoopsAP.slotData.goal) {
            continue;
        }
        if (count[name] < limit) {
            extra -= Math.ceil((limit - count[name]) / limitedActions[name].bulk);
            if (extra > 0) {
                count[name] = limit;
            } else {
                // Reminder extra is negative in this branch
                count[name] = limit + (extra * limitedActions[name].bulk);
                break;
            }
        }
    }

    return count[varName];
}

export function lastEffectiveLimited(IdleLoopsAP, state, goalVarName: string = "") {
    const count = new Proxy({}, {
        get: (target, prop) => {
            if (prop in target || !(prop in limitedActions)) {
                return target[prop];
            } else {
                const bulk = limitedActions[prop]?.bulk || 1;
                const bulknum = bulk * state[`Z${limitedActions[prop].town + 1} - x${bulk} ${String(prop)}`];
                const num = state[`Z${limitedActions[prop].town + 1} - ${String(prop)}`] + bulknum;
                Reflect.set(target, prop, num);
                return num;
            }
        }
    });

    let seenGoal = !goalVarName;

    let extra = state["Progressive Lootable"];
    for (const [name, limit] of limits) {
        if (limitedActions[name].town > IdleLoopsAP.slotData.goal) {
            continue;
        }
        if (name === goalVarName) {
            seenGoal = true;
        }
        if (count[name] < limit) {
            extra -= Math.ceil((limit - count[name]) / limitedActions[name].bulk);
            if (extra > 0) {
                count[name] = limit;
            } else {
                // Reminder extra is negative in this branch
                count[name] = limit + (extra * limitedActions[name].bulk);
                if (seenGoal) {
                    return name;
                } else {
                    return goalVarName;
                }
            }
        }
    }
    return "Nothing";
}
