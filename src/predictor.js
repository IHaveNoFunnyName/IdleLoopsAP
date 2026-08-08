import { new_actions_for_predictor } from "./data.js";

export function enable_predictor() {
    setOption("predictor", true);
}

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

        if (!predictor.cache) {
            // We're on dmchurch but predictor isn't enabled
            return false;
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
                let extra_mana = 50 * IdleLoopsAP.state["Filler - 50 Starting Mana"];
                state.resources.mana += extra_mana;
                state.resources.gold += IdleLoopsAP.state["Filler - 1 Starting Gold"];
                state.resources.glasses = IdleLoopsAP.state["Z1 - BuyGlasses"] > 1;

                let time = extra_mana / getSpeedMult(state.resources.town);
                state.resources.totalTicks += time;
                state.resources.actionTicks += time;

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

        document.addEventListener("predictor-update", () => {
            const string = predictor.totalDisplay.innerHTML;
            const split = string.split(" | ");
            if (/^[-\d.]+$/.test(split[0])) {
                split[0] = intToString(parseInt(split[0]) + (IdleLoopsAP.state["Filler - 50 Starting Mana"] * 50));
                predictor.totalDisplay.innerHTML = split.join(" | ");
            }
        });

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
            return _getTotalBonusXP.apply(this, arguments) * IdleLoopsAP.expMult;
        }

    }
    return predictor;
}

export function predictor_add_actions(predictor) {
    if (predictor) {
        for (const name in new_actions_for_predictor) {
            predictor.predictions[name] = new predictor.predictions["Wander"].constructor(name, new_actions_for_predictor[name]);
        }
    }
}
