import { hook_action, effectiveLimited } from "./action.js"

// Since this funtion is basically static to the function we use window.IdleLoopsAP rather than it handed down via property.
// It's that or define it again each call.
// We rewrote the second half of this function

// Weirdly it's called finishRegular but it's for handing lootables
const finishRegular = function (varName, rewardRatio, rewardFunc) {
    // error state, negative numbers.
    if (this[`total${varName}`] - this[`checked${varName}`] < 0) {
        this[`checked${varName}`] = this[`total${varName}`];
        this[`good${varName}`] = Math.floor(this[`total${varName}`] / rewardRatio);
        this[`goodTemp${varName}`] = this[`good${varName}`];
        console.log("Error state fixed");
    }

    // Add player having " - Search" to vanilla check lootable logic/behaviour (minus the commented line)
    // If the player has " - Search"es disabled, what that really does is precollect them all so this still is correct behaviour
    // Add an early return so it can flow to looting lootables in any other case
    const searchToggler = document.getElementById(`searchToggler${varName}`);
    if (window.IdleLoopsAP.state[`Z${this.index + 1} - ${varName} - Search`] && this[`total${varName}`] - this[`checked${varName}`] > 0 && ((searchToggler && !searchToggler.checked) || this[`goodTemp${varName}`] <= 0)) {
        this[`checked${varName}`]++;
        if (this[`checked${varName}`] % rewardRatio === 0) {
            //this[`lootFrom${varName}`] += rewardFunc();
            this[`good${varName}`]++;
        }
        view.requestUpdate("updateRegular", { name: varName, index: this.index });
        return;
    }

    if (this[`goodTemp${varName}`] > 0) {
        this[`goodTemp${varName}`]--;
        this[`lootFrom${varName}`] += rewardFunc();
    }
    view.requestUpdate("updateRegular", { name: varName, index: this.index });
}

export function hook_zone(IdleLoopsAP, town) {
    for (const action of towns[town].totalActionList) {
        hook_action(IdleLoopsAP, action);
    }

    return new Proxy(towns[town], {
        get: (target, prop, receiver) => {
            // Item: Number of Limited Actions
            // Overwrite whatever the game thinks it has with the number of checks of this type recieved
            if (typeof prop === "string" && prop.startsWith("good")) {
                const name = prop.substring(4);
                if (!name.startsWith("Temp")) {
                    return effectiveLimited(IdleLoopsAP, IdleLoopsAP.state, name);
                }
            } else if (typeof prop === "string" && prop === "finishRegular") {
                return finishRegular.bind(receiver);
            }
            return Reflect.get(target, prop, receiver);
        },
        set: (target, prop, value, receiver) => {

            // Location: Gaining a lootable Limited Action
            // The game function that rewards one uses ++, which means it'll read from the proxy
            // and give a wrong answer, so we need to calculate the # manually

            // Actually i really don't have to do this, all it does is give a better location name
            // (i.e. "...Pots - #1", "...Pots - #2" vs "...Pots - #10", "...Pots - #20")
            // Whatever i realised that after finishing
            if (value > 0 && typeof prop === "string" && prop.startsWith("good")) {
                const name = prop.substring(4);
                if (!name.startsWith("Temp")) {
                    const rewardRatio = limitedActions[name].ratio;
                    IdleLoopsAP.location(`Z${town + 1} - ${name} - #${Math.floor(target['checked' + name] / rewardRatio)}`);
                    return true;
                }
            }

            // Location: Gaining a Progress Bar %
            // We could get this by overwriting town.finishProgress, but right now i prefer to do as much as possible via proxies
            // Just documenting alternate solutions to get a head start later if this ends up broken
            if (typeof prop === "string" && prop.startsWith("exp")) {
                const name = prop.substring(3);
                const prevLevel = target.getLevel(name);
                Reflect.set(target, prop, value, receiver);
                const newLevel = target.getLevel(name);
                for (let i = prevLevel + 1; i <= newLevel; i++) {
                    if (bar_locations.includes(i)) {
                        IdleLoopsAP.location(`Z${town + 1} - ${name} - ${i}%`);
                    }
                }
                return true;
            }

            // Location: Finishing a Multipart action
            // The game doesn't seem to store highest completion so RIP to sending missed checks on reconnection
            // At least doing your highest completion again is trivial
            if (value > 0 && typeof prop === "string" && prop.endsWith("LoopCounter")) {
                const name = prop.substring(0, prop.length - 11);
                // Silly way to not send checks for buffs, just don't put them in segments
                if (name in segments) {
                    IdleLoopsAP.location(`Z${town + 1} - ${name} - Completion #${value / segments[name]}`);
                }
            }

            return Reflect.set(target, prop, value, receiver);
        }
    });
}