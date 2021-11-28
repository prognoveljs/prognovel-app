export const isLaunchOnPWA = () =>
  (process as any).browser ? window.matchMedia("(display-mode: standalone)").matches : false;
