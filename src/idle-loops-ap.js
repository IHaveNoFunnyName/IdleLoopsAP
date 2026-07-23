import { create_form } from "./connect.js";
import { ap_load, vanilla_overwrites, previous_locations } from "./vanilla_stuff.js";
import { hook_predictor } from "./predictor.js";
import { hook_zone } from "./zone.js";
import { lastEffectiveLimited } from "./action.js";
import { hook_skill, hook_buff } from "./skills.js";

import { name_map, name_map_reverse, bar_locations, skill_locations, limitedActions, segments, skill_actions } from "./data.js";

class IdleLoopsAP_class {
    client = false;
    offlineTime = 0;
    // Return 0 on miss without having to boilerplate a .get() everywhere
    state = new Proxy({}, {
        get: (target, prop) => {
            if (prop in target) {
                return target[prop];
            } else {
                return 0;
            }
        }
    });
    scouts = {};
    predictor = false;
    newUI = false;
    goalAction = "";

    /**
     * Injects the AP connect form.
     * The callback is called on a successful connection.
     */
    load() {
        this.newUI = document.querySelector("#actionLogTitle") !== null;
        create_form(this, this.connect);
    }

    /**
     * Called on form submit. Connects to AP, loads a separate AP save, 
     */
    async connect(client, slotName, slotData, location_name_to_id) {
        this.client = client;
        this.slotData = slotData;
        this.location_name_to_id = location_name_to_id;
        this.goalAction = ["StartJourney", "ContinueOn", "StartTrek", "FaceJudgement"][slotData.goal];

        ap_load(this.slotName, this.client.room.seedName, this.slotData.bonus);
        this.post_load();
    }

    /**
     * Sets up the game for Archipelago, overwriting functions and injecting HTML, anything that isn't wiped by the game loading.
     * I don't know why i split it like this when i'm not planning on handling dis/reconnecting yet. There is no un-setup. Refresh.
     * Called after a successful connection but before data from the connection is processed.
     */
    post_load() {
        // Hook predictor first so the web worker doesn't freak out.
        this.predictor = hook_predictor(this.state);

        for (let town = 0; town <= this.slotData.goal; town++) {
            towns[town] = hook_zone(this, town)
        }

        for (const skill in skills) {
            skills[skill] = hook_skill(this, skill);
        }

        for (const buff in buffs) {
            buffs[buff] = hook_buff(this, buff);
        }

        vanilla_overwrites(this.state);

        // Collect checks from before this connection
        for (const item of this.client.items.received) {
            this.item(item.name, true);
        }
        if (this.predictor) this.predictor.cache.reset();
        view.updateNextActions();

        previous_locations(this);
    }

    location(x) {
        const check = this.location_name_to_id?.[x] ?? false;
        if (check) {
            try {
                this.client.check(check);
            } catch (error) {
                console.error('Error checking location:', error.message);
            }
        } else {
            console.log('Unknown location: "' + x + '"');
        }
    }

    /**
     * Called in order for every item rewarded, and also for every item in history on connection to catch the state up to speed.
     */
    item(x, old = false) {
        let [zone, action, ...rest] = x.split(" - ");
        if (zone.startsWith("Z")) {
            action = name_map[action] ?? action;
            if (action === "BuyMana") {
                action = "BuyManaZ" + zone.substring(1);
            }
            x = [zone, action, ...rest].join(" - ");
        }
        this.state[x]++;

        if (limitedActions?.[action]) {
            if (rest.length === 0) {
                const lastEffective = lastEffectiveLimited(this, this.state, action);
                if (lastEffective && lastEffective !== action) {
                    if (!old) this.log(`Due to Progressive Lootables, ${x} has the effect of adding an extra ${name_map_reverse[lastEffective]} instead`);
                    view.updateRegular({ name: lastEffective, index: +(zone.substring(1)) - 1 });
                }
            } else if (rest[0] === "Search") {
                const el = document.querySelector(`#infoContainer${action}`);
                if (el) {
                    el.classList.add("ap-search");
                }
            }
            view.updateRegular({ name: action, index: +(zone.substring(1)) - 1 });
        } else if (zone === "Filler") {
            // Starting mana and gold are handled elsewhere
            if (action === "+0.1 Game Speed") {
                gameSpeed = 1 + (0.1 * this.state[x]);
            } else if (action === "Progressive Lootable") {
                const effective = lastEffectiveLimited(this, this.state, "Progressive Lootable");
                if (!old) this.log(`Progressive Lootable had the effect of an extra ${name_map_reverse[effective]}`);
                view.updateRegular({ name: effective, index: limitedActions[effective].town });
            }
        }
    }

    log(x) {
        const message = document.createElement("li");
        message.textContent = x;
        this.logElement.insertBefore(message, this.logElement.firstChild);
    }
}
window.IdleLoopsAP = new IdleLoopsAP_class();
window.IdleLoopsAP.load();
