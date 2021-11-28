/**
 *  Import this module with shorthand "store/states"
 *  For example:
 *
 *      import { siteMetadata } from "store/states"
 *
 */

import { derived, writable, Writable, Readable, get as getStore } from "svelte/store";
import { createDerivedNovelsMetadata } from "utils/novel-page";
import type { SiteMetadata, CredentialMode, NovelsMetadata } from "typings";
import {
  showAdjustFont,
  showComments,
  showStatsAndOptions,
  showTOC,
} from "./read-page/read-page-state";
import { showAffiliateReferrer, showDownload, showRevshareStats } from "./novel-page";

// metadata
//@ts-ignore
export const siteMetadata: Writable<SiteMetadata> = writable({});
export const novelsData: Writable<NovelsMetadata> = writable({});

// app state
export const page: Writable<any> = writable({});
export const path: Readable<string> = derived([page], ([currentPage]) => {
  if (!(process as any).browser) return "";
  return currentPage.path || document.location.pathname;
});

// user
export const user: Writable<any> = writable({});
export const credentialMode: Writable<CredentialMode> = writable("prompt");

// novel
export const currentNovel: Writable<string> = writable("");
export const liteNovelsMetadata: Readable<any> = derived(siteMetadata, ($meta: SiteMetadata) => {
  return createDerivedNovelsMetadata($meta);
});

// utils
export const isDownloading: Writable<boolean> = writable(false);
export const isBusy: Writable<boolean> = writable(false);
export const saveData: Writable<boolean> = writable(false);
export const disableAnimations: Writable<boolean> = writable(false);

export const showSettings: Writable<boolean> = writable(false);

export const isBrowser: boolean = (process as any).browser;

export { isWEBP } from "utils/images";

const readPageState = [showAdjustFont, showStatsAndOptions, showTOC, showComments];
export function showReadPageWindow(state: any): void {
  readPageState
    .filter((s) => s !== state)
    .forEach((show) => {
      show.set(false);
    });
  state.set(!Boolean(getStore(state)));
}
const novelPageState = [
  showTOC,
  showAffiliateReferrer,
  showRevshareStats,
  showSettings,
  showDownload,
];
export function showNovelPageWindow(state: any): void {
  novelPageState
    .filter((s) => s !== state)
    .forEach((show) => {
      show.set(false);
    });
  state.set(!Boolean(getStore(state)));
}
