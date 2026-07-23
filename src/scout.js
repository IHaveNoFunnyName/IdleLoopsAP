import { limitedActions } from "./data.js";

export function setup_scout(IdleLoopsAP, action) {

    if (action.type == "progress") {
        const el = document.querySelector(`#infoContainer${action.varName} .showthat`);
        const hover = el.querySelector(".showthis");
        el.addEventListener("mouseover", () => { scoutProgress(IdleLoopsAP, hover, action.townNum, action.varName) });
    }

    if (action.type == "limited") {
        const el = document.querySelector(`#infoContainer${action.varName} .showthat`);
        const hover = el.querySelector(".showthis");
        el.addEventListener("mouseover", () => { scoutLimited(IdleLoopsAP, hover, action.townNum, action.varName) });
    }

    if (action.type == "normal") {
        const el = document.querySelector(`#container${action.varName}.showthat`);
        const hover = el.querySelector(".showthis");
        const scoutcontainer = document.createElement("div");
        scoutcontainer.classList.add("scout");
        hover.prepend(document.createElement("br"));
        hover.prepend(scoutcontainer);
        el.addEventListener("mouseover", () => { scoutRegular(IdleLoopsAP, scoutcontainer, action.townNum, action.varName) });
    }

    if (action.type == "multipart") {
        const el = document.querySelector(`#container${action.varName}.showthat`);
        const hover = el.querySelector(".showthis");
        const scoutcontainer = document.createElement("div");
        scoutcontainer.classList.add("scout");
        hover.prepend(document.createElement("br"));
        hover.prepend(scoutcontainer);
        el.addEventListener("mouseover", () => { scoutMultipart(IdleLoopsAP, scoutcontainer, action.townNum, action.varName) });
    }

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



async function scoutRegular(IdleLoopsAP, el, town, varName) {
    const location_name = `Z${town + 1} - ${varName}`;
    if (completedActions.includes(varName)) {
        el.textContent = "No more checks";
        return;
    }
    const location = IdleLoopsAP.location_name_to_id[location_name];
    let scout
    if (location in IdleLoopsAP.scouts) {
        scout = IdleLoopsAP.scouts[location];
    } else {
        el.textContent = `Scouting...`;

        scout = await IdleLoopsAP.client.scout([location], 2)
        IdleLoopsAP.scouts[location] = scout;
    }
    el.textContent = `Finishing this action will grant ${scout[0].receiver.name}'s "${scout[0].name}"`;
}

async function scoutProgress(IdleLoopsAP, el, town, varName) {
    const lines = el.innerHTML.split("<br>");
    const level = towns[town].getLevel(varName);
    if (level < 100) {
        let next = 0;
        let i = 0;
        while (next <= level) {
            next = bar_locations[i];
            i++;
        }
        const location = IdleLoopsAP.location_name_to_id[`Z${town + 1} - ${varName} - ${next}%`];
        let scout
        if (location in IdleLoopsAP.scouts) {
            scout = IdleLoopsAP.scouts[location];
        } else {
            lines[0] = `Scouting...`;
            el.innerHTML = lines.join("<br>");

            scout = await IdleLoopsAP.client.scout([location], 0)
            IdleLoopsAP.scouts[location] = scout;
        }
        lines[0] = `${scout[0].receiver.name}'s "${scout[0].name}" is at ${next}%`;
    } else {
        lines[0] = "No more checks";
    }
    el.innerHTML = lines.join("<br>");
}

async function scoutLimited(IdleLoopsAP, el, town, varName) {
    const lines = el.innerHTML.split("<br>");
    const checks = Math.floor(towns[town][`checked${varName}`] / limitedActions[varName].ratio);
    const location_name = `Z${town + 1} - ${varName} - #${checks + 1}`;
    let check;
    if (!IdleLoopsAP.state[`Z${town + 1} - ${varName} - Search`]) {
        check = `"Z${town + 1} - ${name_map_reverse[varName]} - Search" needs to be found first`;
    } else if (location_name in IdleLoopsAP.location_name_to_id) {
        const location = IdleLoopsAP.location_name_to_id[location_name];
        let scout
        if (location in IdleLoopsAP.scouts) {
            scout = IdleLoopsAP.scouts[location];
            check = `${scout[0].receiver.name}'s "${scout[0].name}" Next`
        } else {
            lines[0] = `Scouting...`;
            el.innerHTML = lines.join("<br>");

            scout = await IdleLoopsAP.client.scout([location], 0)
            IdleLoopsAP.scouts[location] = scout;
            check = `${scout[0].receiver.name}'s "${scout[0].name}" Next`
        }
    } else {
        check = "No more checks";
    }
    lines[0] = `<span style="white-space: pre;">Sends a Check to AP every ${limitedActions[varName].ratio} checked.\n${check}</span>`;
    el.innerHTML = lines.join("<br>");
}

async function scoutMultipart(IdleLoopsAP, el, town, varName) {
    const location_name_base = `Z${town + 1} - ${varName} - Completion #`;
    let location_name;
    let i = 0;
    while (true) {
        location_name = `${location_name_base}${i + 1}`;
        if (IdleLoopsAP.client.room.missingLocations.includes(IdleLoopsAP.location_name_to_id[location_name])) {
            break;
        }
        if (!(location_name in IdleLoopsAP.location_name_to_id)) {
            el.textContent = "No more checks";
            return;
        }
        i++;
    }
    const location = IdleLoopsAP.location_name_to_id[location_name];
    let scout
    if (location in IdleLoopsAP.scouts) {
        scout = IdleLoopsAP.scouts[location];
    } else {
        el.textContent = `Scouting...`;

        scout = await IdleLoopsAP.client.scout([location], 2)
        IdleLoopsAP.scouts[location] = scout;
    }
    el.textContent = `Completed difficulty: ${i}. The next completion will grant ${scout[0].receiver.name}'s "${scout[0].name}"`;
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