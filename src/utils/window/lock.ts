import { isBrowser } from "states";

export function windowLock(node?: HTMLElement): void {
  if (!isBrowser) return;
  document.body.style.top = `-${window.scrollY}px`;
  document.body.style.position = "fixed";
  document.body.style.height = "100vh";

  if (node) node.focus();
}

export function windowUnlock(): void {
  if (!isBrowser) return;
  const scrollY: string = document.body.style.top;
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.height = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
}
