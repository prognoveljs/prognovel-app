import { browser } from "$app/environment";
import { writable, Writable } from "svelte/store";

export const isPWABannerActive: Writable<boolean> = writable(false);
let pwaBanner;
export const isLaunchOnPWA = () =>
  browser ? window.matchMedia("(display-mode: standalone)").matches : false;

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
