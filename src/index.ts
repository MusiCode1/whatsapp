import express from "express";
import { msg_router } from "./server.js";
import { client } from "./whatsapp-api.js"

const app = express();
app.use(msg_router);




const server = app.listen(3000, "127.0.0.1", () => {
    console.log("listen in port 3000...");

    client.initialize();

    client.on("disconnected", () => {
        server.close();
        console.log("whatsapp client disconnected");
    
    });
});

process.on('SIGINT', function () {
    console.log('Ctrl-C...');
    //client.destroy();
    client.pupPage?.close()
    server.close();
    process.exit(2);
});