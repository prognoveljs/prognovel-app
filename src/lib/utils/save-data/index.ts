import { isSaveData } from "$lib/store/states";
import { get as getIDB } from "idb-keyval";

const IDB_PREFIX_SAVEDATA = "save-data";

export async function saveDataInit() {
  let preference: boolean = await getIDB(IDB_PREFIX_SAVEDATA);

  if (!(preference === true || preference === false)) {
    preference = navigator.cookieEnabled || false; // cookie enabled??
  }

  isSaveData.set(preference);
}
