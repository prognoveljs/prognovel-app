import { get as getStore } from "svelte/store";
// import { finishConnecting, ws } from ".";
import { adminNovelsData, adminPageErrors, adminSiteData, isAdminGUIConnected } from "./_store";

export const dataQueue = {};
const fetchEvent = new EventTarget();

export async function getDataFromFile(fileName: string) {
  // dataQueue[fileName] = new Promise(() => {});
  // ws.send(
  //   JSON.stringify({
  //     type: "FETCH",
  //     file: fileName,
  //   }),
  // );
  // console.log(fileName, dataQueue[fileName]);
  // const result = await new Promise((resolve) => {
  //   fetchEvent.addEventListener(
  //     fileName,
  //     (ev) => {
  //       const { type, file, data } = ev.data;
  //       resolve({ type, file, data });
  //     },
  //     { once: true },
  //   );
  // });
  // console.log(result);
  // return result;
}

export async function saveDataForFile(fileName: string, data: any) {
  // ws.send(
  //   JSON.stringify({
  //     type: "SAVE",
  //     file: fileName,
  //     data,
  //   }),
  // );
  // if (fileName.split("/")[1] === "info") {
  //   const d = getStore(adminNovelsData);
  //   const novel = fileName.split("/")[0];
  //   d[novel] = { ...d[novel], ...data };
  //   adminNovelsData.set(d);
  // }
  // if (fileName === "settings") {
  //   const d = getStore(adminSiteData);
  //   adminSiteData.set({ ...d, ...data });
  // }
}

export function listenWS(ws: WebSocket) {
  // ws.addEventListener("message", (ev) => {
  //   try {
  //     const data = JSON.parse(ev.data);
  //     if (data.type === "PULLDATA") {
  //       adminNovelsData.set(data.data.novelsMetadata);
  //       adminSiteData.set(data.data.siteMetadata);
  //       isAdminGUIConnected.set(true);
  //       finishConnecting();
  //     } else if (data.type === "FETCH") {
  //       console.log("halo FETCH", data.file);
  //       const ev = new Event(data.file);
  //       ev.data = data;
  //       fetchEvent.dispatchEvent(ev);
  //     } else if (data.type === "COMMANDERROR") {
  //       console.log(data);
  //       adminPageErrors.update((errors) => {
  //         return [...(errors || []), data];
  //       });
  //     }
  //   } catch (error) {}
  // });
}
