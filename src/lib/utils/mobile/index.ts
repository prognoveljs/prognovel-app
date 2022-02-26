import { isBrowser } from "$lib/store/states";
import { checkTouchScreen } from "./check-touch";

export function mobileInit() {
  checkTouchScreen();
}

export function isMobileScreen() {
  if (!isBrowser) return false;

  return window.innerWidth <= 767;
}
