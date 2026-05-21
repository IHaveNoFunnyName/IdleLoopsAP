
(async function() {
    'use strict';

    const AP = await import("https://IHaveNoFunnyName.github.io/IdleLoopsAP/archipelago.min.js");

    class IdleLoopsAP_class {
        state = {"0Pots": 3};
        setup() {
            // who cares about restoring the originals
            // a 'disconnect' button can refresh the page until it's time to do stuff 'properly'

            // towns is in global scope but not in window.towns? idk
            // i'd really prefer it to be obvious when i'm using global scope
            for(const town in towns) {
                towns[town] = new Proxy(towns[town], {
                    get: (target, prop, receiver) => {
                        if (town == 0 && prop === "goodPots") return this.state["0Pots"];
                        return Reflect.get(target, prop, receiver);
                    },
                    set: (target, prop, value, receiver) => {
                        if (value > 0 && town == 0 && prop === "goodPots") {
                            let rewardRatio = 10;
                            this.location(prop + " " + Math.floor(value / rewardRatio));
                            return true;
                        }
                        return Reflect.set(target, prop, value, receiver);
                    }
                });
            }
            window.markActionsComplete = function(loopCompletedActions) {
                loopCompletedActions.forEach(action => {
                    let varName = Action[withoutSpaces(action.name)].varName;
                    if (!completedActions.includes(varName)) {
                        window.IdleLoopsAP.log(`Marking ${varName} as completed`);
                        completedActions.push(varName);
                    }
                });
            }
        }

        location(x) {
            console.log(x);
        }
        item(x) {
            this.state["0Pots"] = x;
            view.updateRegular({name: "Pots", index: 0});
        }
    }
    window.IdleLoopsAP = new IdleLoopsAP_class();
})();