import { isBrowser } from "src/store/states";
import { listenWS } from "./data";
import { isAdminGUIConnected } from "./_store";

const WEB_SOCKET_PORT = 6060;
export let ws: WebSocket;
// export let isGUIWebSocketReady: Promise<any> = isBrowser
//   ? new Promise(() => {})
//   : Promise.resolve("");
export let isGUIWebSocketReady: Promise<any>;

export async function initializeAdminGUI() {
  ws = new WebSocket(`ws://127.0.0.1:${WEB_SOCKET_PORT}`);

  listenWS(ws);
  ws.onopen = (event) => {};

  ws.onclose = async (event) => {
    isAdminGUIConnected.set(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    initializeAdminGUI();
  };
}

export function destroyAdminGUI() {
  if (ws && !ws.CLOSED) ws.close();
}

export function finishConnecting() {
  // isGUIWebSocketReady = Promise.resolve("");
}

export { getDataFromFile } from "./data";
