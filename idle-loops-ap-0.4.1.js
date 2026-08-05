
(async function () {
    'use strict';

    const AP = await import("./archipelago.min.js");

    const name_map = { "Wander": "Wander", "Mana Pot": "Pots", "Lock": "Locks", "Buy Glasses": "BuyGlasses", "Buy Mana": "BuyMana", "Meet People": "Met", "Train Strength": "TrainStrength", "Short Quest": "SQuests", "Investigate": "Secrets", "Long Quest": "LQuests", "Throw Party": "ThrowParty", "Buy Supplies": "BuySupplies", "Haggle": "Haggle", "Start Journey": "StartJourney", "AP Shop": "APShop", "Heal The Sick": "Heal", "Fight Monsters": "Fight", "Small Dungeon": "SDungeon", "Warrior Lessons": "WarriorLessons", "Mage Lessons": "MageLessons", "Explore Forest": "Forest", "Wild Mana": "WildMana", "Herb": "Herbs", "Hunt": "Hunt", "Sit By Waterfall": "SitByWaterfall", "Old Shortcut": "Shortcut", "Talk To Hermit": "Hermit", "Brew Potions": "BrewPotions", "Train Dexterity": "TrainDexterity", "Train Speed": "TrainSpeed", "Follow Flowers": "Flowers", "Bird Watching": "BirdWatching", "Clear Thicket": "Thicket", "Talk To Witch": "Witch", "Continue On": "ContinueOn", "Practical Magic": "PracticalMagic", "Learn Alchemy": "LearnAlchemy", "Dark Magic": "DarkMagic", "Dark Ritual": "DarkRitual", "Explore City": "City", "Gamble": "Gamble", "Get Drunk": "Drunk", "Sell Potions": "SellPotions", "Adventure Guild": "AdvGuild", "Gather Team": "GatherTeam", "Crafting Guild": "CraftGuild", "Craft Armor": "CraftArmor", "Apprentice": "Apprentice", "Mason": "Mason", "Architect": "Architect", "Read Books": "ReadBooks", "Buy Pickaxe": "BuyPickaxe", "Start Trek": "StartTrek", "Large Dungeon": "LDungeon", "Climb Mountain": "Mountain", "Mana Geyser": "Geysers", "Decipher Runes": "Runes", "Explore Cavern": "Cavern", "Soulstone": "MineSoulstones", "Check Walls": "Illusions", "Artifact": "Artifacts", "Face Judgement": "FaceJudgement", "Hunt Trolls": "HuntTrolls", "Chronomancy": "Chronomancy", "Pyromancy": "Pyromancy", "Imbue Mind": "Imbue Mind" }
    const name_map_reverse = Object.fromEntries(Object.entries(name_map).map(([k, v]) => [v, k]));
    const skill_map = { "Combat": "Combat", "Magic": "Magic", "Practical Magic": "Practical", "Alchemy": "Alchemy", "Dark Magic": "Dark", "Ritual": "Ritual", "Crafting": "Crafting", "Chronomancy": "Chronomancy", "Pyromancy": "Pyromancy", "Imbue Mind": "Imbuement" }
    const skill_map_reverse = Object.fromEntries(Object.entries(skill_map).map(([k, v]) => [v, k]));

    const bar_locations = [1, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];
    const skill_locations = [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300];

    // The order here is used for the "progressive limited" item, so it's ordered in usefulness > zone (mostly)
    // Max isn't said explicitly anywhere in the code we could just read
    // Will have to be rewritten if we get to Survey
    const limitedActions = {
        "SQuests": { town: 0, max: 20, ratio: 5 },
        "LQuests": { town: 0, max: 10, ratio: 5 },
        "Locks": { town: 0, max: 10, ratio: 10 },
        "WildMana": { town: 1, max: 100, ratio: 10 },
        "Gamble": { town: 2, max: 20, ratio: 10 },
        "Herbs": { town: 1, max: 200, ratio: 10 },
        "Geysers": { town: 3, max: 10, ratio: 100 },
        "MineSoulstones": { town: 3, max: 30, ratio: 10 },
        "Hunt": { town: 1, max: 20, ratio: 10 },
        "Artifacts": { town: 3, max: 20, ratio: 25 },
        "Pots": { town: 0, max: 9999, ratio: 10 },
    }
    const segments = {
        "Heal": 3,
        "Fight": 3,
        "SDungeon": 7,
        "AdvGuild": 3,
        "LDungeon": 7,
        "CraftGuild": 3,
        "HuntTrolls": 5,
    }

    const skill_actions = ["WarriorLessons", "MageLessons", "PracticalMagic", "LearnAlchemy", "DarkMagic"];

    class IdleLoopsAP_class {
        client = false;
        // 0 indexed cos that's what the game does
        goalZone = 0;
        offlineTime = 0;
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
        location_name_to_id = {};
        predictor = false;
        newUI = false;

        /**
         * Called on script load, to inject the AP connect form
         */
        load() {
            // Some light CSS. We have two UIs to handle, the original and a responsive one, determined with html.responsive
            // Most of the changes were coincidentally the same ones the responsive UI made, for me it was to make space for
            // the connect form, but it also just looks better, so we don't have to do them on html.responsive 

            // i miss SCSS pensive
            const css = document.createElement("style");
            css.textContent = `
            html:not(.responsive) #menu {
                display: inline-flex;
                width: 1px;
                }
            #APconnect {
                display: inline-flex;
                position: fixed;
                top: 15px;
                right: 0;
                align-items: center;
                width: 430px;
            }
            #APconnect button {
                min-width: 66px;
                margin-top: 6px;
            }`
            document.head.appendChild(css);

            const connect = document.createElement("form");
            connect.id = "APconnect";

            const apDefaults = {
                host: localStorage.getItem("APhost") || "archipelago.gg",
                port: localStorage.getItem("APport") || "",
                slotName: localStorage.getItem("APslotName") || "",
                password: localStorage.getItem("APpassword") || ""
            };

            connect.addEventListener("submit", (e) => {
                e.preventDefault();

                const host = connect.querySelector("#APhost").value;
                const port = connect.querySelector("#APport").value;
                const slotName = connect.querySelector("#APslotName").value;
                const password = connect.querySelector("#APpassword").value;
                localStorage.setItem("APhost", host);
                localStorage.setItem("APport", port);
                localStorage.setItem("APslotName", slotName);
                localStorage.setItem("APpassword", password);

                const options = {};
                if (password) {
                    options.password = password;
                }

                this.connect(host, port, slotName, options);
            });

            connect.innerHTML = `
                <input type="text" id="APhost" value="${apDefaults.host}" placeholder="Host" title="Host" required style="width:50%;cursor:initial;">&nbsp;
                <input type="number" id="APport" value="${apDefaults.port}" placeholder="Port" title="Port" required style="width:25%;cursor:initial;">&nbsp;
                <input type="text" id="APslotName" value="${apDefaults.slotName}" placeholder="Slot Name" title="Slot Name" required style="width:50%;cursor:initial;">&nbsp;
                <input type="password" id="APpassword" value="${apDefaults.password}" placeholder="Password" title="Password" style="width:50%;cursor:initial;">&nbsp;
                <button class="button" type="submit" style="padding:1px 10px">Connect</button>
            `;

            const manaDisplay = document.getElementById("trackedResources");
            manaDisplay.parentNode.insertBefore(connect, manaDisplay.nextSibling);
        }

        /**
         * Called on form submit. Connects to AP, loads a separate AP save, 
         */
        async connect(host, port, slotName, options) {
            this.client = new AP.Client();
            try {
                await this.client.login(host + ":" + port, slotName, "Idle Loops", options);
                this.location_name_to_id = this.client.package.findPackage("Idle Loops").locationTable
            } catch (err) {
                alert("Connection failed: " + err);
                return;
            }
            document.getElementById("APconnect").remove();
            await this.setup();
            saveName = "APSave" + slotName + this.client.room.seedName;
            let first_load = false;
            if (!(window.localStorage[saveName] && window.localStorage[saveName] !== "null")) {
                first_load = true;
            }
            load();
            if ((!stop) && typeof stop !== "function" || (typeof gameIsStopped !== "undefined" && !gameIsStopped)) {
                pauseGame();
            }
            if (first_load) {
                totalOfflineMs = this.offlineTime;
            }
            this.post_load();
        }

        /**
         * Sets up the game for Archipelago, overwriting functions and injecting HTML, anything that isn't wiped by the game loading.
         * I don't know why i split it like this when i'm not planning on handling dis/reconnecting yet. There is no un-setup. Refresh.
         * Called after a successful connection but before data from the connection is processed.
         */
        async setup() {
            const css = document.createElement("style");
            css.textContent =
                `#actionLogTitle {
                cursor: pointer;
            }
            body.t-dark #actionLogContainer #apSeparator {
                color: white;
            }
            #actionLogContainer #apSeparator {
                color: black;
            }
            #actionLogContainer:not(.ap) #apTitle {
                color: gray;
            }
            #actionLogContainer:not(.ap) #actionLog {
                display: block;
            }
            #actionLogContainer:not(.ap) #apLog, #actionLogContainer:not(.ap) #apMessage {
                display: none !important;
            }
            #actionLogContainer.ap #actionLogTitle {
                color: gray;
            }
            #actionLogContainer.ap #apTitle {
                color: black;
            }
            body.t-dark #actionLogContainer.ap #apTitle {
                color: white;
            }
            #actionLogContainer.ap #actionLog {
                display: none;
            }
            #actionLogContainer.ap #apLog, #actionLogContainer.ap #apMessage {
                display: block;
            }
            [id^="infoContainer"]:not(.ap-search) span:has(+[id^="unchecked"]), [id^="infoContainer"]:not(.ap-search) [id^="unchecked"] {
                color: gray;
                text-decoration: line-through;
            }`
            document.head.appendChild(css);

            const actionlogTitle = document.querySelector("#actionLogTitle");
            this.newUI = actionlogTitle !== null;

            const logElement = document.createElement("ul");
            this.logElement = logElement;
            logElement.id = "apLog";
            logElement.style.overflowY = "scroll";

            const messageElement = document.createElement("div");
            messageElement.id = "apMessage";
            messageElement.style.display = "flex";
            messageElement.style.paddingLeft = "40px";
            const messageInput = document.createElement("input");
            messageInput.type = "text";
            messageInput.style.cursor = "initial";
            messageInput.style.flexGrow = "1";
            messageInput.style.marginRight = "10px";
            messageInput.id = "apMessageInput";
            const messageSend = document.createElement("button");
            messageSend.className = "button";
            messageSend.id = "apMessageSend";
            messageSend.textContent = "Send";

            const send = () => {
                const input = document.getElementById("apMessageInput");
                if (input.value.length > 0) {
                    window.IdleLoopsAP.client.messages.say(input.value);
                    input.value = "";
                }
            }
            messageSend.addEventListener("click", send);
            messageInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    send();
                }
            });

            messageElement.appendChild(messageInput);
            messageElement.appendChild(messageSend);

            if (this.newUI) {
                const actionLogContainer = document.getElementById("actionLogContainer");
                const logTitle = document.createElement("span");
                logTitle.innerHTML = " <span id=\"apSeparator\">|</span> <span id=\"apTitle\">AP Log</span>";
                actionLogTitle.appendChild(logTitle);
                actionLogTitle.addEventListener("click", () => {
                    actionLogContainer.classList.toggle("ap");
                });
                actionLogContainer.appendChild(messageElement);
                actionLogContainer.appendChild(logElement);
            } else {
                const container = document.createElement("div");
                container.style.width = "535px";
                container.style.maxHeight = "591px";
                container.style.overflow = "auto";
                container.innerHTML = "<div class=\"large bold\" style=\"width:100%;text-align:center;\">AP Log</div>";
                container.appendChild(messageElement);
                container.appendChild(logElement);
                const townColumn = document.getElementById("townColumn");
                townColumn.parentNode.insertBefore(container, townColumn.nextSibling);
            }

            this.client.messages.on("message", (content) => {
                this.log(content);
            });

            this.client.items.on("itemsReceived", (items, index) => {
                for (const item of items) {
                    this.item(item.name);
                }
                if (this.predictor) this.predictor.cache.reset();
                view.updateNextActions();
            });

            const data = await this.client.players.self.fetchSlotData();
            this.goalZone = data.goal;
            this.offlineTime = data.bonus;
        }
        post_load() {

            // If the Predictor is installed, hook into it to handle starting filler
            // Because you have to click the connect button the predictor *surely* already exists. Skill issue if you click it before the page fully loads.
            // There's nothing relevant about .predict, it's that the whole predictor is mostly one big function except for this ONE PART that gets called with state
            // And that saves me from having to fork it or something

            // This bit is at the start of post_load so for the new UI we disable the web worker before all our hooking causes it to freak out.
            if (typeof Koviko !== "undefined") {
                if (Koviko.predictor) {
                    this.predictor = Koviko.predictor;
                    console.log("AP: Forcing local predictor, ignore next error")
                    Koviko.predictor.handleWorkerMessage({ data: { type: "error" } })
                } else {
                    this.predictor = Koviko;
                }
                const predict = function (prediction, state) {
                    if (Object.values(state.stats).every(stat => stat === 0)) {
                        state.resources.mana += (50 * IdleLoopsAP.state["Filler - 50 Starting Mana"]);
                        state.resources.gold += IdleLoopsAP.state["Filler - 1 Starting Gold"]
                    }
                    // Update the amount of ticks necessary to complete the action, but only once at the start of the action
                    prediction.updateTicks(prediction.action, state.stats, state);

                    // Perform all ticks in succession
                    for (let ticks = 0; ticks < prediction.ticks(); ticks++) {
                        state.resources.mana--;
                        if (state.resources.mana >= 0) {
                            if (!this.tick(prediction, state)) break;
                        }
                    }
                }
                this.predictor.predict = predict;
            }

            // Idle Loops scatters *all* of its stuff all around global scope
            // but in a way that doesn't show up in `window`
            // i'd really prefer it to be obvious when i'm using global scope
            for (let town = 0; town <= this.goalZone; town++) {

                // Overwriting action visibility and unlocked
                // And send a check when finishing an action, it's meant to be for the first time but the client filters duplicate checks
                // Not optimized but whatever
                for (const action of towns[town].totalActionList) {
                    action._visible = action.visible;
                    action.visible = function () {
                        return window.IdleLoopsAP.visible(this);
                    }
                    action._unlocked = action.unlocked;
                    action.unlocked = function () {
                        return window.IdleLoopsAP.unlocked(this);
                    }

                    if (action.type == "progress") {
                        const el = document.querySelector(`#infoContainer${action.varName} .showthat`);
                        const hover = el.querySelector(".showthis");
                        el.addEventListener("mouseover", () => { window.IdleLoopsAP.scoutProgress(hover, town, action.varName) });
                    }

                    if (action.type == "limited") {
                        const el = document.querySelector(`#infoContainer${action.varName} .showthat`);
                        const badUIdecisions = el.querySelectorAll(".fa-arrow-left")
                        const slash = document.createElement("span");
                        slash.textContent = " / ";
                        badUIdecisions[0].replaceWith(slash);
                        const unchecked = document.createElement("span");
                        unchecked.textContent = "Unchecked: ";
                        badUIdecisions[1].replaceWith(unchecked);

                        const hover = el.querySelector(".showthis");
                        el.addEventListener("mouseover", () => { window.IdleLoopsAP.scoutLimited(hover, town, action.varName) });
                    }

                    // Annoyingly skill actions are of type normal
                    if (action.type == "normal" && !skill_actions.includes(action.varName)) {
                        let name = action.varName.startsWith("BuyMana") ? `BuyMana` : action.varName;
                        action._finish = action.finish;
                        action.finish = function () {
                            window.IdleLoopsAP.location(`Z${town + 1} - ${name_map_reverse[name]}`);
                            if (window.IdleLoopsAP.goalZone == 0 && this.varName == "StartJourney") {
                                window.IdleLoopsAP.client.goal();
                            } else if (window.IdleLoopsAP.goalZone == 1 && this.varName == "ContinueOn") {
                                window.IdleLoopsAP.client.goal();
                            } else if (window.IdleLoopsAP.goalZone == 2 && this.varName == "StartTrek") {
                                window.IdleLoopsAP.client.goal();
                            } else if (window.IdleLoopsAP.goalZone == 3 && this.varName == "FaceJudgement") {
                                window.IdleLoopsAP.client.goal();
                            }
                            return this._finish();
                        }
                        const el = document.querySelector(`#container${action.varName}.showthat`);
                        const hover = el.querySelector(".showthis");
                        const scoutcontainer = document.createElement("div");
                        scoutcontainer.classList.add("scout");
                        hover.prepend(document.createElement("br"));
                        hover.prepend(scoutcontainer);
                        el.addEventListener("mouseover", () => { window.IdleLoopsAP.scoutRegular(scoutcontainer, town, name) });
                    }

                    if (action.type == "multipart") {
                        const el = document.querySelector(`#container${action.varName}.showthat`);
                        const hover = el.querySelector(".showthis");
                        const scoutcontainer = document.createElement("div");
                        scoutcontainer.classList.add("scout");
                        hover.prepend(document.createElement("br"));
                        hover.prepend(scoutcontainer);
                        el.addEventListener("mouseover", () => { window.IdleLoopsAP.scoutMultipart(scoutcontainer, town, action.varName) });
                    }
                }


                // We rewrote the second half of this function
                const finishRegular = function (varName, rewardRatio, rewardFunc) {
                    // error state, negative numbers.
                    if (this[`total${varName}`] - this[`checked${varName}`] < 0) {
                        this[`checked${varName}`] = this[`total${varName}`];
                        this[`good${varName}`] = Math.floor(this[`total${varName}`] / rewardRatio);
                        this[`goodTemp${varName}`] = this[`good${varName}`];
                        console.log("Error state fixed");
                    }

                    // Add player having "- Search" to vanilla check lootable logic/behaviour (minus the commented line)
                    // Add an early return so it can flow to looting lootables in any other case
                    const searchToggler = document.getElementById(`searchToggler${varName}`);
                    if (window.IdleLoopsAP.state[`Z${this.index + 1} - ${varName} - Search`] && this[`total${varName}`] - this[`checked${varName}`] > 0 && ((searchToggler && !searchToggler.checked) || this[`goodTemp${varName}`] <= 0)) {
                        this[`checked${varName}`]++;
                        if (this[`checked${varName}`] % rewardRatio === 0) {
                            //this[`lootFrom${varName}`] += rewardFunc();
                            this[`good${varName}`]++;
                        }
                        view.requestUpdate("updateRegular", { name: varName, index: this.index });
                        return;
                    }

                    if (this[`goodTemp${varName}`] > 0) {
                        this[`goodTemp${varName}`]--;
                        this[`lootFrom${varName}`] += rewardFunc();
                    }
                    view.requestUpdate("updateRegular", { name: varName, index: this.index });
                }

                towns[town] = new Proxy(towns[town], {
                    get: (target, prop, receiver) => {
                        // Item: Number of Limited Actions
                        // Overwrite whatever the game thinks it has with the number of checks of this type recieved
                        if (typeof prop === "string" && prop.startsWith("good")) {
                            const name = prop.substring(4);
                            if (!name.startsWith("Temp")) {
                                return this.effectiveLimited(name);
                            }
                        } else if (typeof prop === "string" && prop === "finishRegular") {
                            return finishRegular.bind(receiver);
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
                        if (value > 0 && typeof prop === "string" && prop.startsWith("good")) {
                            const name = prop.substring(4);
                            if (!name.startsWith("Temp")) {
                                const rewardRatio = limitedActions[name].ratio;
                                this.location(`Z${town + 1} - ${name_map_reverse[name]} - #${Math.floor(target['checked' + name] / rewardRatio)}`);
                                return true;
                            }
                        }

                        // Location: Gaining a Progress Bar %
                        // We could get this by overwriting town.finishProgress, but right now i prefer to do as much as possible via proxies
                        // Just documenting alternate solutions to get a head start later if this ends up broken
                        if (typeof prop === "string" && prop.startsWith("exp")) {
                            const name = prop.substring(3);
                            const prevLevel = target.getLevel(name);
                            Reflect.set(target, prop, value, receiver);
                            const newLevel = target.getLevel(name);
                            for (let i = prevLevel + 1; i <= newLevel; i++) {
                                if (bar_locations.includes(i)) {
                                    this.location(`Z${town + 1} - ${name_map_reverse[name]} - ${i}%`);
                                }
                            }
                            return true;
                        }

                        // Location: Finishing a Multipart action
                        // The game doesn't seem to store highest completion so RIP to sending missed checks on reconnection
                        // At least doing your highest completion again is trivial
                        if (value > 0 && typeof prop === "string" && prop.endsWith("LoopCounter")) {
                            const name = prop.substring(0, prop.length - 11);
                            // Silly way to not send checks for buffs, just don't put them in segments
                            if (name in segments) {
                                this.location(`Z${town + 1} - ${name_map_reverse[name]} - Completion #${value / segments[name]}`);
                            }
                        }

                        return Reflect.set(target, prop, value, receiver);
                    }
                });
            }

            for (const skill in skills) {
                if (this.newUI) {
                    skills[skill].levelExp.addExp = function (exp) {
                        const prevLevel = getSkillLevel(skill);
                        const success = LevelExp.prototype.addExp.call(this, exp);
                        const newLevel = getSkillLevel(skill);
                        for (let i = prevLevel + 1; i <= newLevel; i++) {
                            window.IdleLoopsAP.location(`${skill_map_reverse[skill]} - Level ${i}`);
                        }
                    }
                } else {
                    skills[skill] = new Proxy(skills[skill], {
                        set: (target, prop, value, receiver) => {
                            if (prop !== "exp") {
                                return Reflect.set(target, prop, value, receiver);
                            }
                            const prevLevel = getSkillLevel(skill);
                            const success = Reflect.set(target, prop, value, receiver);
                            const newLevel = getSkillLevel(skill);
                            for (let i = prevLevel + 1; i <= newLevel; i++) {
                                window.IdleLoopsAP.location(`${skill_map_reverse[skill]} - Level ${i}`);
                            }
                            return success;
                        }
                    });
                }

                const el = document.querySelector(`#skill${skill}Container.showthat`);
                const hover = el.querySelector(".showthis");
                const scoutcontainer = document.createElement("div");
                scoutcontainer.classList.add("scout");
                hover.prepend(document.createElement("br"));
                hover.prepend(scoutcontainer);
                el.addEventListener("mouseover", () => { window.IdleLoopsAP.scoutSkill(scoutcontainer, skill) });
            }

            for (const buff in buffs) {
                buffs[buff] = new Proxy(buffs[buff], {
                    set: (target, prop, value, receiver) => {
                        const prevLevel = target[prop];
                        const success = Reflect.set(target, prop, value, receiver);
                        const newLevel = value;
                        for (let i = prevLevel + 1; i <= newLevel; i++) {
                            window.IdleLoopsAP.location(`${skill_map_reverse[buff]} - Level ${i}`);
                        }
                        return success;
                    }
                });
            }

            restart = () => {
                shouldRestart = false;
                timer = 0;
                timeCounter = 0;
                effectiveTime = 0;
                timeNeeded = 250 + (50 * (this.state["Filler - 50 Starting Mana"]));
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
                resources.gold = this.state["Filler - 1 Starting Gold"];
                if (getExploreProgress() >= 100) addResource("glasses", true);
                view.requestUpdate("updateResources", null);
            }

            // Collect checks from before this connection
            for (const item of this.client.items.received) {
                this.item(item.name, true);
            }
            if (this.predictor) this.predictor.cache.reset();
            view.updateNextActions();

            // Send any checks that might have been found during a disconnection
            for (let town = 0; town <= this.goalZone; town++) {
                for (const action of towns[town].totalActionList) {
                    if (action.type == "progress") {
                        let level = towns[town].getLevel(action.varName);
                        for (let i = 0; i <= level; i++) {
                            if (bar_locations.includes(i)) {
                                this.location(`Z${town + 1} - ${name_map_reverse[action.varName]} - ${i}%`);
                            }
                        }
                    }
                    if (action.type == "limited") {
                        if (action.varName in limitedActions) {
                            let checks = Math.floor(towns[town][`checked${action.varName}`] / limitedActions[action.varName].ratio);
                            for (let i = 1; i <= checks; i++) {
                                this.location(`Z${town + 1} - ${name_map_reverse[action.varName]} - #${i}`);
                            }
                        }
                    }
                }
            }
            for (const skill in skills) {
                let level = getSkillLevel(skill);
                for (let i = 1; i <= level; i++) {
                    this.location(`${skill_map_reverse[skill]} - Level ${i}`);
                }
            }
            for (const buff in buffs) {
                let level = buffs[buff].amt;
                for (let i = 1; i <= level; i++) {
                    this.location(`${skill_map_reverse[buff]} - Level ${i}`);
                }
            }
        }

        effectiveLimited(varName) {
            let extra = this.state["Filler - Progressive Lootable"];
            let oldExtra = extra;

            // Edge case for LQuests, we want an extra 'fake' LQuests with max 2, to guarantee 2 rep.
            if ((this.state["Z1 - LQuests"]) < 2) {
                extra -= Math.max(0, 2 - this.state["Z1 - LQuests"]);
                if (extra <= 0) {
                    if (varName === "LQuests") {
                        return (this.state["Z1 - LQuests"]) + oldExtra;
                    } else {
                        return this.state[`Z${limitedActions?.[varName]?.town + 1} - ${varName}`];
                    }
                }
                // Edge case for the edge case - if we somehow managed to cap SQuests with Progressive before finding 2 LQuests,
                // we don't want to double use progressives on LQuests.
                if (oldExtra !== extra && (this.state["Z1 - SQuests"] + extra >= 20)) {
                    extra += oldExtra - extra;
                } else if (varName === "LQuests") {
                    // This path is reached if we have enough to get 2 LQuests but not enough to get 20 SQuests, to which we always return 2
                    return 2;
                }
                oldExtra = extra;
            }

            for (const limited in limitedActions) {

                if (limitedActions[limited].town > this.goalZone) {
                    continue;
                }

                const limitedObj = limitedActions[limited];
                if (varName === limited) {
                    extra -= Math.max(0, limitedObj.max - this.state[`Z${limitedObj.town + 1} - ${limited}`]);
                    if (extra <= 0) {
                        return this.state[`Z${limitedObj.town + 1} - ${limited}`] + oldExtra;
                    } else {
                        return limitedObj.max;
                    }
                }
                if (varName === limited) {
                    return this.state[`Z${limitedObj.town + 1} - ${limited}`];
                }
                extra -= Math.max(0, limitedObj.max - this.state[`Z${limitedObj.town + 1} - ${limited}`]);
                if (extra <= 0) {
                    break;
                }
                oldExtra = extra;
            }

            return this.state[`Z${limitedActions?.[varName]?.town + 1} - ${varName}`];
        }

        lastEffectiveLimited(endVarName) {
            let extra = this.state["Filler - Progressive Lootable"];
            let oldExtra = extra;

            if ((this.state["Z1 - LQuests"]) < 2) {
                extra -= Math.max(0, 2 - this.state["Z1 - LQuests"]);
                if (extra <= 0) {
                    if (endVarName === "LQuests" || typeof endVarName === "undefined") {
                        return "LQuests";
                    }
                    return false;
                }
                if (oldExtra !== extra && (this.state["Z1 - SQuests"] + extra >= 20)) {
                    extra += oldExtra - extra;
                }
            }

            for (const limited in limitedActions) {

                if (limitedActions[limited].town > this.goalZone) {
                    continue;
                }

                const limitedObj = limitedActions[limited];
                extra -= Math.max(0, limitedObj.max - this.state[`Z${limitedObj.town + 1} - ${limited}`]);
                if (extra <= 0) {
                    return endVarName === limited || typeof endVarName === "undefined" ? limited : false;
                }
                if (endVarName === limited) {
                    return false;
                }
                oldExtra = extra;
            }
        }

        visible(action) {
            let defaultVisible = false;
            if (action.type == "limited") {
                defaultVisible = action._visible() || this.effectiveLimited(action.varName) > 0;
            }
            return defaultVisible || `Z${action.townNum + 1} - ${action.varName}` in this.state || `Z${action.townNum + 1} - ${action.varName} - Search` in this.state;
        }

        unlocked(action) {
            let defaultUnlocked = false;
            if (action.type == "limited") {
                defaultUnlocked = `Z${action.townNum + 1} - ${action.varName} - Search` in this.state || this.effectiveLimited(action.varName) > 0;
            }
            return defaultUnlocked || `Z${action.townNum + 1} - ${action.varName}` in this.state;
        }

        location(x) {
            const check = this.location_name_to_id?.[x] ?? false;
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
                x = [zone, action, ...rest].join(" - ");
            }
            // We don't have to check if it exists, it's proxied to 0 when it doesn't
            // so this will set it to 1 in that case
            this.state[x]++;

            if (limitedActions?.[action]) {
                if (rest.length === 0) {
                    const lastEffective = this.lastEffectiveLimited(action);
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
                    const effective = this.lastEffectiveLimited();
                    if (!old) this.log(`Progressive Lootable had the effect of an extra ${name_map_reverse[effective]}`);
                    view.updateRegular({ name: effective, index: limitedActions[effective].town });
                }
            } else if (action === "ThrowParty") {
                const unhideMet = document.createElement("style");
                unhideMet.innerHTML = `#infoContainerMet:not(.user-hidden) {
                    display: contents !important;
                }
                :root.editing-hidden-vars #infoContainerMet.user-hidden {
                    display: contents !important;
                }`;
                document.head.appendChild(unhideMet);
            }
        }

        log(x) {
            const message = document.createElement("li");
            message.textContent = x;
            this.logElement.insertBefore(message, this.logElement.firstChild);
        }

        async scoutRegular(el, town, varName) {
            if (completedActions.includes(varName)) {
                el.textContent = "No more checks";
                return;
            }
            const name = varName.startsWith("BuyMana") ? `BuyMana` : varName;
            const location_name = `Z${town + 1} - ${name_map_reverse[name]}`;

            const location = this.location_name_to_id[location_name];
            let scout
            if (location in this.scouts) {
                scout = this.scouts[location];
            } else {
                el.textContent = `Scouting...`;

                scout = await this.client.scout([location], 2)
                this.scouts[location] = scout;
            }
            el.textContent = `Finishing this action will grant ${scout[0].receiver.name}'s "${scout[0].name}"`;
        }

        async scoutProgress(el, town, varName) {
            const lines = el.innerHTML.split("<br>");
            const level = towns[town].getLevel(varName);
            if (level < 100) {
                let next = 0;
                let i = 0;
                while (next <= level) {
                    next = bar_locations[i];
                    i++;
                }
                const location = this.location_name_to_id[`Z${town + 1} - ${name_map_reverse[varName]} - ${next}%`];
                let scout
                if (location in this.scouts) {
                    scout = this.scouts[location];
                } else {
                    lines[0] = `Scouting...`;
                    el.innerHTML = lines.join("<br>");

                    scout = await this.client.scout([location], 0)
                    this.scouts[location] = scout;
                }
                lines[0] = `${scout[0].receiver.name}'s "${scout[0].name}" is at ${next}%`;
            } else {
                lines[0] = "No more checks";
            }
            el.innerHTML = lines.join("<br>");
        }

        async scoutLimited(el, town, varName) {
            const lines = el.innerHTML.split("<br>");
            const checks = Math.floor(towns[town][`checked${varName}`] / limitedActions[varName].ratio);
            const location_name = `Z${town + 1} - ${name_map_reverse[varName]} - #${checks + 1}`;
            let check;
            if (!this.state[`Z${town + 1} - ${varName} - Search`]) {
                check = `"Z${town + 1} - ${name_map_reverse[varName]} - Search" needs to be found first`;
            } else if (location_name in this.location_name_to_id) {
                const location = this.location_name_to_id[location_name];
                let scout
                if (location in this.scouts) {
                    scout = this.scouts[location];
                    check = `${scout[0].receiver.name}'s "${scout[0].name}" Next`
                } else {
                    lines[0] = `Scouting...`;
                    el.innerHTML = lines.join("<br>");

                    scout = await this.client.scout([location], 0)
                    this.scouts[location] = scout;
                    check = `${scout[0].receiver.name}'s "${scout[0].name}" Next`
                }
            } else {
                check = "No more checks";
            }
            lines[0] = `<span style="white-space: pre;">Sends a Check to AP every ${limitedActions[varName].ratio} checked.\n${check}</span>`;
            el.innerHTML = lines.join("<br>");
        }

        async scoutMultipart(el, town, varName) {
            const location_name_base = `Z${town + 1} - ${name_map_reverse[varName]} - Completion #`;
            let location_name;
            let i = 0;
            while (true) {
                location_name = `${location_name_base}${i + 1}`;
                if (this.client.room.missingLocations.includes(this.location_name_to_id[location_name])) {
                    break;
                }
                if (!(location_name in this.location_name_to_id)) {
                    el.textContent = "No more checks";
                    return;
                }
                i++;
            }
            const location = this.location_name_to_id[location_name];
            let scout
            if (location in this.scouts) {
                scout = this.scouts[location];
            } else {
                el.textContent = `Scouting...`;

                scout = await this.client.scout([location], 2)
                this.scouts[location] = scout;
            }
            el.textContent = `Completed difficulty: ${i}. The next completion will grant ${scout[0].receiver.name}'s "${scout[0].name}"`;
        }

        async scoutSkill(el, skill) {
            const level = getSkillLevel(skill);
            if (level < 300) {
                let next = level;
                let i = 0;
                let location;
                while (next <= 300) {
                    location = this.location_name_to_id[`${skill_map_reverse[skill]} - Level ${next}`] ?? false;
                    if (location) break;
                    next++;
                }
                let scout
                if (location in this.scouts) {
                    scout = this.scouts[location];
                } else {
                    el.textContent = `Scouting...`;

                    scout = await this.client.scout([location], 2)
                    this.scouts[location] = scout;
                }
                el.textContent = `${scout[0].receiver.name}'s "${scout[0].name}" is at Level ${next}`;
            } else {
                el.textContent = "No more checks";
            }
        }
    }
    window.IdleLoopsAP = new IdleLoopsAP_class();
    window.IdleLoopsAP.load();
})();