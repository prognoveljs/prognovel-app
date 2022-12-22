import { writable, Writable } from "svelte/store";
import { set as setIDB, get as getIDB } from "idb-keyval";
import { browser } from "$app/environment";

const IDB_FONT_SIZE: string = "reader-font-size";
export const fontSize: Writable<number> = writable(100);

export async function fontSizeInit(): Promise<void> {
  const size = (await getIDB(IDB_FONT_SIZE)) as number;

  if (!size) return;
  // TODO throttle save to IndexedDB
  fontSize.set(size);
}

if (browser) {
  getIDB(IDB_FONT_SIZE).then((size: number | undefined) => {
    if (size) fontSize.set(size);
    fontSize.subscribe((size: number) => {
      if (!browser) return;

      const content = document.body as HTMLElement;
      if (!content) return;

      content.style.setProperty("--readPageFontCustomRatio", (size / 100).toString());

      // TODO debounce font size save
      setIDB(IDB_FONT_SIZE, size);
    });
  });
}
