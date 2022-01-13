import { ws } from ".";

export async function getDataFromFile(fileName: string) {
  ws.send(
    JSON.stringify({
      type: "FETCH",
      file: fileName,
    }),
  );

  return await new Promise((resolve, reject) => {
    ws.onmessage = (ev) => {
      if (ev.data) {
        const { type, file, data } = JSON.parse(ev.data);
        if (type === "FETCH" && file) resolve({ type, file, data });
      }
    };

    ws.onclose = () => reject("WebSocket connection closed.");
  });
}
