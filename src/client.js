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

    client.messages.on("message", (content) => {
        IdleLoopsAP.log(content);
    });

    client.items.on("itemsReceived", (items, index) => {
        for (const item of items) {
            IdleLoopsAP.item(item.name);
        }
        if (IdleLoopsAP.predictor) IdleLoopsAP.predictor.cache.reset();
        IdleLoopsAP.view.updateNextActions();
    });

    callback.bind(IdleLoopsAP)(client, slotName, slotData, client.package.findPackage("Idle Loops").locationTable);
    return true;
}

export default { connect };