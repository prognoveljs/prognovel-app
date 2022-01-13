import { isAdminGUIConnected } from "./_store";

const WEB_SOCKET_PORT = 6060;
export let ws: WebSocket;

export async function initializeAdminGUI() {
  ws = new WebSocket(`ws://127.0.0.1:${WEB_SOCKET_PORT}`);
  console.log(ws);
  ws.onopen = (event) => {
    isAdminGUIConnected.set(true);
  };

  ws.onclose = async (event) => {
    isAdminGUIConnected.set(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    initializeAdminGUI();
  };
}

export function destroyAdminGUI() {
  if (ws && !ws.CLOSED) ws.close();
}

export { getDataFromFile } from "./data";
