import { get as getStore } from "svelte/store";
import { ws } from ".";
import { adminPageData } from "./_store";

export const dataQueue = {};
const fetchEvent = new EventTarget();

export async function getDataFromFile(fileName: string) {
  dataQueue[fileName] = new Promise(() => {});
  ws.send(
    JSON.stringify({
      type: "FETCH",
      file: fileName,
    }),
  );
  console.log(fileName, dataQueue[fileName]);
  const result = await new Promise((resolve) => {
    fetchEvent.addEventListener(
      fileName,
      (ev) => {
        const { type, file, data } = ev.data;
        resolve({ type, file, data });
      },
      { once: true },
    );
  });
  console.log(result);
  return result;
}

export async function saveDataForFile(fileName: string, data: any) {
  ws.send(
    JSON.stringify({
      type: "SAVE",
      file: fileName,
      data,
    }),
  );
  if (fileName.split("/")[1] === "info") {
    const d = getStore(adminPageData);
    const novel = fileName.split("/")[0];
    d[novel] = { ...d[novel], ...data };
    adminPageData.set(d);
  }
}

export function listenPullData(ws: WebSocket) {
  ws.addEventListener("message", (ev) => {
    try {
      const data = JSON.parse(ev.data);
      if (data.type === "PULLDATA") {
        adminPageData.set(data.data);
      } else if (data.type === "FETCH") {
        console.log("halo FETCH", data.file);
        const ev = new Event(data.file);
        ev.data = data;
        fetchEvent.dispatchEvent(ev);
        // dataQueue[data.file] = Promise.resolve({
        //   type: data.type,
        //   file: data.file,
        //   data: data.data,
        // });
        // console.log(data.file, dataQueue[data.file]);
      }
    } catch (error) {}
  });
}
