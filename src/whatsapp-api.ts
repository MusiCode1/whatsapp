import whatsapp from 'whatsapp-web.js';
const { Client, LocalAuth, MessageMedia } = whatsapp;
import { get_chrome_ws } from "./get-puppeteer-url.js";

import qrcode from 'qrcode-terminal';

class CustomClient extends Client {

    msg_to_provider(phone: string, caption: string, file: string) {

        const media_msg = MessageMedia.fromFilePath(file);

        return this.sendMessage(phone + "@c.us", media_msg, { caption })
    }
}

const chromium_devtools_link = await get_chrome_ws().catch(error => undefined);

export const client = new CustomClient({

    authStrategy: new LocalAuth(),
    puppeteer: {
        browserWSEndpoint: chromium_devtools_link,
        headless: false
    }
});

const media_msg = MessageMedia.fromFilePath('./logo.png');

client.on('qr', qr => {
    qrcode.generate(qr, {
        small: true
    });
});

client.on('ready', () => {
    console.log('Client is ready!');

});

client.on('message', message => {

    console.log();

    if (message.body.toLowerCase() === 'ping') {
        message.reply('pong');
    }

    if (message.body.toLowerCase() === 'photo') {
        message.reply(media_msg);
    }

});

/*

C:\"Program Files (x86)\Microsoft\Edge\Application\msedge.exe" -"remote-debugging-port=9222"
*/