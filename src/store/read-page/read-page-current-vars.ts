import { writable, get as getStore, derived, Readable, Writable } from "svelte/store";
import { getLoadingPlaceholder } from "../../utils/read-page/index";
import type { Chapter } from "typings";

export const toc: Writable<string[]> = writable([]);
export const currentChapter: Writable<string> = writable("");
export const currentBook: Writable<string> = writable("");
export const currentChapterCursor: Writable<number> = writable(undefined);
export const chaptersLoaded: Writable<any> = writable({});
export const currentChapterIndex: Readable<string> = derived(
  [currentBook, currentChapter],
  ([book, chapter]) => {
    if (!book || !chapter) return "";
    return `${book}/${chapter}`;
  },
);

export const currentContent: Writable<Chapter> = writable(getLoadingPlaceholder());

export const currentChapterTitle: Readable<string> = derived(currentContent, ($content) => {
  return $content && $content.title ? $content.title : "";
});

export const isCurrentChapterMonetized: Writable<boolean> = writable(false);
