import { bar_locations, limitedActions, name_map_reverse, skill_map_reverse, skill_actions, skill_locations, old_skill_locations } from "./data.js";

import type { IdleLoopsAP } from "./idle-loops-ap.js";

const scouts = {};
// I thought of this as a very simple function map, but then it started making the most sense to calculate the location to scout here.
const id_to_scout = {
    normal: (IdleLoopsAP: IdleLoopsAP, town, varName) => {
        if (varName.startsWith("BuyMana")) {
            varName = "BuyMana";
        }
        const id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - ${name_map_reverse[varName]}`];
        if (id && IdleLoopsAP.client.room.missingLocations.includes(id)) {
            return [id, `Finishing ${name_map_reverse[varName]}`];
        }
        return false;
    },

    progress: (IdleLoopsAP: IdleLoopsAP, town, varName) => {
        const first_finish_id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - ${name_map_reverse[varName]}`]
        // No progress locations
        if (first_finish_id && IdleLoopsAP.client.room.allLocations.includes(first_finish_id)) {
            if (!IdleLoopsAP.client.room.missingLocations.includes(first_finish_id)) return false;
            return [first_finish_id, `Finishing ${name_map_reverse[varName]}`];
        } else {
            const start = towns[town].getLevel(varName);
            const next = bar_locations.find(x => x > start);
            if (!next) return false;
            const next_id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - ${name_map_reverse[varName]} - ${next}%`];
            if (!next_id || !IdleLoopsAP.client.room.allLocations.includes(next_id)) return false;
            return [next_id, `Getting to ${next}%`];
        }
    },
    limited: (IdleLoopsAP: IdleLoopsAP, town, varName) => {
        if (!IdleLoopsAP.state[`Z${town + 1} - ${varName} - Search`]) {
            // -1 to mean "You don't have '- Search'"
            return -1;
        }
        const next = Math.floor(towns[town][`checked${varName}`] / limitedActions[varName].ratio) + 1;
        const next_id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - ${name_map_reverse[varName]} - #${next}`] ?? false;

        if (next_id && IdleLoopsAP.client.room.missingLocations.includes(next_id)) {
            return [next_id, `The next ${name_map_reverse[varName]}`];
        }
        const first_batched_id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - x10 ${name_map_reverse[varName]} - #1`] ?? false;
        const batched = IdleLoopsAP.client.room.checkedLocations.includes(first_batched_id) || IdleLoopsAP.client.room.missingLocations.includes(first_batched_id);
        if (batched) {
            const next_batched = Math.floor(next / 10) + 1;
            const next_batched_id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - x10 ${name_map_reverse[varName]} - #${next_batched}`] ?? false;
            if (next_batched_id && IdleLoopsAP.client.room.missingLocations.includes(next_batched_id)) {
                return [next_batched_id, `The next x10 ${name_map_reverse[varName]}`];
            }
        }
        return false;

    },
    multipart: (IdleLoopsAP: IdleLoopsAP, town, varName) => {
        let n = 1;
        // Game doesn't store highest completion, just loop through them all
        while (true) {
            const id = IdleLoopsAP.location_name_to_id[`Z${town + 1} - ${name_map_reverse[varName]} - Completion #${n}`] ?? false;
            if (!id) return false;
            if (IdleLoopsAP.client.room.missingLocations.includes(id)) return [id, `Completion #${n}`];
            n++;
        }
    },
    skill: (IdleLoopsAP: IdleLoopsAP, town, skillName) => {
        const level = getSkillLevel(skillName);
        let next_level;
        if (level <= 9) {
            next_level = level + 1;
        } else {
            next_level = "" + skill_locations.find(x => x > +(("" + level).slice(0, 2))) + "" + (("" + level).slice(2));
        }
        let next_id = IdleLoopsAP.location_name_to_id[`${skill_map_reverse[skillName]} - Level ${next_level}`] ?? false;
        if (!next_id) {
            next_level = Math.ceil((level + 1) / old_skill_locations[skillName]) * old_skill_locations[skillName];
            next_id = IdleLoopsAP.location_name_to_id[`${skill_map_reverse[skillName]} - Level ${next_level}`] ?? false;
        }

        if (next_id && IdleLoopsAP.client.room.missingLocations.includes(next_id)) {
            return [next_id, `Getting to ${next_level} ${skill_map_reverse[skillName]}`];
        }
    },
    buff: (IdleLoopsAP: IdleLoopsAP, town, buffName) => {
        let id = IdleLoopsAP.location_name_to_id[`${skill_map_reverse[buffName]} - ${buffs[buffName].amt + 1}`] ?? false;
        if (!id) id = IdleLoopsAP.location_name_to_id[`${skill_map_reverse[buffName]} ${buffs[buffName].amt + 1}`] ?? false;
        if (id && IdleLoopsAP.client.room.missingLocations.includes(id)) return [id, `The next ${skill_map_reverse[buffName]}`];
        return false;
    }
}

