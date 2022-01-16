import { writable, Writable } from "svelte/store";

export const isAdminGUIConnected: Writable<boolean> = writable(false);
export const adminNovelsData: Writable<any> = writable({});
export const adminSiteData: Writable<any> = writable({});
