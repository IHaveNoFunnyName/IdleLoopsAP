import { bar_locations, limitedActions, name_map_reverse } from "./data.js";

const scoutNodes = {};
const scouts = {};
// I thought of this as a very simple function map, but then it started making the most sense to calculate the location to scout here.
const scout_select = {
    normal: (IdleLoopsAP, els, town, varName) => {
        const id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - ${name_map_reverse[varName]}`];
        if (IdleLoopsAP.client.room.missingLocations.includes(id)) {
            scout(IdleLoopsAP, els, id, `Z${town + 1} - ${name_map_reverse[varName]}`, "Finishing this action ");
        } else {
            no_more_scouts(IdleLoopsAP, els);
        }
    },

    progress: (IdleLoopsAP, els, town, varName) => {
        const first_finish_id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - ${name_map_reverse[varName]}`]
        // Better to do this or include the option in slotdata? Network usage and cpu are both functionally free
        // but i feel like i should still prefer less network. I say as i don't preload the datapackage.
        if (IdleLoopsAP.client.room.allLocations.includes(first_finish_id)) {
            if (IdleLoopsAP.client.room.missingLocations.includes(first_finish_id)) {
                scout(IdleLoopsAP, els, first_finish_id, `Z${town + 1} - ${name_map_reverse[varName]}`, "Finishing this action ");
            } else {
                no_more_scouts(IdleLoopsAP, els);
            }
        } else {
            const start = towns[town].getLevel(varName);
            const next = bar_locations.find(x => x > start);
            const next_id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - ${name_map_reverse[varName]} - ${next}%`];
            if (IdleLoopsAP.client.room.missingLocations.includes(next_id)) {
                scout(IdleLoopsAP, els, next_id, `Z${town + 1} - ${name_map_reverse[varName]} - ${next}%`, `Getting to ${next}% `);
            } else {
                no_more_scouts(IdleLoopsAP, els);
            }
        }
    },
    limited: (IdleLoopsAP, els, town, varName) => {
        const next = towns[town][`good${varName}`] + 1;
        const next_id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - ${name_map_reverse[varName]} - #${next}`] ?? false;
        if (next_id && IdleLoopsAP.client.room.missingLocations.includes(next_id)) {
            scout(IdleLoopsAP, els, next_id, `Z${town + 1} - ${name_map_reverse[varName]} - #${next}`, `The next ${name_map_reverse[varName]} `);
        } else {
            no_more_scouts(IdleLoopsAP, els);
        }
    },
    multipart: (IdleLoopsAP, els, town, varName) => {
        let n = 1;
        while (true) {
            const id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - ${name_map_reverse[varName]} - Completion #${n}`] ?? false;
            if (!id) {
                return no_more_scouts(IdleLoopsAP, els);
            }
            if (IdleLoopsAP.client.room.missingLocations.includes(id)) {
                return scout(IdleLoopsAP, els, id, `Z${town + 1} - ${name_map_reverse[varName]} - Completion #${n}`, `Completion #${n} `, 2);
            }
            n++;
        }
    },
}

export function setup_scout(IdleLoopsAP, action) {
    const el = document.querySelectorAll(`#container${action.varName}.showthat, #infoContainer${action.varName} .showthat`);
    const hovers = document.querySelectorAll(`#container${action.varName}.showthat .showthis, #infoContainer${action.varName} .showthat .showthis`);
    const scoutcontainers = []
    for (const hover of hovers) {
        const scoutcontainer = document.createElement("div");
        hover.prepend(document.createElement("br"));
        hover.prepend(scoutcontainer);
        scoutcontainers.push(scoutcontainer);
    }
    el.forEach(e => e.addEventListener("mouseover", () => { scout_select[action.type](IdleLoopsAP, scoutcontainers, action.townNum, action.varName) }));

    //placeholder, skill isn't an action just needed a place to dump the copy & paste
    if (action.type == "skill") {
        const skill = action.varName;
        const el = document.querySelector(`#skill${skill}Container.showthat`);
        const hover = el.querySelector(".showthis");
        const scoutcontainer = document.createElement("div");
        scoutcontainer.classList.add("scout");
        hover.prepend(document.createElement("br"));
        hover.prepend(scoutcontainer);
        el.addEventListener("mouseover", () => { scoutSkill(IdleLoopsAP, scoutcontainer, skill) });
    }
}

async function scout(IdleLoopsAP, els, id, location, message, hint = 0) {
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
        el.innerHTML = `${message}will grant ${scout[0].receiver.name}'s <span class="bold ap-item${className}">${scout[0].name}</span>`;
    }
}

async function no_more_scouts(IdleLoopsAP, els) {
    for (const el of els) {
        el.textContent = "No more checks";
    }
}

async function scoutSkill(IdleLoopsAP, el, skill) {
    const level = getSkillLevel(skill);
    if (level < 300) {
        let next = 0;
        let i = 0;
        while (next <= level) {
            next = skill_locations[i];
            i++;
        }
        const location = IdleLoopsAP.location_name_to_id[`${skill} - Level ${next}`];
        let scout
        if (location in IdleLoopsAP.scouts) {
            scout = IdleLoopsAP.scouts[location];
        } else {
            el.textContent = `Scouting...`;

            scout = await IdleLoopsAP.client.scout([location], 2)
            IdleLoopsAP.scouts[location] = scout;
        }
        el.textContent = `${scout[0].receiver.name}'s "${scout[0].name}" is at Level ${next}`;
    } else {
        el.textContent = "No more checks";
    }
}