export function setup_scouts(IdleLoopsAP: IdleLoopsAP) {
    // Scout types: Actions (Including shops), Progress bars, Limited display, Multipart display, Skill display, Buff display

    // Actions
    for (let town = 0; town <= IdleLoopsAP.slotData.goal; town++) {
        // Each adds their scout div as prepend, so the order here is reversed.
        for (const action of towns[town].totalActionList) {

            if (action.skills) {
                for (const skill in action.skills) {
                    setup_scout(IdleLoopsAP, action, "skill", id_to_scout.skill, false, false, skill);
                }
            }

            switch (action.type) {
                case "progress":
                    setup_scout(IdleLoopsAP, action, "progress", id_to_scout.progress);
                    setup_scout(IdleLoopsAP, action, "progress", id_to_scout.progress, '#infoContainer%s .showthat', '#infoContainer%s .showthat .showthis');
                    break;
                case "limited":
                    setup_scout(IdleLoopsAP, action, "limited", id_to_scout.limited);
                    setup_scout(IdleLoopsAP, action, "limited", id_to_scout.limited, '#infoContainer%s .showthat', '#infoContainer%s .showthat .showthis');
                    break;
                case "multipart":
                    if (action.grantsBuff) {
                        setup_scout(IdleLoopsAP, action, "buff", id_to_scout.buff, false, false, action.grantsBuff);
                        setup_scout(IdleLoopsAP, action, "buff", id_to_scout.buff, '#infoContainer%s .showthat', '#infoContainer%s .showthat .showthis', action.grantsBuff);
                    } else {
                        setup_scout(IdleLoopsAP, action, "multipart", id_to_scout.multipart);
                        setup_scout(IdleLoopsAP, action, "multipart", id_to_scout.multipart, '#infoContainer%s .showthat', '#infoContainer%s .showthat .showthis');
                    }
                    break;
            }
            if (action.varName === "ThrowParty") {
                setup_scout(IdleLoopsAP, action, "progress", id_to_scout.progress, false, false, "Met");
            }
            setup_scout(IdleLoopsAP, action, "finish", id_to_scout.normal);
        }
    }

    // Skills
    for (const skill in skills) {
        setup_scout(IdleLoopsAP, false, "skill", id_to_scout.skill, `#skill${skill}Container.showthat`, `#skill${skill}Container.showthat .showthis`, skill);
    }

    for (const buff in buffs) {
        setup_scout(IdleLoopsAP, false, "buff", id_to_scout.buff, `#buff${buff}Container.showthat`, `#buff${buff}Container.showthat .showthis`, buff);
    }
}

// class_name is not functional but it makes sense to have.
// Callback takes the scout div and is expected to replace its innerHTML with the scout.
// (Adds the callback to el hover)
function add_scout_div(els, hover, class_name, callback: (hover: HTMLElement) => void) {
    // We could store a set of already setup hover states rather than querying every time
    // but meh this only runs once on load.
    for (const h of hover) {
        if (!h.querySelector(".ap-scout-empty")) {
            const empty = document.createElement("div");
            empty.classList.add("ap-scout");
            empty.classList.add("ap-scout-empty");
            empty.textContent = "No more Items";
            h.prepend(empty);
        }

        const scout_div = document.createElement("div");
        scout_div.classList.add("ap-scout");
        scout_div.classList.add(class_name);
        h.prepend(scout_div);
        for (const el of els) {
            el.addEventListener("mouseover", () => {
                callback(scout_div);
            });
        }
    }
}
function setup_scout(IdleLoopsAP: IdleLoopsAP, action, scout_type: string, id_func: (IdleLoopsAP: IdleLoopsAP, town: number, varName: string) => any, el_selector: string | false = false, hover_selector: string | false = false, overwrite_varName?: string) {
    el_selector = el_selector ? el_selector : '#container%s.showthat';
    hover_selector = hover_selector ? hover_selector : '#container%s.showthat .showthis:not(.when-locked)';
    const el = document.querySelectorAll(el_selector.replace("%s", action.varName));
    const hover = document.querySelectorAll(hover_selector.replace("%s", action.varName));
    // Manually handle shops
    if (action?.varName?.startsWith("APShop")) {
        scout_shop(IdleLoopsAP, el, action);
        return;
    }
    const callback = async (scoutcontainer) => {
        const id = id_func(IdleLoopsAP, action?.townNum, overwrite_varName ? overwrite_varName : action.varName);
        scoutcontainer.innerHTML = "Scouting...";
        if (id === -1) {
            scoutcontainer.innerHTML = `You need "${name_map_reverse[action.varName]} - Search" to find items here`;
            return;
        }
        // "No more items" is shown via :empty CSS
        if (!id) {
            scoutcontainer.innerHTML = "";
            return;
        }
        const message = await scout(IdleLoopsAP, id[0]);
        scoutcontainer.innerHTML = `${id[1]} will grant: ${message}`;
    }

    add_scout_div(el, hover, `ap-scout-${scout_type}`, callback);
}

function scout_shop(IdleLoopsAP: IdleLoopsAP, el: NodeListOf<Element>, action) {
    const scoutdiv = document.querySelector(`#scoutAPShopZ${action.townNum + 1}`)
    el.forEach(e => e.addEventListener("mouseover", async () => {
        const next = IdleLoopsAP.nextShop(action.townNum);
        if (!next) {
            document.querySelector("#APShopZ" + (action.townNum + 1)).textContent = "The shop is gone. You try to forget about it.";
            return;
        }
        scoutdiv.innerHTML = "Scouting...";
        const message = await scout(IdleLoopsAP, next[0]);
        scoutdiv.innerHTML = `It's selling ${message} for ${next[1]} gold.`
    }));
    return;
}

async function scout(IdleLoopsAP, id) {
    let scout
    if (!(id in scouts)) {
        scouts[id] = IdleLoopsAP.client.scout([id]);
    }
    scout = await scouts[id];

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
    return `${scout[0].receiver.name}'s <span class="bold ap-color ap-item${className}">${scout[0].name}</span>`;
}