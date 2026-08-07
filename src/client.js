import * as AP from "./archipelago.min.js";

async function connect(IdleLoopsAP, { host, port, slotName, options }, callback) {
    const client = new AP.Client();
    // scope... Why not let me const it inside the try
    var slotData;
    try {
        slotData = await client.login(host + ":" + port, slotName, "Idle Loops", options);
    } catch (err) {
        alert("Connection failed: " + err);
        return false;
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

    callback.bind(IdleLoopsAP)(client, slotName, slotData, client.package.findPackage("Idle Loops").locationTable);
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