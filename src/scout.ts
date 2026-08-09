import { bar_locations, limitedActions, name_map_reverse, skill_map_reverse, skill_actions, skill_locations } from "./data.js";

const scoutNodes = {};
const scouts = {};
// I thought of this as a very simple function map, but then it started making the most sense to calculate the location to scout here.
const scout_select = {
    normal: (IdleLoopsAP, els, town, varName) => {
        if (varName.startsWith("BuyMana")) {
            varName = "BuyMana";
        }
        const id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - ${name_map_reverse[varName]}`];
        if (IdleLoopsAP.client.room.missingLocations.includes(id)) {
            scout(IdleLoopsAP, els, id, "Finishing this action");
            return;
        } else if (varName in skill_actions) {
            const skill = skill_actions[varName];
            const level = getSkillLevel(skill);
            const next_level = level <= 9 ? level + 1 : Math.ceil((level + 1) / skill_locations[skill]) * skill_locations[skill];
            const next_id = IdleLoopsAP.location_name_to_id[`${skill_map_reverse[skill]} - Level ${next_level}`] ?? false;

            if (next_id && IdleLoopsAP.client.room.missingLocations.includes(next_id)) {
                scout(IdleLoopsAP, els, next_id, `Getting to ${next_level} ${skill_map_reverse[skill]}`);
                return;
            }
        }
        no_more_scouts(IdleLoopsAP, els);
    },

    progress: (IdleLoopsAP, els, town, varName) => {
        const first_finish_id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - ${name_map_reverse[varName]}`]
        // Better to do this or include the option in slotdata? Network usage and cpu are both functionally free
        // but i feel like i should still prefer less network. I say as i don't preload the datapackage.
        if (IdleLoopsAP.client.room.allLocations.includes(first_finish_id)) {
            if (IdleLoopsAP.client.room.missingLocations.includes(first_finish_id)) {
                scout(IdleLoopsAP, els, first_finish_id, "Finishing this action");
            } else {
                no_more_scouts(IdleLoopsAP, els);
            }
        } else {
            const start = towns[town].getLevel(varName);
            const next = bar_locations.find(x => x > start);
            const next_id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - ${name_map_reverse[varName]} - ${next}%`];
            if (IdleLoopsAP.client.room.missingLocations.includes(next_id)) {
                scout(IdleLoopsAP, els, next_id, `Getting to ${next}%`);
            } else {
                no_more_scouts(IdleLoopsAP, els);
            }
        }
    },
    limited: (IdleLoopsAP, els, town, varName) => {
        const next = Math.floor(towns[town][`checked${varName}`] / limitedActions[varName].ratio) + 1;
        const next_id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - ${name_map_reverse[varName]} - #${next}`] ?? false;
        if (!IdleLoopsAP.state[`Z${town + 1} - ${varName} - Search`]) {
            no_more_scouts(IdleLoopsAP, els, `You need "Z${town + 1} - ${name_map_reverse[varName]} - Search" to find items here.`);
            return;
        }
        if (next_id && IdleLoopsAP.client.room.missingLocations.includes(next_id)) {
            scout(IdleLoopsAP, els, next_id, `The next ${name_map_reverse[varName]}`);
            return;
        }
        const first_batched_id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - x10 ${name_map_reverse[varName]} - #1`] ?? false;
        const batched = IdleLoopsAP.client.room.checkedLocations.includes(first_batched_id) || IdleLoopsAP.client.room.missingLocations.includes(first_batched_id);
        if (batched) {
            const next_batched = Math.floor(next / 10) + 1;
            const next_batched_id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - x10 ${name_map_reverse[varName]} - #${next_batched}`] ?? false;
            if (next_batched_id && IdleLoopsAP.client.room.missingLocations.includes(next_batched_id)) {
                scout(IdleLoopsAP, els, next_batched_id, `The next x10 ${name_map_reverse[varName]}`);
                return;
            }
        }
        no_more_scouts(IdleLoopsAP, els);

    },
    multipart: (IdleLoopsAP, els, town, varName) => {
        let n = 1;
        while (true) {
            const id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - ${name_map_reverse[varName]} - Completion #${n}`] ?? false;
            if (!id) {
                return no_more_scouts(IdleLoopsAP, els);
            }
            if (IdleLoopsAP.client.room.missingLocations.includes(id)) {
                return scout(IdleLoopsAP, els, id, `Completion #${n}`);
            }
            n++;
        }
    },
    shop: (IdleLoopsAP, els, town, varName) => {
        const next = IdleLoopsAP.nextShop(town);
        if (!next) {
            document.querySelector("#APShopZ" + (town + 1)).textContent = "The shop is gone. You try to forget about it.";
            return;
        }
        scout(IdleLoopsAP, els, next[0], next[1]);
    }
}

export function setup_scout(IdleLoopsAP, action) {
    const skill = skill_actions[action.varName] ?? false;
    const el = document.querySelectorAll(`#container${action.varName}.showthat, #infoContainer${action.varName} .showthat` + (skill ? `, #skill${skill}Container.showthat` : ""));
    const hovers = document.querySelectorAll(`#container${action.varName}.showthat .showthis, #infoContainer${action.varName} .showthat .showthis` + (skill ? `, #skill${skill}Container.showthat .showthis` : ""));
    const scoutcontainers = []
    let type = action.type;
    if (!(action.varName.startsWith("APShop"))) {
        for (const hover of hovers) {
            const scoutcontainer = document.createElement("div");
            hover.prepend(document.createElement("br"));
            hover.prepend(scoutcontainer);
            scoutcontainers.push(scoutcontainer);
        }
    } else {
        scoutcontainers.push(document.querySelector(`#scoutAPShopZ${action.townNum + 1}`));
        type = "shop";
    }
    el.forEach(e => e.addEventListener("mouseover", () => { scout_select[type](IdleLoopsAP, scoutcontainers, action.townNum, action.varName) }));
}

async function scout(IdleLoopsAP, els, id, message, hint = 0) {
    let scout
    if (id in scouts) {
        scout = scouts[id];
    } else {
        for (const el of els) {
            el.textContent = `Scouting...`;
        }

        scout = await IdleLoopsAP.client.scout([id], hint);
        scouts[id] = scout;
    }
    for (const el of els) {
        // I thought this would give Node[] like chat messages and i could reuse that to give this color :(
        var className;
        if (scout[0].progression) {
            className = "-progression";
        } else if (scout[0].useful) {
            className = "-useful";
        } else if (scout[0].trap) {
            className = "-trap";
        } else {
            className = "";
        }
        // Assume shop when message is not a string. (and that it's a number instead)
        // Inelegant
        if (typeof message === "string") {
            el.innerHTML = `${message} will grant ${scout[0].receiver.name}'s <span class="bold ap-color ap-item${className}">${scout[0].name}</span>`;
        } else {
            el.innerHTML = `It's selling ${scout[0].receiver.name}'s <span class="bold ap-color ap-item${className}">${scout[0].name}</span> for ${message} gold.`;
        }
    }
}

async function no_more_scouts(IdleLoopsAP, els, message = "No more items") {
    for (const el of els) {
        el.textContent = message;
    }
}