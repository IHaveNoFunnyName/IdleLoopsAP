import { create_form } from "./connect.js";
import { ap_load, update_ap_state, vanilla_overwrites, previous_locations } from "./vanilla_stuff.js";
import { hook_predictor, predictor_add_actions } from "./predictor.js";
import { hook_town } from "./zone.js";
import { hook_action, lastEffectiveLimited } from "./action.js";
import { hook_skill, hook_buff } from "./skills.js";
import unhidemetCss from "./styles/unhidemet.scss";

import { name_map, name_map_reverse, bar_locations, skill_locations, limitedActions, segments } from "./data.js";

class IdleLoopsAP_class {
    client = false;
    offlineTime = 0;
    // Return 0 on miss without having to like put a .get() everywhere
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
     * Called on form submit. Connects to AP, sets up UI mods and loads a separate AP save
     */
    async connect(client, slotName, slotData, location_name_to_id) {
        this.client = client;
        this.slotData = slotData;
        this.location_name_to_id = location_name_to_id;
        this.goalAction = ["StartJourney", "ContinueOn", "StartTrek", "FaceJudgement"][slotData.goal];

        // Hook predictor first so the web worker doesn't freak out.
        this.predictor = hook_predictor(this);

        ap_load(slotName, this.client.room.seedName, this.slotData.bonus);
        predictor_add_actions(this.predictor);
        this.post_load();
    }

    /**
     * Sets up the game for Archipelago, overwriting functions and injecting HTML, anything that isn't wiped by the game loading.
     * I don't know why i split it like this when i'm not planning on handling dis/reconnecting yet. There is no un-setup. Refresh.
     * Called after a successful connection but before data from the connection is processed.
     */
    post_load() {

        for (let town = 0; town <= this.slotData.goal; town++) {
            for (const action of towns[town].totalActionList) {
                hook_action(this, action);
            }
            towns[town] = hook_town(this, town)
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

        // Should be in vanilla overwrites? Well, it's just one line and fits with the above.
        gameSpeed = (1 + (0.1 * this.state["Filler - +0.1 Game Speed"])) * this.slotData.game_speed;


        if (this.predictor) this.predictor.cache.reset();
        view.updateNextActions();

        previous_locations(this);
    }
    // additional is for the predictor, which needs to know more than the cost of the next one.
    nextShop(town, additional = 0) {
        let count = this.slotData[`location_z${town + 1}_shop`] ?? 10;
        if (count === 0) {
            return false;
        }

        let num = 1;
        let id;
        while (true) {
            id = this.location_name_to_id[`Z${town + 1} - AP Shop - #${num}`] ?? false;
            if (!id) {
                return false;
            }
            if (this.client.room.missingLocations.includes(id)) {
                break;
            }
            num++;
        }
        if (num + additional > count) {
            return false;
        }
        const max = this.slotData[`z${town + 1}_shop_max`] ?? 300;
        // Only way we get here is if there's one item in the shop and we haven't bought it.
        if (count === 1) {
            return max;
        }

        const min = this.slotData[`z${town + 1}_shop_min`] ?? 50;
        const step = (max - min) / (count - 1);

        return [id, Math.floor(((min + 1) + (step * (num - 1 + additional))) / 10) * 10];
    }

    location(x) {
        const check = typeof x === "string" ? this.location_name_to_id?.[x] ?? false : x;
        if (check) {
            try {
                this.client.check(check);
            } catch (error) {
                console.error('Error checking location:', error.message);
            }
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
            if (action === "APShop") {
                action = "APShopZ" + zone.substring(1);
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
                gameSpeed = (1 + (0.1 * this.state[x])) * this.slotData.game_speed;
            } else if (action === "Progressive Lootable") {
                const effective = lastEffectiveLimited(this, this.state);
                if (!old) this.log(`Progressive Lootable had the effect of an extra ${name_map_reverse[effective]}`);
                view.updateRegular({ name: effective, index: limitedActions[effective].town });
            }
            update_ap_state(this.state);
        } else if (action === "ThrowParty") {
            const unhideMet = document.createElement("style");
            unhideMet.innerHTML = unhidemetCss;
            document.head.appendChild(unhideMet);
        }
    }

    log(x) {
        const message = document.createElement("li");
        message.textContent = x;
        this.logElement.insertBefore(message, this.logElement.firstChild);
    }

    log_node(x) {
        this.logElement.insertBefore(x, this.logElement.firstChild);
    }
}
window.IdleLoopsAP = new IdleLoopsAP_class();
window.IdleLoopsAP.load();
