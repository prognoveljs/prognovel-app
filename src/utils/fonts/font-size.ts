import { writable, Writable } from "svelte/store";
import { set, get } from "idb-keyval";

const IDB_FONT_SIZE: string = "font-size";
export const fontSize: Writable<number> = writable(100);

export async function fontSizeInit(): Promise<void> {
  const size = (await get(IDB_FONT_SIZE)) as number;

  if (!size) return;
  // TODO throttle save to IndexedDB
  fontSize.set(size);
}

if ((process as any).browser) {
  get(IDB_FONT_SIZE).then((size: number | undefined) => {
    if (size) fontSize.set(size);
    fontSize.subscribe((size: number) => {
      if (!(process as any).browser) return;

      const content = document.body as HTMLElement;
      if (!content) return;

      content.style.setProperty("--readPageFontCustomRatio", (size / 100).toString());

      // TODO debounce font size save
      set(IDB_FONT_SIZE, size);
    });
  });
}
