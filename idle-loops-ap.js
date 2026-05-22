
(async function() {
    'use strict';

    const AP = await import("https://IHaveNoFunnyName.github.io/IdleLoopsAP/archipelago.min.js");

    const locations = ["0"];
    const bar_locations = [1, 10, 25, 50, 75, 90, 95, 99, 100];
    const Z1_locations = [];
    const Z1_bars = ["Wander"];
    const Z1_limited = [["Pots", 50]];

    for(const bar of Z1_bars) {
        for(const location of bar_locations) {
            locations.push("Z1 - " + bar + " - " + location + "%");
        }
    }

    for(const [name, max] of Z1_limited) {
        for(let i = 1; i <= max; i++) {
            locations.push("Z1 - " + name + " #" + i);
        }
    }

    const location_id = Object.fromEntries(Object.entries(locations).map(([k, v]) => [v, +k]));

    
    const limitedRewardRatios = {
        "Pots": 10
    }

    class IdleLoopsAP_class {
        client = false;
        // 0 indexed to make conditions simpler
        goalZone = 0;
        state = {
        };
        locations = locations;
        location_id = location_id;
        
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
                }

                towns[town] = new Proxy(towns[town], {
                    get: (target, prop, receiver) => {
                        // Item: Number of Limited Actions
                        // Overwrite whatever the game thinks it has with the number of checks of this type recieved
                        if (town <= window.IdleLoopsAP.goalZone && prop.startsWith("good")) {
                            const name = prop.substring(4);
                            if(!name.startsWith("Temp")) {
                                return this.state?.[`Z${town+1}${name}`] || 0;
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
                                this.location("Z1 - " + name + " #" + Math.floor(target['checked' + name] / rewardRatio));
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

                            if(newLevel > prevLevel && bar_locations.includes(newLevel)) {
                                this.location("Z1 - " + name + " - " + newLevel + "%");
                            }

                            return true;
                        }

                        return Reflect.set(target, prop, value, receiver);
                    }
                });
            }

            // Collect checks from before this connection
            for(const item of this.client.items.received) {
                this.item(item.name);
            }

            // Send any checks that might have been found during a disconnection
            // Hard coded for now
            let wanderLevel = towns[0].getLevel("Wander");
            for(let i = 0; i <= wanderLevel; i++) {
                if(bar_locations.includes(i)) {
                    this.location("Z1 - Wander - " + i + "%");
                }
            }
            let potsChecks = Math.floor(towns[0].checkedPots / limitedRewardRatios["Pots"]);
            for(let i = 1; i <= potsChecks; i++) {
                this.location("Z1 - Pots #" + i);
            }
        }


        visible(action) {
            let defaultVisible = false;
            if(action.type == "limited" && towns[action.townNum][`total${action.varName}`] > 0) {
                defaultVisible = action._visible();
            }
            return defaultVisible || "Z" + (action.townNum + 1) + action.varName in this.state;
        }

        unlocked(action) {
            let defaultUnlocked = false;
            if(action.type == "limited" && towns[action.townNum][`total${action.varName}`] > 0) {
                defaultUnlocked = action._unlocked();
            }
            return defaultUnlocked || "Z" + (action.townNum + 1) + action.varName in this.state;
        }

        location(x) {
            const check = this.location_id?.[x] ?? false;
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
            const [zone, action] = x.split(" - ");
            const name = zone + action;
            if(name in this.state) {
                this.state[name]++;
            } else {
                this.state[name] = 1;
            }
            if(action in ['Pots', 'Locks']) {
                console.log('wau')
                view.updateRegular({name: action, index: 0});
            }
        }
    }
    window.IdleLoopsAP = new IdleLoopsAP_class();
    window.IdleLoopsAP.load();
})();