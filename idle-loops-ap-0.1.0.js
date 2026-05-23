
(async function() {
    'use strict';

    const AP = await import("https://IHaveNoFunnyName.github.io/IdleLoopsAP/archipelago.min.js");

    // I don't know how i'm meant to do this but the AP client seems to only take ids, so i'll just paste in location_name_to_ids from the .apworld
    const location_name_to_id = {'Z1 - Wander - 1%': 1, 'Z1 - Wander - 10%': 2, 'Z1 - Wander - 25%': 3, 'Z1 - Wander - 50%': 4, 'Z1 - Wander - 75%': 5, 'Z1 - Wander - 90%': 6, 'Z1 - Wander - 95%': 7, 'Z1 - Wander - 99%': 8, 'Z1 - Wander - 100%': 9, 'Z1 - Pots - #1': 10, 'Z1 - Pots - #2': 11, 'Z1 - Pots - #3': 12, 'Z1 - Pots - #4': 13, 'Z1 - Pots - #5': 14, 'Z1 - Pots - #6': 15, 'Z1 - Pots - #7': 16, 'Z1 - Pots - #8': 17, 'Z1 - Pots - #9': 18, 'Z1 - Pots - #10': 19, 'Z1 - Pots - #11': 20, 'Z1 - Pots - #12': 21, 'Z1 - Pots - #13': 22, 'Z1 - Pots - #14': 23, 'Z1 - Pots - #15': 24, 'Z1 - Pots - #16': 25, 'Z1 - Pots - #17': 26, 'Z1 - Pots - #18': 27, 'Z1 - Pots - #19': 28, 'Z1 - Pots - #20': 29, 'Z1 - Pots - #21': 30, 'Z1 - Pots - #22': 31, 'Z1 - Pots - #23': 32, 'Z1 - Pots - #24': 33, 'Z1 - Pots - #25': 34, 'Z1 - Pots - #26': 35, 'Z1 - Pots - #27': 36, 'Z1 - Pots - #28': 37, 'Z1 - Pots - #29': 38, 'Z1 - Pots - #30': 39, 'Z1 - Pots - #31': 40, 'Z1 - Pots - #32': 41, 'Z1 - Pots - #33': 42, 'Z1 - Pots - #34': 43, 'Z1 - Pots - #35': 44, 'Z1 - Pots - #36': 45, 'Z1 - Pots - #37': 46, 'Z1 - Pots - #38': 47, 'Z1 - Pots - #39': 48, 'Z1 - Pots - #40': 49, 'Z1 - Pots - #41': 50, 'Z1 - Pots - #42': 51, 'Z1 - Pots - #43': 52, 'Z1 - Pots - #44': 53, 'Z1 - Pots - #45': 54, 'Z1 - Pots - #46': 55, 'Z1 - Pots - #47': 56, 'Z1 - Pots - #48': 57, 'Z1 - Pots - #49': 58, 'Z1 - Pots - #50': 59, 'Z1 - Locks - #1': 60, 'Z1 - Locks - #2': 61, 'Z1 - Locks - #3': 62, 'Z1 - Locks - #4': 63, 'Z1 - Locks - #5': 64, 'Z1 - Locks - #6': 65, 'Z1 - Locks - #7': 66, 'Z1 - Locks - #8': 67, 'Z1 - Locks - #9': 68, 'Z1 - Locks - #10': 69, 'Z1 - BuyGlasses': 70, 'Z1 - BuyManaZ1': 71, 'Z1 - Met - 1%': 72, 'Z1 - Met - 10%': 73, 'Z1 - Met - 25%': 74, 'Z1 - Met - 50%': 75, 'Z1 - Met - 75%': 76, 'Z1 - Met - 90%': 77, 'Z1 - Met - 95%': 78, 'Z1 - Met - 99%': 79, 'Z1 - Met - 100%': 80, 'Z1 - TrainStrength': 81, 'Z1 - SQuests - #1': 82, 'Z1 - SQuests - #2': 83, 'Z1 - SQuests - #3': 84, 'Z1 - SQuests - #4': 85, 'Z1 - SQuests - #5': 86, 'Z1 - SQuests - #6': 87, 'Z1 - SQuests - #7': 88, 'Z1 - SQuests - #8': 89, 'Z1 - SQuests - #9': 90, 'Z1 - SQuests - #10': 91, 'Z1 - SQuests - #11': 92, 'Z1 - SQuests - #12': 93, 'Z1 - SQuests - #13': 94, 'Z1 - SQuests - #14': 95, 'Z1 - SQuests - #15': 96, 'Z1 - SQuests - #16': 97, 'Z1 - SQuests - #17': 98, 'Z1 - SQuests - #18': 99, 'Z1 - SQuests - #19': 100, 'Z1 - SQuests - #20': 101, 'Z1 - Secrets - 1%': 102, 'Z1 - Secrets - 10%': 103, 'Z1 - Secrets - 25%': 104, 'Z1 - Secrets - 50%': 105, 'Z1 - Secrets - 75%': 106, 'Z1 - Secrets - 90%': 107, 'Z1 - Secrets - 95%': 108, 'Z1 - Secrets - 99%': 109, 'Z1 - Secrets - 100%': 110, 'Z1 - LQuests - #1': 111, 'Z1 - LQuests - #2': 112, 'Z1 - LQuests - #3': 113, 'Z1 - LQuests - #4': 114, 'Z1 - LQuests - #5': 115, 'Z1 - LQuests - #6': 116, 'Z1 - LQuests - #7': 117, 'Z1 - LQuests - #8': 118, 'Z1 - LQuests - #9': 119, 'Z1 - LQuests - #10': 120, 'Z1 - ThrowParty': 121, 'Z1 - WarriorLessons': 122, 'Z1 - MageLessons': 123, 'Z1 - Heal - Completion #1': 124, 'Z1 - Fight - Completion #1': 125, 'Z1 - SDungeon - Completion #1': 126, 'Z1 - BuySupplies': 127, 'Z1 - Haggle': 128, 'Z1 - StartJourney': 129};

    const bar_locations = [1, 10, 25, 50, 75, 90, 95, 99, 100];
    const limitedRewardRatios = {
        "Pots": 10,
        "Locks": 10,
        "SQuests": 5,
        "LQuests": 5,
    }

    class IdleLoopsAP_class {
        client = false;
        // 0 indexed to make conditions simpler
        goalZone = 0;
        state = {};
        location_name_to_id = location_name_to_id;
        
        /**
         * Called on script load, to inject the AP connect form
         */
        load() {
            // Some light CSS to deal with adding the connect form, but also now it's more centered than it ever was!
            const menu = document.getElementById("menu")
            menu.style.width = "1px";
            menu.style.display = "inline-flex";
            

            const connect = document.createElement("form");
            connect.id = "APconnect";
            connect.style.display = "inline-flex";
            connect.style.position = "fixed";
            connect.style.top = "15px";
            connect.style.right = 0;
            connect.style.width = "500px";
            connect.style.alignItems = "center";

            const apDefaults = {
                host: localStorage.getItem("APhost") || "archipelago.gg",
                port: localStorage.getItem("APport") || "",
                slotName: localStorage.getItem("APslotName") || ""
            };

            connect.addEventListener("submit", (e) => {
                e.preventDefault();

                const host = connect.querySelector("#APhost").value;
                const port = connect.querySelector("#APport").value;
                const slotName = connect.querySelector("#APslotName").value;
                localStorage.setItem("APhost", host);
                localStorage.setItem("APport", port);
                localStorage.setItem("APslotName", slotName);

                this.connect(host, port, slotName);
            });

            connect.innerHTML = `
                <span>Host:&nbsp;</span><input type="text" id="APhost" value="${apDefaults.host}" required style="width:50%;cursor:initial;">
                <span>&nbsp;Port:&nbsp;</span><input type="number" id="APport" value="${apDefaults.port}" required style="width:25%;cursor:initial;">
                <span>&nbsp;Name:&nbsp;</span><input type="text" id="APslotName" value="${apDefaults.slotName}" required style="width:50%;cursor:initial;">
                <button type="submit" style="padding:1px 10px">Connect</button>
            `;

            const manaDisplay = document.getElementById("trackedResources");
            manaDisplay.parentNode.insertBefore(connect, manaDisplay.nextSibling);
        }

        /**
         * Called on form submit. Connects to AP, loads a separate AP save, 
         */
        async connect(host, port, slotName) {
            this.client = new AP.Client();
            try {
                await this.client.login(host + ":" + port, slotName, "Idle Loops");
            } catch (err) {
                alert("Connection failed: " + err);
                return;
            }
            document.getElementById("APconnect").remove();
            this.setup();
            saveName = "APSave" + slotName;
            load();
            if(!stop) pauseGame();
            this.post_load();
        }

        /**
         * Sets up the game for Archipelago, overwriting functions and injecting HTML, anything that isn't wiped by the game loading.
         * I don't know why i split it like this when i'm not planning on handling dis/reconnecting yet. There is no un-setup. Refresh.
         * Called after a successful connection but before data from the connection is processed.
         */
        setup() {
            const logElement = document.createElement("div");
            logElement.id = "ap-log";
            logElement.style.width = "535px";
            logElement.style.minHeight = "591px";
            logElement.innerHTML = "<div class=\"large bold\" style=\"width:100%;text-align:center;\">AP Log</div>";
            const townColumn = document.getElementById("townColumn");
            townColumn.parentNode.insertBefore(logElement, townColumn.nextSibling);

            this.client.messages.on("message", (content) => {
                const message = document.createElement("div");
                message.textContent = content;
                logElement.appendChild(message);
            });

            this.client.items.on("itemsReceived", (items, index) => {
                for (const item of items) {
                    this.item(item.name);
                }
            });
        }
        post_load() {
            // Idle Loops scatters *all* of its stuff all around global scope
            // but in a way that doesn't show up in `window`
            // i'd really prefer it to be obvious when i'm using global scope
            for(let town = 0; town <= this.goalZone; town++) {

                for(const action of towns[town].totalActionList) {
                    action._visible = action.visible;
                    action.visible = function() {
                        return window.IdleLoopsAP.visible(this);
                    }
                    action._unlocked = action.unlocked;
                    action.unlocked = function() {
                        return window.IdleLoopsAP.unlocked(this);
                    }
                    if(action.type == "normal") {
                        action._finish = action.finish;
                        action.finish = function() {
                            window.IdleLoopsAP.location(`Z${town + 1} - ${this.varName}`);
                            if(this.varName == "StartJourney") {
                                window.IdleLoopsAP.client.goal();
                            }
                            return this._finish();
                        }
                    }
                }

                towns[town] = new Proxy(towns[town], {
                    get: (target, prop, receiver) => {
                        // Item: Number of Limited Actions
                        // Overwrite whatever the game thinks it has with the number of checks of this type recieved
                        if (town <= window.IdleLoopsAP.goalZone && prop.startsWith("good")) {
                            const name = prop.substring(4);
                            if(!name.startsWith("Temp")) {
                                return this.state?.[`Z${town+1} - ${name}`] || 0;
                            }
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
                        if (value > 0 && town == 0 && prop.startsWith("good")) {
                            const name = prop.substring(4);
                            if(!name.startsWith("Temp")) {
                                const rewardRatio = limitedRewardRatios[name];
                                this.location("Z1 - " + name + " - #" + Math.floor(target['checked' + name] / rewardRatio));
                                return true;
                            }
                        }
                        
                        // Location: Gaining a Progress Bar %
                        // We could get this by overwriting town.finishProgress, but right now i prefer to do as much as possible via proxies
                        // Just documenting alternate solutions to get a head start later if this ends up broken
                        if (town <= window.IdleLoopsAP.goalZone && prop.startsWith("exp")) {
                            const name = prop.substring(3);
                            const prevLevel = target.getLevel(name);
                            Reflect.set(target, prop, value, receiver);
                            const newLevel = target.getLevel(name);
                            for(let i = prevLevel + 1; i <= newLevel; i++) {
                                if(bar_locations.includes(i)) {
                                    this.location("Z" + (town + 1) + " - " + name + " - " + i + "%");
                                }
                            }
                            return true;
                        }

                        return Reflect.set(target, prop, value, receiver);
                    }
                });
                // We need to add a line half way through this function, annoying that means copying a whole function
                towns[town].finishRegular = function(varName, rewardRatio, rewardFunc) {
                    // error state, negative numbers.
                    if (this[`total${varName}`] - this[`checked${varName}`] < 0) {
                        this[`checked${varName}`] = this[`total${varName}`];
                        this[`good${varName}`] = Math.floor(this[`total${varName}`] / rewardRatio);
                        this[`goodTemp${varName}`] = this[`good${varName}`];
                        console.log("Error state fixed");
                    }

                    // only checks unchecked items 
                    // IF there are unchecked items 
                    // AND the user has not disabled checking unchecked items OR there are no checked items left
                    const searchToggler = document.getElementById(`searchToggler${varName}`);
                    if (this[`total${varName}`] - this[`checked${varName}`] > 0 && ((searchToggler && !searchToggler.checked) || this[`goodTemp${varName}`] <= 0)) {
                        if(`Z${this.index + 1} - ${varName} - Search` in window.IdleLoopsAP.state) {
                            this[`checked${varName}`]++;
                            if (this[`checked${varName}`] % rewardRatio === 0) {
                                this[`lootFrom${varName}`] += rewardFunc();
                                this[`good${varName}`]++;
                            }
                        } else {
                            // Alert() seems a better place for this message, but i don't want someone to put like 100 pots in the action list (or have repeat last action on) and get 100 alerts
                            const logElement = document.getElementById("ap-log");
                            const message = document.createElement("div");
                            message.textContent = `Error: You need "Z${this.index + 1} - ${varName} - Search" to check unchecked ${varName}`;
                            logElement.appendChild(message);
                        }
                    } else if (this[`goodTemp${varName}`] > 0) {
                        this[`goodTemp${varName}`]--;
                        this[`lootFrom${varName}`] += rewardFunc();
                    }
                    view.requestUpdate("updateRegular", {name: varName, index: this.index});
                }
            }

            // Collect checks from before this connection
            for(const item of this.client.items.received) {
                this.item(item.name);
            }

            // Send any checks that might have been found during a disconnection
            for(const action of towns[0].totalActionList) {
                if(action.type == "progress") {
                    let level = towns[0].getLevel(action.varName);
                    for(let i = 0; i <= level; i++) {
                        if(bar_locations.includes(i)) {
                            this.location(`Z1 - ${action.varName} - ${i}%`);
                        }
                    }
                }
                if(action.type == "limited") {
                    let checks = Math.floor(towns[0][`checked${action.varName}`] / limitedRewardRatios[action.varName]);
                    for(let i = 1; i <= checks; i++) {
                        this.location(`Z1 - ${action.varName} - #${i}`);
                    }
                }
            }
        }


        visible(action) {
            let defaultVisible = false;
            if(action.type == "limited" && towns[action.townNum][`total${action.varName}`] > 0) {
                defaultVisible = action._visible();
            }
            return defaultVisible || `Z${action.townNum + 1} - ${action.varName}` in this.state || `Z${action.townNum + 1} - ${action.varName} - Search` in this.state;
        }

        unlocked(action) {
            let defaultUnlocked = false;
            if(action.type == "limited" && towns[action.townNum][`total${action.varName}`] > 0) {
                defaultUnlocked = `Z${action.townNum + 1} - ${action.varName} - Search` in this.state
            }
            return defaultUnlocked || `Z${action.townNum + 1} - ${action.varName}` in this.state;
        }

        location(x) {
            const check = this.location_name_to_id?.[x] ?? false;
            if(check) {
                this.client.check(check);
            } else {
                console.log('Unknown location: "' + x + '"');
            }
        }
        
        /**
         * Called in order for every item rewarded, and also for every item in history on connection to catch the state up to speed.
         */
        item(x) {
            const [zone, action, ...rest] = x.split(" - ");
            if(x in this.state) {
                this.state[x]++;
            } else {
                this.state[x] = 1;
            }
            if(['Pots', 'Locks'].includes(action)) {
                view.updateRegular({name: action, index: +(zone.substring(1)) - 1});
            }
        }
    }
    window.IdleLoopsAP = new IdleLoopsAP_class();
    window.IdleLoopsAP.load();
})();