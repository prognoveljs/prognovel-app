import { isBrowser } from "$lib/store/states";

export const isLaunchOnPWA = () =>
  isBrowser ? window.matchMedia("(display-mode: standalone)").matches : false;
