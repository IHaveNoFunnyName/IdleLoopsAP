export function ap_load(name, seed, bonus) {
    saveName = "APSave" + name + seed;
    let first_load = false;
    if (!(window.localStorage[saveName] && window.localStorage[saveName] !== "null")) {
        first_load = true;
    }
    // load, stop, gameIsStopped and pauseGame are globals defined by the game
    load();
    if ((!stop) && typeof stop !== "function" || (typeof gameIsStopped !== "undefined" && !gameIsStopped)) {
        pauseGame();
    }
    if (first_load) {
        totalOfflineMs = bonus;
    }
}

export function vanilla_overwrites(state) {
    restart = () => {
        shouldRestart = false;
        timer = 0;
        timeCounter = 0;
        effectiveTime = 0;
        timeNeeded = 250 + (50 * (state["Filler - 50 Starting Mana"]));
        document.title = "Idle Loops";
        resetResources();
        restartStats();
        for (let i = 0; i < towns.length; i++) {
            towns[i].restart();
        }
        view.requestUpdate("updateSkills");
        actions.restart();
        view.requestUpdate("updateCurrentActionsDivs");
        view.requestUpdate("updateTrials", null);
    }

    resetResources = () => {
        resources = copyObject(resourcesTemplate);
        resources.gold = state["Filler - 1 Starting Gold"];
        if (getExploreProgress() >= 100) addResource("glasses", true);
        view.requestUpdate("updateResources", null);
    }
}

export function previous_locations(IdleLoopsAP) {
    // Send any checks that might have been found during a disconnection
    // We can't check previously completed actions :(
    for (let town = 0; town <= IdleLoopsAP.slotData.goal; town++) {
        for (const action of towns[town].totalActionList) {
            if (action.type == "progress") {
                let level = towns[town].getLevel(action.varName);
                for (let i = 0; i <= level; i++) {
                    if (bar_locations.includes(i)) {
                        IdleLoopsAP.location(`Z${town + 1} - ${action.varName} - ${i}%`);
                    }
                }
            }
            if (action.type == "limited") {
                if (action.varName in limitedActions) {
                    let checks = Math.floor(towns[town][`checked${action.varName}`] / limitedActions[action.varName].ratio);
                    for (let i = 1; i <= checks; i++) {
                        IdleLoopsAP.location(`Z${town + 1} - ${action.varName} - #${i}`);
                    }
                }
            }
        }
    }
    for (const skill in skills) {
        let level = getSkillLevel(skill);
        for (let i = 1; i <= level; i++) {
            IdleLoopsAP.location(`${skill} - Level ${i}`);
        }
    }
    for (const buff in buffs) {
        let level = buffs[buff].amt;
        for (let i = 1; i <= level; i++) {
            IdleLoopsAP.location(`${buff} - Level ${i}`);
        }
    }
}