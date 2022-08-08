import { Router, json } from "express";
import { client } from "./whatsapp-api.js";
export const msg_router = Router();
msg_router.use(json());
msg_router.post("/send-message", async (req, res, next) => {
    if ((!req.body.phone || !req.body.key) || (!req.body.caption && !req.body.file)) {
        res.status(400);
        res.end();
        return;
    }
    if (req.body.key !== process.env.KEY) {
        res.status(400);
        res.json({ massege: "key is not valid" });
        res.end();
        return;
    }
    const { caption, file, phone } = req.body;
    try {
        await client.then(client => client.msg_to_provider(phone, caption, file));
    }
    catch (error) {
        console.error(error);
        res.status(400);
        res.end();
    }
    res.end("OK");
});
msg_router.use((req, res, next) => {
    res.location("https://tzoharhalev.org/");
});
//# sourceMappingURL=server.js.map