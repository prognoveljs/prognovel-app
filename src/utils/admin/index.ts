import { isAdminGUIConnected } from "./_store";

const WEB_SOCKET_PORT = 6060;
let ws: WebSocket;

export function initializeAdminGUI() {
  ws = new WebSocket(`ws://127.0.0.1:${WEB_SOCKET_PORT}`);

  ws.onopen = (event) => {
    isAdminGUIConnected.set(true);
  };

  ws.onclose = (event) => {
    isAdminGUIConnected.set(false);
  };
}

export function destroyAdminGUI() {
  if (ws && !ws.CLOSED) ws.close();
}
