import connectCss from "./styles/connect.scss";
import setupCss from "./styles/setup.scss";
import client from "./client.js";
/**
 * Creates the AP connect form and handles submission. 
 */
export function create_form(IdleLoopsAP, callback) {
    const css = document.createElement("style");
    css.textContent = connectCss;
    document.head.appendChild(css);

    const form = document.createElement("form");
    form.id = "APconnect";

    const apDefaults = {
        host: localStorage.getItem("APhost") || "archipelago.gg",
        port: localStorage.getItem("APport") || "",
        slotName: localStorage.getItem("APslotName") || "",
        password: localStorage.getItem("APpassword") || ""
    };

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const host = form.querySelector("#APhost").value;
        const port = form.querySelector("#APport").value;
        const slotName = form.querySelector("#APslotName").value;
        const password = form.querySelector("#APpassword").value;
        localStorage.setItem("APhost", host);
        localStorage.setItem("APport", port);
        localStorage.setItem("APslotName", slotName);
        localStorage.setItem("APpassword", password);

        const options = { slotData: true };
        if (password) {
            options.password = password;
        }

        const result = await client.connect(IdleLoopsAP, { host, port, slotName, options }, callback);
        if (!result) return;
        // Really belongs in post_submit, but we still have form in scope so...
        form.remove();
        post_submit(IdleLoopsAP);
    });

    form.innerHTML = `<input type=text id=APhost value=${apDefaults.host} placeholder=Host title=Host required>\
<input type="number" id="APport" value="${apDefaults.port}" placeholder="Port" title="Port" required>\
<input type="text" id="APslotName" value="${apDefaults.slotName}" placeholder="Slot Name" title="Slot Name" required>\
<input type="password" id="APpassword" value="${apDefaults.password}" placeholder="Password" title="Password">\
<button class="button" type="submit" style="padding:1px 10px">Connect</button>`;

    const manaDisplay = document.getElementById("trackedResources");
    manaDisplay.parentNode.insertBefore(form, manaDisplay.nextSibling);
};

async function post_submit(IdleLoopsAP) {
    const css = document.createElement("style");
    css.textContent = setupCss;
    document.head.appendChild(css);

    if (IdleLoopsAP.slotData.ui_crime) {
        const ui_crime = document.querySelectorAll("i.fa-arrow-left")
        const slash = document.createElement("span");
        slash.textContent = " / ";
        ui_crime[0].replaceWith(slash);
        const unchecked = document.createElement("span");
        unchecked.textContent = "Unchecked: ";
        ui_crime[1].replaceWith(unchecked);
    }

    const actionlogTitle = document.querySelector("#actionLogTitle");

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
}