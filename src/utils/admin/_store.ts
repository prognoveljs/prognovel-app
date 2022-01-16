import { derived, writable, Writable, Readable } from "svelte/store";
import { SiteMetadata } from "typings";

export const isAdminGUIConnected: Writable<boolean> = writable(false);
export const adminNovelsData: Writable<any> = writable({});
export const adminSiteData: Writable<SiteMetadata | {}> = writable({});
export const activeNovels: Readable<string[]> = derived([adminSiteData], ([data]) => {
  return "novels" in data ? (data.novels as string[]) : [];
});
export const adminPageErrors: Writable<any> = writable([]);
