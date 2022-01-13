import { ws } from ".";

export async function getDataFromFile(fileName: string) {
  ws.send(
    JSON.stringify({
      type: "FETCH",
      file: fileName,
    }),
  );

  return await new Promise((resolve, reject) => {
    ws.addEventListener(
      "message",
      (ev) => {
        if (ev.data) {
          const { type, file, data } = JSON.parse(ev.data);
          if (type === "FETCH" && file) resolve({ type, file, data });
        }
      },
      { once: true },
    );
  });
}

export async function saveDataForFile(fileName: string, data: any) {
  ws.send(
    JSON.stringify({
      type: "SAVE",
      file: fileName,
      data,
    }),
  );
}
