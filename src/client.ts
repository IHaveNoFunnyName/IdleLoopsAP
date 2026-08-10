import * as AP from "./archipelago.min.js";
import { enable_predictor } from "./predictor.js";

import type { SlotData } from "./idle-loops-ap.js";

async function confirm_update(type: "older" | "newer", worldVersion: number[]) {
    const result = confirm(`This world you are trying to connect to was created using idleloops.apworld ${worldVersion.join(".")}, which is ${type} than this client mod version supports.\
 Click OK to change to a compatible version and refresh, or Cancel to cancel the connection.`)
    if (result) {
        const versions = await (await fetch("https://IHaveNoFunnyName.github.io/IdleLoopsAP/versions.json")).json() as { [version: string]: { min: string, max: string } };
        let version: string;
        let range: { min: string, max: string };
        for ([version, range] of Object.entries(versions)) {
            const min = range.min.split(".").map((v) => parseInt(v));
            const max = range.max.split(".").map((v) => parseInt(v));
            let compatible = true;
            for (const [i, version] of worldVersion.entries()) {
                if (version < min[i]) {
                    compatible = false;
                    break;
                }
                if (version > max[i]) {
                    compatible = false;
                    break;
                }
            }
            if (compatible) {
                break;
            }
        }
        window.localStorage.setItem("IdleLoopsAPVersion", version);
        location.reload();
    }
}

async function connect(IdleLoopsAP, { host, port, slotName, options }, callback) {
    const client = new AP.Client();
    // scope... Why not let me const it inside the try
    var slotData: SlotData;
    try {
        slotData = await client.login(host + ":" + port, slotName, "Idle Loops", options);
    } catch (err) {
        alert("Connection failed: " + err);
        return false;
    }

    const location_name_to_id = client.package.findPackage("Idle Loops").locationTable;

    slotData.version = slotData.version ?? ("Crafting - Level 1" in location_name_to_id ? "0.4.4" : "0.4.1");

    // I am quite surprised google didn't give me a simple 2-3 line version comparator, and i don't want to bloat the file size
    // Soooo, self writing something that should be a library it is.
    const world = slotData.version.split(".").map((v) => parseInt(v));
    const min = IdleLoopsAP.version.min.split(".").map((v) => parseInt(v));
    const max = IdleLoopsAP.version.max.split(".").map((v) => parseInt(v));
    for (const [i, v] of world.entries()) {
        if (v < min[i]) {
            await confirm_update("older", world);
            return false;
        }
        if (v > max[i]) {
            await confirm_update("newer", world);
            return false;
        }
    }

    // On the new UI the predictor can be toggled
    // but we need it to exist *on connect* to hook it.
    if (IdleLoopsAP.newUI) {
        enable_predictor();
        restart();
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    client.messages.on("message", (...content) => {
        const messageElement = document.createElement("li");
        // Some events pass two args, some three... Annoying.
        // But all have the same node structure and it's always the last arg.
        nodes_to_message(IdleLoopsAP, content.at(-1), messageElement);

        IdleLoopsAP.log_node(messageElement);
    });

    client.items.on("itemsReceived", (items, index) => {
        for (const item of items) {
            IdleLoopsAP.item(item.name);
        }
        if (IdleLoopsAP.predictor) IdleLoopsAP.predictor.cache.reset();
        view.updateNextActions();
    });

    callback.bind(IdleLoopsAP)(client, slotName, slotData, location_name_to_id);
    return true;
}

export function nodes_to_message(IdleLoopsAP, nodes, el) {
    // Wholesale copied from https://discord.com/channels/731205301247803413/1127258929357934662/1303861788248506368
    // Changed to make some nodes bold and darken colors in light mode. I searched a bit and couldn't find non-dark mode
    // AP colours so i just darkened a couple arbitrarily, i might be blind and there's a canonical set of colours i should have used though.
    for (const node of nodes) {
        const nodeElement = document.createElement("span");
        nodeElement.innerText = node.text;

        switch (node.type) {
            case "entrance":
            case "location":
                nodeElement.classList.add("ap-" + node.type);
                nodeElement.classList.add("ap-color");
                break;

            case "color":
                // not really correct, but technically the only color nodes the server returns is "green" or "red"
                // so it's fine enough for an example.
                nodeElement.style.color = node.color;
                nodeElement.style.fontWeight = "bold";
                break;

            case "player":
                if (node.player.slot === IdleLoopsAP.client.players.self.slot) {
                    nodeElement.classList.add("ap-player-self");
                } else {
                    nodeElement.classList.add("ap-player-other");
                }
                nodeElement.classList.add("ap-color");
                nodeElement.style.fontWeight = "bold";
                break;

            case "item": {
                // doesn't account for prog+useful or other combinations, but this is just as an example
                if (node.item.progression) {
                    nodeElement.classList.add("ap-item-progression");
                } else if (node.item.useful) {
                    nodeElement.classList.add("ap-item-useful");
                } else if (node.item.trap) {
                    nodeElement.classList.add("ap-item-trap");
                } else {
                    nodeElement.classList.add("ap-item");
                }
                nodeElement.classList.add("ap-color");
                nodeElement.style.fontWeight = "bold";
                break;
            }

            // no special coloring needed
            case "text":
            default:
                nodeElement.style.fontWeight = "initial";
                break;
        }

        el.appendChild(nodeElement);
    }
}

export default { connect };