import 'dotenv/config.js';

import express from "express";
import { msg_router } from "./server.js";
import { client as wa_client } from "./whatsapp-api.js";

import type { Server } from "http";


const app = express();
app.use(msg_router);

const PORT = Number(process.env.PORT) || 3000;

(async () => {

    console.log("start...");

    const server = app.listen(PORT,
        () => console.log(`listen in port ${PORT}...`)
    );


    console.log("start whatsapp claient...");
    const client = await wa_client;

    await client.initialize();


    const on_close = () => {
        client.pupPage?.close();
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

})();