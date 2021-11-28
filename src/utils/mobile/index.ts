import { checkTouchScreen } from "./check-touch";

export function mobileInit() {
  checkTouchScreen();
}

export function isMobileScreen() {
  if (!(process as any).browser) return false;

  return window.innerWidth <= 767;
}
