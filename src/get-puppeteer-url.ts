import axios from "axios"

export async function get_chrome_ws() {

    const browserWSEndpoint = await axios.get("http://127.0.0.1:9222/json/version");

    return browserWSEndpoint.data.webSocketDebuggerUrl;
}