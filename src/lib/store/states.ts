/**
 *  Import this module with shorthand "store/states"
 *  For example:
 *
 *      import { siteMetadata } from "$lib/store/states"
 *
 */

import { derived, writable, Writable, Readable, get as getStore } from "svelte/store";

import { showAdjustFont, showComments, showStatsAndOptions, showTOC } from "./read-page/state";
import { browser } from "$app/environment";
import type { SiteMetadata, CredentialMode, NovelsMetadata } from "$typings";

// metadata
//@ts-ignore
export const siteMetadata: Writable<SiteMetadata> = writable({});
export const novelsData: Writable<NovelsMetadata> = writable({});

// app state
export const page: Writable<any> = writable({});
export const path: Readable<string> = derived([page], ([currentPage]) => {
  if (!browser) return "";
  return currentPage?.url?.pathname || document.location.pathname;
});

// user
// export const user: Writable<any> = writable({});
export const credentialMode: Writable<CredentialMode> = writable("prompt");

// novel
export const currentNovel: Writable<string> = writable("");

// utils
export const isDownloading: Writable<boolean> = writable(false);
export const isBusy: Writable<boolean> = writable(false);
export const isSaveData: Writable<boolean> = writable(false);
export const disableAnimations: Writable<boolean> = writable(false);

export const showSettings: Writable<boolean> = writable(false);

const readPageState = [showAdjustFont, showStatsAndOptions, showTOC, showComments];
export function showReadPageWindow(state: any): void {
  readPageState
    .filter((s) => s !== state)
    .forEach((show) => {
      show.set(false);
    });
  state.set(!Boolean(getStore(state)));
}

export const errorMessages: Writable<any[]> = writable([]);
