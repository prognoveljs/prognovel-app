import { writable, Writable } from "svelte/store";
import { set as setIDB, get as getIDB } from "idb-keyval";
import { browser } from "$app/environment";

const IDB_COLOR_HUE: string = "reader-background-hue";
const IDB_USE_COLOR_HUE: string = "reader-use-background-hue";
const DEFAULT_HUE: number = browser
  ? parseInt(document.querySelector("html").style.getPropertyValue("--primary-color-h")) ||
    parseInt(getComputedStyle(document.body).getPropertyValue("--primary-color-h"))
  : 14;
console.log(DEFAULT_HUE);
export const colorHue: Writable<number> = writable(DEFAULT_HUE);
export const colorizedBackground: Writable<boolean> = writable(false);

export async function colorHueInit(): Promise<void> {
  const hue = (await getIDB(IDB_COLOR_HUE)) as number;
  const useHue = (await getIDB(IDB_USE_COLOR_HUE)) as boolean;

  if (hue) colorHue.set(hue);
  if (useHue !== null) colorizedBackground.set(useHue);
  // TODO throttle save to IndexedDB
}

if (browser) {
  getIDB(IDB_COLOR_HUE).then((hue: number | undefined) => {
    if (hue) colorHue.set(hue);
    colorHue.subscribe((hue: number) => {
      if (!browser) return;

      const content = document.body as HTMLElement;
      if (!content) return;

      content.style.setProperty("--readPageColorHue", hue.toString());

      // TODO debounce font size save
      setIDB(IDB_COLOR_HUE, hue);
    });
  });

  getIDB(IDB_USE_COLOR_HUE).then((useHue: boolean | undefined) => {
    if (useHue) colorizedBackground.set(useHue);
    colorizedBackground.subscribe((useHue: boolean) => {
      if (!browser) return;
      console.log(useHue);
      // TODO debounce font size save
      setIDB(IDB_USE_COLOR_HUE, useHue);
    });
  });
}
