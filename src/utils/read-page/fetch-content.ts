import { get as getStore } from "svelte/store";
// import { tick } from "svelte";
// import { prefetch } from "@sapper/app";
import { offlineDB } from "utils/offline-reading/db";
import { chaptersLoaded, chaptersAppended, toc, currentChapterCursor } from "src/store/read-page";
import { getLoadingPlaceholder, getErrorPlaceholder, getChapterUrlFromList } from "./index";
import { connectionErrorPlaceholder } from "./errors";
import { currentNovel } from "store/states";
import { ChapterState } from "./vars";
import { getChapterStoreKey } from "./navigation";
import type { Chapter } from "typings";

const PREFETCH_CHAPTER = parseInt(process.env.PREFETCH_CHAPTER ?? "3");

export async function fetchChapter(novel: string, chapterList: string[]): Promise<Chapter> {
  let data: any;
  try {
    const res = await fetch(getChapterUrlFromList(novel, chapterList));
    data = await res.json();
  } catch (err) {
    // trying to fallback to offline database
    data = {};
    for (const chapter of chapterList) {
      let offlineChapter = await offlineDB.get(novel, chapter);
      if (!offlineChapter) offlineChapter = getErrorPlaceholder();
      data[chapter] = offlineChapter;
    }

    if (!data) {
      throw new Error(`Error when loading ${novel} ${chapterList.join(",")}.`);
    }
  }

  return data;
}

export async function prefetchNextChapter() {
  const tableOfContent: string[] = getStore(toc);
  const novel = getStore(currentNovel);
  const cursor = (getStore(currentChapterCursor) as number) + 1;
  const next = tableOfContent[cursor];

  // if (next && novel && cursor < tableOfContent.length - 1) prefetch(`read/${novel}/${next}`);
}

export async function prefetchChapter(novel: string, book: string, chapter: string): Promise<Chapter | null> {
  let dataLoaded = getStore(chaptersLoaded);
  let thisChapter = `${book}/${chapter}`;
  let data;
  let isFetchFailed = false;

  const chapterList = getStore(toc) as string[];
  if (!chapterList.length) {
    // BUGFIX - this will wait for TOC to be available and restart fetching chapter
    // sometimes it could happen when reading read page, where the chapter is being
    // fetched before the required content data is available
    debounceFetchingChapter = { novel, book, chapter };
    return;
  }
  const appendedChapters = getStore(chaptersAppended) as string[];
  const isLastAppendedChapter = appendedChapters.slice(-1)[0] === `${book}/${chapter}`;
  if (appendedChapters.includes(thisChapter) && !isLastAppendedChapter) return;

  const { start, end, list } = _getIndex();

  if (!list.length) return;
  for (const chIndex of list) {
    const [thisBook, thisChapter] = chIndex.split("/");
    appendChapter(novel, thisBook, thisChapter, getLoadingPlaceholder(novel, thisBook, thisChapter));
  }

  try {
    data = await fetchChapter(novel, list);
  } catch (error) {
    isFetchFailed = true;
  }

  for (const chIndex of list) {
    const [thisBook, thisChapter] = chIndex.split("/");
    appendChapter(novel, thisBook, thisChapter, data[chIndex], { failed: isFetchFailed });
  }

  function _getIndex() {
    const start = chapterList.findIndex((s) => s === `${book}/${chapter}`);
    const end = start + PREFETCH_CHAPTER + 1;
    const list = chapterList.slice(start, end).filter((ch) => {
      const [book, chapter] = ch.split("/");
      return !dataLoaded[getChapterStoreKey(novel, book, chapter)];
    });

    return {
      start,
      end,
      list,
    };
  }
}

let debounceFetchingChapter = {} as any;
export function fireDebounceFetchChapter() {
  if (JSON.stringify(debounceFetchingChapter) !== "{}") {
    const { novel, book, chapter } = debounceFetchingChapter;
    prefetchChapter(novel, book, chapter);
    debounceFetchingChapter = {};
  }
}

interface AppendChapterMeta {
  failed: boolean;
}
export function appendChapter(
  novel: string,
  book: string,
  chapter: string,
  data: Chapter | { meta? },
  meta: AppendChapterMeta = {
    failed: false,
  },
) {
  const key = getChapterStoreKey(novel, book, chapter);
  const store: any = getStore(chaptersLoaded);
  data = normalizeMeta(data);

  if (meta.failed) {
    console.log(`❌ ${novel} ${book}/${chapter} fetch failed.`);
    data.meta.status = ChapterState.Error;
  } else {
    data.meta.status !== ChapterState.Loading && data.meta.status !== ChapterState.Error
      ? (data.meta.status = ChapterState.Success)
      : null;
  }

  chaptersAppended.update((ch: string[]): string[] => {
    const index = `${book}/${chapter}`;
    return ch.includes(index) ? ch : [...ch, index];
  });

  meta.failed && console.log(data);
  chaptersLoaded.set({
    ...store,
    [key]: data,
  });

  function normalizeMeta(data: any): any {
    if (!data) return { meta: {} };
    if (!data.meta) return { ...data, meta: {} };
    return data;
  }
}

if ((process as any).browser) {
  (window as any).showLoadedChapters = () => {
    console.log(getStore(chaptersLoaded));
  };
}
