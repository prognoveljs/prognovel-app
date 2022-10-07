import { browser } from "$app/environment";
import { checkTouchScreen } from "./check-touch";

export function mobileInit() {
  checkTouchScreen();
}

export function isMobileScreen() {
  if (!browser) return false;

  return window.innerWidth <= 767;
}
