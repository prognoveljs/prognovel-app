import { get, set } from "idb-keyval";
import { isBrowser } from "$lib/store/states";
import { writable, Writable } from "svelte/store";

const IDB_FONT_WEIGHT = "reader-font-weight";
export const fontWeight: Writable<number> = writable(100);

export async function fontWeightInit(): Promise<void> {
  const weight = (await get(IDB_FONT_WEIGHT)) as number;

  if (!weight) return;
  // TODO throttle save to IndexedDB
  fontWeight.set(weight);
}

if (isBrowser) {
  get(IDB_FONT_WEIGHT).then((weight: number | undefined) => {
    if (weight) fontWeight.set(weight);
    fontWeight.subscribe((weight: number) => {
      if (!isBrowser) return;

      const content = document.body as HTMLElement;
      if (!content) return;

      content.style.setProperty("--readPageFontWeight", (weight / 100).toString());

      // TODO debounce font weight save
      set(IDB_FONT_WEIGHT, weight);
    });
  });
}
