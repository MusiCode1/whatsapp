import axios from "axios";
import util from "util";
import { exec as exec_sync } from "child_process";
import puppeteer from "puppeteer";

const exec = util.promisify(exec_sync);

export async function get_chrome_ws(): Promise<string> {

    try {

        const browserWSEndpoint = await axios.get("http://127.0.0.1:9222/json/version");

        return browserWSEndpoint.data.webSocketDebuggerUrl;

    } catch (error) {

        const chrome_path = puppeteer.executablePath();

        const cmd = `start "" /B ${chrome_path} -remote-debugging-port=9222`;
        exec(cmd);

        await new Promise(resolve => setTimeout(resolve, 3 * 1000));

        return get_chrome_ws();

    }
}
