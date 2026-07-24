import connectCss from "./styles/connect.scss";
import client from "./client.js";
import { setup_ui } from "./vanilla_stuff.js";
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
        setup_ui(IdleLoopsAP);
    });

    form.innerHTML = `<input type=text id=APhost value=${apDefaults.host} placeholder=Host title=Host required>\
<input type="number" id="APport" value="${apDefaults.port}" placeholder="Port" title="Port" required>\
<input type="text" id="APslotName" value="${apDefaults.slotName}" placeholder="Slot Name" title="Slot Name" required>\
<input type="password" id="APpassword" value="${apDefaults.password}" placeholder="Password" title="Password">\
<button class="button" type="submit" style="padding:1px 10px">Connect</button>`;

    const manaDisplay = document.getElementById("trackedResources");
    manaDisplay.parentNode.insertBefore(form, manaDisplay.nextSibling);
};