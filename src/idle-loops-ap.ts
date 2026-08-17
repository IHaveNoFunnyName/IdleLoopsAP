import { create_form } from "./connect.js";
import { ap_load, update_ap_tooltip, vanilla_overwrites, previous_locations, unhide } from "./vanilla_stuff.js";
import { hook_predictor, predictor_add_actions } from "./predictor.js";
import { hook_town } from "./zone.js";
import { hook_action, lastEffectiveLimited } from "./action.js";
import { hook_skill, hook_buff } from "./skills.js";

import { name_map, name_map_reverse, bar_locations, skill_locations, limitedActions, segments, unhides } from "./data.js";

export type SlotData = {
    version?: string;
    goal: number;
    logic_vanilla: boolean;
    logic_vanilla_all: boolean;
    z1_shop_expensive_max: number;
    game_speed: number;
    stat_exp_mult: number;
    skill_exp_mult: number;
    bonus: number;
    mod_ui_crime: boolean;
    mod_color: string;
}

class IdleLoopsAP_class {
    version = { "min": "0.4.2", "max": "9.9.9" };
    client: any = false;
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
    slotData: SlotData;
    scouts = {};
    predictor: any = false;
    newUI = false;
    goalAction = "";
    expMult = 1;
    location_name_to_id = {};
    logElement: any = false;

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
        this.expMult = slotData.stat_exp_mult;

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

        // Restart after recieving items so the starting state has items.
        restart();
        view.update();

        // Should be in vanilla overwrites? Well, it's just one line and fits with the above.
        gameSpeed = (1 + (0.1 * this.state["+0.1 Game Speed"])) * this.slotData.game_speed;


        if (this.predictor) this.predictor.cache.reset();
        view.updateNextActions();

        previous_locations(this);
    }
    // additional is for the predictor, which needs to know more than the cost of the next one.
    nextShop(town, additional = 0) {
        let count = 10;
        let num = 1;
        let id;
        let expensive = "";
        while (true) {
            id = this.location_name_to_id[`Z${town + 1} - AP Shop - #${num}`];
            if (this.client.room.missingLocations.includes(id)) {
                break;
            }
            if (num == count) {
                break;
            }
            num++;
        }
        // Dumb solution to just copying the check here instead of refactoring the function
        // Without it went straight from #9 > expensive #1
        if (!this.client.room.missingLocations.includes(id) && (num + additional) >= count) {
            additional = count - num;
            expensive = "_expensive";
            num = 1;
            while (true) {
                id = this.location_name_to_id[`Z${town + 1} - AP Shop (Expensive) - #${num}`];
                if (num > count) {
                    return false;
                }
                if (this.client.room.missingLocations.includes(id)) {
                    break;
                }
                num++;
            }
        }
        const max = expensive ? this.slotData[`z${town + 1}_shop${expensive}_max`] : { 0: 200, 2: 1000 }[town];

        // Only way we get here is if there's one item in the shop and we haven't bought it
        // And I want that to cost max, not min
        if (count === 1) {
            return [id, max];
        }

        const min = expensive ? 300 : { 0: 50, 2: 500 }[town];
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
            let bulk = false;
            if (action.startsWith("x")) {
                let restAction;
                [bulk, ...restAction] = action.split(" ");
                action = restAction.join(" ");
            }
            action = name_map[action] ?? action;
            if (action === "BuyMana") {
                action = "BuyManaZ" + zone.substring(1);
            }
            if (action === "APShop") {
                action = "APShopZ" + zone.substring(1);
            }
            if (bulk) {
                action = bulk + " " + action;
            }
            x = [zone, action, ...rest].join(" - ");
        }
        this.state[x]++;

        if (limitedActions?.[action]) {
            if (rest.length === 0) {
                const lastEffective = lastEffectiveLimited(this, this.state, action);
                if (lastEffective && lastEffective !== action) {
                    if (!old) this.log(`Due to Progressive Lootables, ${x} had the effect of an extra ${name_map_reverse[lastEffective]} instead`);
                    view.updateRegular({ name: lastEffective, index: +(zone.substring(1)) - 1 });
                }
            } else if (rest[0] === "Search") {
                const el = document.querySelector(`#infoContainer${action}`);
                if (el) {
                    el.classList.add("ap-search");
                }
            }
            view.updateRegular({ name: action, index: +(zone.substring(1)) - 1 });
        } else if (x === "+0.1 Game Speed") {
            gameSpeed = (1 + (0.1 * this.state[x])) * this.slotData.game_speed;
        } else if (x === "+0.1 Exp Multiplier") {
            this.expMult = this.slotData.stat_exp_mult * (1 + (0.1 * this.state[x]));
            const els = document.querySelectorAll(".ap-mult");
            for (const el of els) {
                el.textContent = `${this.expMult.toFixed(2)}`;
            }
        } else if (x === "Progressive Lootable") {
            const effective = lastEffectiveLimited(this, this.state) as string;
            if (!old) this.log(`Progressive Lootable had the effect of an extra ${name_map_reverse[effective]}`);
            view.updateRegular({ name: effective, index: limitedActions[effective].town });
        } else if (unhides?.[action]) {
            // If an multiple actions give a town info container, vanilla only shows it when the first one is finished.
            // So we have to unhide the others
            unhide(unhides[action]);
        }
        update_ap_tooltip(this);
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
