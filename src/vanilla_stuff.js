import styleCss from "./styles/style.scss";
import { name_map_reverse, limitedActions, new_actions, localization_strings } from "./data.js";
import { hook_action } from "./action.js";

const apStateHover = document.createElement("div");
apStateHover.classList.add("showthis");
const stateNode = document.createElement("div");
stateNode.innerHTML = "AP Filler Items";
apStateHover.appendChild(stateNode);

export function ap_load(name, seed, bonus) {
    saveName = "APSave" + name + seed;
    let first_load = false;
    if (!(window.localStorage[saveName] && window.localStorage[saveName] !== "null")) {
        first_load = true;
    }
    // I think this is the only place to put this - load might need the action to exist when loading a save that has it in its list.
    add_actions();

    // load, stop, gameIsStopped and pauseGame are globals defined by the game
    load();
    if ((!stop) && typeof stop !== "function" || (typeof gameIsStopped !== "undefined" && !gameIsStopped)) {
        pauseGame();
    }
    if (first_load) {
        totalOfflineMs = bonus;
    }
}


export function setup_ui(IdleLoopsAP) {
    const css = document.createElement("style");
    css.textContent = styleCss;
    document.head.appendChild(css);

    if (IdleLoopsAP.slotData.mod_ui_crime) {
        const limiteds = document.querySelectorAll(".townInfoContainer");
        for (const limited of limiteds) {
            const ui_crime = limited.querySelectorAll("i.fa-arrow-left")
            const slash = document.createElement("span");
            slash.textContent = " / ";
            ui_crime[0].replaceWith(slash);
            const unchecked = document.createElement("span");
            unchecked.textContent = "Unchecked: ";
            ui_crime[1].replaceWith(unchecked);
            const slash2 = document.createElement("span");
            slash2.textContent = " / ";
            ui_crime[2].replaceWith(slash2);
            const checked = document.createElement("span");
            checked.textContent = "Checked: ";
            ui_crime[3].replaceWith(checked);
        }
    }

    const logElement = document.createElement("ul");
    IdleLoopsAP.logElement = logElement;
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
            IdleLoopsAP.client.messages.say(input.value);
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

    if (IdleLoopsAP.newUI) {
        const actionLogTitle = document.querySelector("#actionLogTitle");
        actionLogTitle.classList.add("showthat");

        const actionLogContainer = document.getElementById("actionLogContainer");
        actionLogContainer.classList.add("ap");

        const logTitle = document.createElement("span");
        logTitle.innerHTML = " <span id=\"apSeparator\">|</span> <span id=\"apTitle\">AP Log</span>";
        actionLogTitle.appendChild(logTitle);
        actionLogTitle.addEventListener("click", () => {
            actionLogContainer.classList.toggle("ap");
        });
        actionLogTitle.appendChild(apStateHover);

        actionLogContainer.appendChild(messageElement);
        actionLogContainer.appendChild(logElement);
    } else {
        const container = document.createElement("div");
        container.style.width = "535px";
        container.style.maxHeight = "591px";
        container.style.overflow = "auto";
        container.style.display = "inline-flex";
        container.style.flexDirection = "column";
        container.style.alignItems = "center";

        const logTitle = document.createElement("div");
        logTitle.id = "apTitle";
        logTitle.classList.add("large", "bold", "showthat");
        logTitle.style.textAlign = "center";
        logTitle.textContent = "AP Log";
        logTitle.appendChild(apStateHover);

        messageElement.style.width = "calc(100% - 40px)";

        container.appendChild(logTitle);
        container.appendChild(messageElement);
        container.appendChild(logElement);
        const townColumn = document.getElementById("townColumn");
        townColumn.parentNode.insertBefore(container, townColumn.nextSibling);
    }
}

function loc(path, text, lib) {
    const doc = Localization.libs[lib];
    if (!doc) return;

    const split = path.split(">");
    let node = doc.documentElement;

    for (const part of split) {
        let next = null;
        for (const child of node.children) {
            if (child.tagName === part) {
                next = child;
                break;
            }
        }
        if (!next) {
            next = doc.createElement(part);
            node.appendChild(next);
        }
        node = next;
    }
    node.textContent = text;
}

function replace_image() {
    for (const el of document.querySelectorAll('[src="img/aPShopZ1.svg"]')) {
        el.src = "https://ihavenofunnyname.github.io/IdleLoopsAP/black-icon.svg";
    }
}

export function add_actions() {
    for (const [path, text] of localization_strings) {
        loc(path, text, "game");
        loc(path, text, "fallback");
    }

    for (const action of new_actions) {
        Action[action.varName] = action;
        view.createTownAction(action);
        totalActionList.push(action);
        // First time i gave up and used window.IdleLoopsAP instead of drilling it down
        hook_action(window.IdleLoopsAP, action);
    }

    // Sad to have to do this, but src is directly calculated from the action varname,
    // and i'm not seeing a good place to hook into to set it to what i want from the start.
    // So just fix it post hoc.
    replace_image();
    view._predictor_already_took_updateNextActions = view.updateNextActions;
    view.updateNextActions = () => {
        view._predictor_already_took_updateNextActions();
        replace_image();
    }
    view._update = view.update;
    view.update = () => {
        view._update();
        replace_image();
    }
}

export function update_ap_state(state) {
    let string = "<div>AP Filler Items</div><p>";
    for (const key in state) {
        if (key.startsWith("Filler - ")) {
            string += `${key.substring(9)}: ${state[key]}<br>`;
        }
    }
    stateNode.innerHTML = string + "</p>";
}

export function vanilla_overwrites(state) {
    restart = () => {
        shouldRestart = false;
        timer = 0;
        timeCounter = 0;
        effectiveTime = 0;
        timeNeeded = 250 + (50 * (state["Filler - 50 Starting Mana"]));
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
        resources.gold = state["Filler - 1 Starting Gold"];
        if (state["Z1 - Buy Glasses"] > 1) addResource("glasses", true);
        view.requestUpdate("updateResources", null);
    }
}

export function previous_locations(IdleLoopsAP) {
    // Send any checks that might have been found during a disconnection
    // We can't check previously completed actions :(
    for (let town = 0; town <= IdleLoopsAP.slotData.goal; town++) {
        for (const action of towns[town].totalActionList) {
            if (action.type == "progress") {
                let level = towns[town].getLevel(action.varName);
                for (let i = 0; i <= level; i++) {
                    IdleLoopsAP.location(`Z${town + 1} - ${name_map_reverse[action.varName]} - ${i}%`);
                }
            }
            if (action.type == "limited") {
                if (action.varName in limitedActions) {
                    let checks = Math.floor(towns[town][`checked${action.varName}`] / limitedActions[action.varName].ratio);
                    for (let i = 1; i <= checks; i++) {
                        IdleLoopsAP.location(`Z${town + 1} - ${name_map_reverse[action.varName]} - #${i}`);
                        if (i % 10 === 0) {
                            IdleLoopsAP.location(`Z${town + 1} - x10 ${name_map_reverse[action.varName]} - #${Math.floor(i / 10)}`);
                        }
                    }
                }
            }
        }
    }
    for (const skill in skills) {
        let level = getSkillLevel(skill);
        for (let i = 1; i <= level; i++) {
            IdleLoopsAP.location(`${name_map_reverse[skill]} - Level ${i}`);
        }
    }
    for (const buff in buffs) {
        let level = buffs[buff].amt;
        for (let i = 1; i <= level; i++) {
            IdleLoopsAP.location(`${name_map_reverse[buff]} - Level ${i}`);
        }
    }
}