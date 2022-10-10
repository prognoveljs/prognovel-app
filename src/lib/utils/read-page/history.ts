import { saveRecent, IDB_PREFIX_HISTORY_RECENT } from "$lib/utils/history";
import { get as getStore } from "svelte/store";
import { liteNovelsMetadata } from "$lib/store/novel-page";
import { get } from "idb-keyval";
import { toc } from "$lib/store/read-page/vars";
import { goto } from "$app/navigation";
import type { HistoryRecent } from "$typings";

let findIndexAsync;
export async function setNovelRecentHistory(novel: string, chapter: string) {
  const recent: HistoryRecent[] = await get(IDB_PREFIX_HISTORY_RECENT);
  const chapterList: string[] = getStore(toc);
  let novelHistory: HistoryRecent;
  let cursorOld: number | Number = -1;
  // if (!findIndexAsync)
  //   findIndexAsync = (await import(/* webpackChunkName: "js-coroutines" */ "js-coroutines")).findIndexAsync;
  // let cursorNew = await findIndexAsync(chapterList, (ch: string) => ch === chapter);
  let cursorNew = chapterList.findIndex((ch: string) => ch === chapter);

  if (recent && recent.length) {
    novelHistory = recent.filter((obj) => obj.id === novel)[0];
    // cursorOld = await findIndexAsync(chapterList, (ch: string) => {
    //   return ch === novelHistory?.lastChapterRead;
    // });
    cursorOld = chapterList.findIndex((ch: string) => ch === novelHistory?.lastChapterRead);
  }

  if (cursorNew > cursorOld) {
    await saveRecent(novel, chapter);
  }
}

export async function getNovelRecentHistory(novel: string): Promise<HistoryRecent> {
  const history: HistoryRecent[] = await get(IDB_PREFIX_HISTORY_RECENT);
  let novelHistory: HistoryRecent;
  if (history && history.length) {
    novelHistory = history.filter((obj) => obj.id === novel)[0];
  }

  return novelHistory;
}

interface HistoryOptions {
  title: string;
  path: string;
  init: boolean;
}

export function setBrowserHistory(
  novel: string,
  chIndex: string,
  { title, init, path }: HistoryOptions,
) {
  let titles = getStore(liteNovelsMetadata);
  let novelTitle = titles?.[novel]?.title ?? novel;

  if (!init) {
    if (!path) throw "must provide URL path when use setHistory with init option";
    // don't set history if route isn't read page
    // this to prevent bug because fetching content is done in async
    // and this function might be called when user already leaving the read page
    //   ** (only applied when clicking next or prev chapter)
    const readRegExp = /\/read/;
    if (!readRegExp.test(path)) return;
  }

  const [book, chapter] = chIndex.split("/");

  let meta;
  if (title) {
    meta = `${novelTitle} ch. ${chapter} - ${title}`;
  } else {
    meta = `${novelTitle} ${chIndex}`;
  }
  document.title = meta;
  goto(`${window.location.origin}/read/${novel}/${book}/${chapter}`, { replaceState: false });
  // history.pushState(
  //   {
  //     id: novel + "-chapter-" + chapter,
  //   },
  //   meta,
  //   `${window.location.origin}/read/${novel}-chapter-${chapter}`,
  // );
  // addPopState(chapter);

  return meta;
}

export function replacePageTitleBookAndChapter(str: string, capitalize: boolean = false): string {
  if (!str || str === "undefined") return "";
  const Volume = capitalize ? "Vol " : "vol ";
  const Chapter = capitalize ? "Ch " : "ch ";
  return str
    .replace("volume-", Volume)
    .replace("book-", str)
    .replace("chapter-", Chapter)
    .replace("-", ".");
}

export function parseChapterPageTitle(novel: string, book: string, chapter: string): string {
  return "";
}
