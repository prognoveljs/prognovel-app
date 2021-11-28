import { saveData } from "store/states";
import { get } from "idb-keyval";
// import { get as getStore } from "svelte/store";

const IDB_PREFIX_SAVEDATA = "save-data";

export async function saveDataInit() {
  let preference: boolean = await get(IDB_PREFIX_SAVEDATA);

  if (!(preference === true || preference === false)) {
    preference = navigator.cookieEnabled || false; // cookie enabled??
  }

  saveData.set(preference);
}
