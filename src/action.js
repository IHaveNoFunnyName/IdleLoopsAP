import { setup_scout } from "./scout.js";

export function hook_action(IdleLoopsAP, action) {

    action.visible = function () {
        return unlocked(IdleLoopsAP, IdleLoopsAP.state, this);
    }
    action.unlocked = function () {
        return unlocked(IdleLoopsAP, IdleLoopsAP.state, this);
    }

    // I decided to remove the "Zx" suffix from actions like buymana on the AP side, because it's redundent with the "Zx - blah" notation 
    let name = action.varName.startsWith("BuyMana") ? `BuyMana` : action.varName;
    action._finish = action.finish;
    action.finish = function () {
        IdleLoopsAP.location(`Z${action.townNum + 1} - ${name}`);
        if (this.varName == IdleLoopsAP.goalAction) {
            if (this.varName == "FaceJudgement") {
                // Thank you global scope (for once)
                if (resources.reputation >= 50 || resources.reputation <= -50) {
                    IdleLoopsAP.client.goal();
                    this.finish = this._finish;
                }
                // Early exit to not unhook if the action fails
                return this._finish();
            } else {
                IdleLoopsAP.client.goal();
            }
        }
        // We only need this for first finish locations
        // So unhooking stops a bunch of processsing on the most common occurance in the game.
        this.finish = this._finish;
        return this._finish();
    }

    setup_scout(IdleLoopsAP, action);
}

// TODO: If we recieve a hint for a locked action, make it visible with text of the hint?
function unlocked(IdleLoopsAP, state, action) {
    let defaultVisible = false;
    if (action.type == "limited") {
        defaultVisible = effectiveLimited(IdleLoopsAP, state, action.varName) > 0 || (towns[action.townNum][`total${action.varName}`] && `Z${action.townNum + 1} - ${action.varName} - Search` in state);
    }
    return defaultVisible || `Z${action.townNum + 1} - ${action.varName}` in state;
}

// Unsure if to have these two here on in a utils.js, eh
export function effectiveLimited(IdleLoopsAP, state, varName) {
    let extra = state["Filler - Progressive Lootable"];
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
            extra -= Math.max(0, limitedObj.max - state[`Z${limitedObj.town + 1} - ${limited}`]);
            if (extra <= 0) {
                return state[`Z${limitedObj.town + 1} - ${limited}`] + oldExtra;
            } else {
                return limitedObj.max;
            }
        }
        if (varName === limited) {
            return state[`Z${limitedObj.town + 1} - ${limited}`];
        }
        extra -= Math.max(0, limitedObj.max - state[`Z${limitedObj.town + 1} - ${limited}`]);
        if (extra <= 0) {
            break;
        }
        oldExtra = extra;
    }

    return state[`Z${limitedActions?.[varName]?.town + 1} - ${varName}`];
}

export function lastEffectiveLimited(IdleLoopsAP, state, endVarName) {
    let extra = state["Filler - Progressive Lootable"];
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
        extra -= Math.max(0, limitedObj.max - state[`Z${limitedObj.town + 1} - ${limited}`]);
        if (extra <= 0) {
            return endVarName === limited || typeof endVarName === "undefined" ? limited : false;
        }
        if (endVarName === limited) {
            return false;
        }
        oldExtra = extra;
    }
}
