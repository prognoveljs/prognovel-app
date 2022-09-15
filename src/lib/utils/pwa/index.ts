import { browser } from "$app/environment";
import { isBrowser } from "$lib/store/states";
import { writable, Writable } from "svelte/store";

export const isPWABannerActive: Writable<boolean> = writable(false);
let pwaBanner;
export const isLaunchOnPWA = () =>
  isBrowser ? window.matchMedia("(display-mode: standalone)").matches : false;

export function registerPWABanner() {
  if (!browser) return;
  window.addEventListener("beforeinstallprompt", (event) => {
    isPWABannerActive.set(true);
    pwaBanner = event;
  });
}

export function showPWAPrompt() {
  if (!pwaBanner) return;
  pwaBanner.prompt();
}
