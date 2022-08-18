import { derived, Readable } from "svelte/store";
import { currentNovel } from "$lib/store/states";
import { currentBook, currentChapter, currentChapterCursor, toc } from "./index";
import { handleBeginReadingButton, ReadNowObject } from "$lib/utils/novel-page";
import { resolveConfig } from "vite";
import { HistoryRecent } from "$typings";

export const disableNextChapter: Readable<boolean> = derived(
  [currentChapterCursor, toc],
  ([cursor, tableOfContent]) => {
    return cursor >= (tableOfContent || []).length - 1;
  },
);
export const disablePrevChapter: Readable<boolean> = derived([currentChapterCursor], ([cursor]) => {
  return cursor <= 0;
});

export const nextChapterLink: Readable<string> = derived(
  [disableNextChapter, currentChapterCursor, toc, currentNovel, currentBook, currentChapter],
  ([disabled, cursor, tableOfContent, novel, book, chapter]) => {
    return !disabled
      ? `/read/${novel}/${(tableOfContent || [])[cursor + 1]}`
      : `/read/${novel}/${book}/${chapter}`;
  },
);
export const prevChapterLink: Readable<string> = derived(
  [disablePrevChapter, currentChapterCursor, toc, currentNovel, currentBook, currentChapter],
  ([disabled, cursor, tableOfContent, novel, book, chapter]) => {
    return !disabled
      ? `/read/${novel}/${(tableOfContent || [])[cursor - 1]}`
      : `/read/${novel}/${book}/${chapter}`;
  },
);

export const readNowObjectData: Readable<Promise<ReadNowObject>> = derived(
  [toc, currentNovel],
  ([list, novel]) => {
    return list && novel
      ? handleBeginReadingButton(novel)
      : Promise.resolve({
          id: "",
          link: "",
          lastChapterRead: "",
          lastReadAt: null,
        });
  },
);
