import { writable, Writable } from "svelte/store";

export const fontSize: Writable<number> = writable(1);

export const registeredPlugins = writable(new Set());
// for indexing and Svelte key update only
export const chaptersAppended: Writable<string[]> = writable([]);

// read page option
export const asyncTextRendering: Writable<boolean> = writable(false);

export type ChapterTitles = {
  [novel: string]: {
    [book: string]: {
      [chapter: string]: string;
    };
  };
};

export type ChapterTitlesChildren = {
  [book: string]: {
    [chapter: string]: string;
  };
};

export const chapterTitles: Writable<ChapterTitles | {}> = writable({});

export const showTOC: Writable<Boolean> = writable(false);
export const showStatsAndOptions: Writable<Boolean> = writable(false);
export const showComments: Writable<Boolean> = writable(false);
export const showAdjustFont: Writable<Boolean> = writable(false);
export const chaptersWithSpoiler: Set<string> = new Set();
