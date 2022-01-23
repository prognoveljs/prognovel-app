import { writable, Writable } from "svelte/store";
import { set, get } from "idb-keyval";

const IDB_COLOR_CONTRAST: string = "reader-background-contrast";
export const colorContrast: Writable<number> = writable(100);

export async function colorContrastInit(): Promise<void> {
  const size = (await get(IDB_COLOR_CONTRAST)) as number;

  if (!size) return;
  // TODO throttle save to IndexedDB
  colorContrast.set(size);
}

if ((process as any).browser) {
  get(IDB_COLOR_CONTRAST).then((contrast: number | undefined) => {
    if (contrast) colorContrast.set(contrast);
    colorContrast.subscribe((contrast: number) => {
      if (!(process as any).browser) return;

      const content = document.body as HTMLElement;
      if (!content) return;

      content.style.setProperty("--readPageColorContrast", (contrast / 100).toString());

      // TODO debounce font size save
      set(IDB_COLOR_CONTRAST, contrast);
    });
  });
}
