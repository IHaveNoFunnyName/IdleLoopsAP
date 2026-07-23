export function hook_predictor(ap_state) {
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
        const predict = function (prediction, state) {
            if (Object.values(state.stats).every(stat => stat === 0)) {
                state.resources.mana += (50 * ap_state["Filler - 50 Starting Mana"]);
                state.resources.gold += ap_state["Filler - 1 Starting Gold"]
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
        predictor.predict = predict;
    }
    return predictor;
}