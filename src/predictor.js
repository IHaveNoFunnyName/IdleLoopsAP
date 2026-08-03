import { new_actions_for_predictor } from "./data.js";

export function hook_predictor(IdleLoopsAP) {
    // If the Predictor is installed, hook into it to handle starting items
    // Requires the predictor to already be initialised. Skill issue if you click it before the page fully loads. Be worse.
    // There's nothing specific to .predict that we need, it's that the whole predictor is mostly one big function except for this ONE PART that gets called with state
    var predictor = false;
    if (typeof Koviko !== "undefined") {
        if (Koviko.predictor) {
            predictor = Koviko.predictor;
            console.log("AP: Forcing local predictor, ignore next error")
            Koviko.predictor.handleWorkerMessage({ data: { type: "error" } })
        } else {
            predictor = Koviko;
        }

        function proxify(skills) {
            return new Proxy(skills, {
                set: (target, prop, value) => {
                    const toAdd = value - target[prop];
                    target[prop] += toAdd * (IdleLoopsAP.slotData.skill_exp_mult);
                    return true;
                }
            });
        }

        const predict = function (prediction, state) {
            if (Object.values(state.stats).every(stat => stat === 0)) {
                state.resources.mana += (50 * IdleLoopsAP.state["Filler - 50 Starting Mana"]);
                state.resources.gold += IdleLoopsAP.state["Filler - 1 Starting Gold"]

                // Unlike the note with handling skill exp mult in action.js
                state.skills = proxify(state.skills);
            }
            // Update the amount of ticks necessary to complete the action, but only once at the start of the action
            prediction.updateTicks(prediction.action, state.stats, state);

            // Perform all ticks in succession
            for (let ticks = 0; ticks < prediction.ticks(); ticks++) {
                state.resources.mana--;
                if (state.resources.mana >= 0) {
                    if (!this.tick(prediction, state)) break;
                }
            }
        }

        // ...And the skill exp mult breaks the cache as structuredClone fails on a Proxy
        // So - if it exists with probably a way too safe check -
        // pick the skills object out and spread it to grab all values
        // then put it back in after just in case (because it's passed by reference)
        // (I didn't check if that's actually needed)

        // Skills is no longer a real word to me wow
        const wrap = function (callable) {
            return function () {
                let oldSkills = false
                const data = arguments[arguments.length - 1];
                if (data && data[0] && data[0].skills) {
                    oldSkills = data[0].skills;
                    data[0].skills = { ...data[0].skills };
                }
                const result = callable.apply(this, arguments);
                if (oldSkills) data[0].skills = oldSkills;
                return result;
            }
        }
        predictor.cache.reset = wrap(predictor.cache.reset);
        predictor.cache.add = wrap(predictor.cache.add);
        predictor.cache._next = predictor.cache.next;
        predictor.cache.next = (key) => {
            const data = predictor.cache._next(key);
            if (data && data[0] && data[0].skills) {
                data[0].skills = proxify(data[0].skills);
            }
            return data;
        }

        predictor.predict = predict;
        const _getTotalBonusXP = predictor.predictions["Wander"].constructor.prototype.getTotalBonusXP;
        predictor.predictions["Wander"].constructor.prototype.getTotalBonusXP = function () {
            return _getTotalBonusXP.apply(this, arguments) * (IdleLoopsAP.slotData.stat_exp_mult * (1 + (0.1 * IdleLoopsAP.state["Filler - +0.1 Exp Multiplier"])));
        }

    }
    return predictor;
}

export function predictor_add_actions(predictor) {
    for (const name in new_actions_for_predictor) {
        predictor.predictions[name] = new predictor.predictions["Wander"].constructor(name, new_actions_for_predictor[name]);
    }
}