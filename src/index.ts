import express from "express";
import { msg_router } from "./server.js";
import { client } from "./whatsapp-api.js"

const app = express();
app.use(msg_router);


client.initialize().then(() => {

    const server = app.listen(3000, "127.0.0.1", () => {

        console.log("listen in port 3000...");

        const on_close = () => {
            server.close();
            console.log("whatsapp client disconnected");
            process.exit(2);
        };

        client.pupPage?.on("close", on_close);
        client.pupPage?.on("error", on_close);

        client.on("disconnected", on_close);

        process.on('SIGINT', () => {
            console.log('Ctrl-C...');

            on_close();
        });

    });

});