import { get, set, createStore } from "idb-keyval";
import { get as getStore } from "svelte/store";
import { getRecentHistory, IDB_PREFIX_HISTORY_RECENT } from "$lib/utils/history";
import { siteMetadata, novelsData } from "$lib/store/states";
import { bookmarkList } from "./_store";
import { fetchNovelMetadata } from "$lib/utils/fetch-metadata";
import { getCoverURLPath, isWEBP } from "$lib/utils/images";
import type { NovelMetadata, SiteMetadata, HistoryRecent, Bookmark } from "$typings";
import { browser } from "$app/environment";

const getBookmarkStore = () => createStore("novel-bookmark", "data");
export const IDB_PREFIX_BOOKMARK_LIST: string = "bookmark-list";

export async function bookmarkInit(options = { setBookmark: true }): Promise<string[]> {
  const list: string[] = await getBookmarkList();

  if (list === undefined)
    throw "Error: bookmarkInit()\nbookmarkList variable is undefined somehow.";
  if (!list?.length) return [];
  if (options.setBookmark) bookmarkList.set(list);

  return list;
}

export async function isBookmarkExist(id: string, list?: string[]): Promise<boolean> {
  if (!list) list = await getBookmarkList();

  return list.indexOf(id) !== -1;
}

/**
 * Add a novel to bookmark list and save it to IndexedDB.
 *
 * @param id the string ID of saved novel, eg "yashura-legacy"
 */
export async function saveBookmark(id: string): Promise<void> {
  await appendBookmarkList(id);
}

let filterAsync;
let findAsync;

export async function removeBookmark(id: string): Promise<void> {
  const list: string[] = await getBookmarkList();

  if (!list.length) return;

  // if (!filterAsync)
  //   filterAsync = (await import(/* webpackChunkName: "js-coroutines" */ "js-coroutines")).filterAsync;
  // const newList = (await filterAsync(list, (book: Bookmark) => book.id !== id)) as string[];
  const newList = list.filter((book: string) => book === id);
  await set(IDB_PREFIX_BOOKMARK_LIST, newList, getBookmarkStore());
  bookmarkList.set(newList);
}

export async function getBookmarkData(id: string): Promise<Bookmark> {
  let progress = 0;
  let list: string[] = getStore(bookmarkList);
  if (list?.length) await bookmarkInit();

  // if (!findAsync)
  //   findAsync = (await import(/* webpackChunkName: "js-coroutines" */ "js-coroutines")).findAsync;
  const meta: SiteMetadata | {} = getStore(siteMetadata);
  const novelsMetadata: NovelMetadata[] = "novelsMetadata" in meta ? meta.novelsMetadata : [];
  if (!novelsMetadata.length) throw new Error("novelsMetadata is empty.");
  const recentHistory: HistoryRecent = await getRecentHistory(id);
  // const metadata: NovelMetadata = await findAsync(novelsMetadata, (novel: NovelMetadata) => novel.id === id);
  const metadata: NovelMetadata = novelsMetadata.find((novel) => novel.id === id);
  if (!metadata) throw new Error(id + "not found in Recent History.");
  if (!novelsMetadata) throw new Error(id + "novelsMetadata not found in svelte store.");

  const result: Bookmark = {
    id,
    title: metadata.title,
    cover: getCoverURLPath(id, { width: 256, height: 256 }, isWEBP ? "webp" : "jpeg"),
    // cover: `publish/${id}/cover-256x256.${isWEBP ? "webp" : "jpeg"}`,
    lastChapter: metadata.lastChapter,
    lastChapterRead: await getBookmarkLastRead(id),
    lastReadAt: recentHistory?.lastReadAt ?? 0,
    progress: progress || 0,
  };

  return result;
}

export async function getBookmarkDataAll(): Promise<Bookmark[]> {
  let list: string[] = await bookmarkInit();

  if (list?.length < 1) return [];

  let bookmarkAll: Bookmark[];
  try {
    bookmarkAll = await Promise.all(
      list.map(async (result) => {
        return await getBookmarkData(result);
      }),
    );
  } catch (err) {
    throw "Error when listing all bookmark.\n" + err;
  }

  return bookmarkAll;
}

export async function getBookmarkList(): Promise<string[]> {
  let list;
  try {
    list = (await get(IDB_PREFIX_BOOKMARK_LIST, getBookmarkStore())) as string[];
  } catch (error) {
    console.error("Error reading bookmark list from IndexedDB.");
    throw new Error(error);
  }

  if (!list) return [];

  return list;
}

/**
 * Add a novel to bookmark list and save it to IndexedDB.
 * Lower level function of saveBookmark().
 *
 * @param id the string ID of saved novel, eg "yashura-legacy"
 */
export async function appendBookmarkList(id: string): Promise<void> {
  const list = await getBookmarkList();

  if (await isBookmarkExist(id, list)) return;

  const newList = [id, ...list];
  await set(IDB_PREFIX_BOOKMARK_LIST, newList, getBookmarkStore());
  bookmarkList.set(newList);
}

interface GetBookmarkLastReadOptions {
  allowReturnUndefined?: boolean;
}
export async function getBookmarkLastRead(
  id: string,
  opts?: GetBookmarkLastReadOptions,
): Promise<string> {
  const list: HistoryRecent[] = await get(IDB_PREFIX_HISTORY_RECENT);
  if (!list) return await returnEmpty();

  const history: HistoryRecent = list.find((item) => item.id === id);
  if (!history) return await returnEmpty();

  return history.lastChapterRead;

  async function returnEmpty(): Promise<string | undefined> {
    if (!opts?.allowReturnUndefined) {
      return await getNovelFirstChapter(id);
    }
    return;
  }
}

async function getNovelFirstChapter(id: string) {
  let meta = getStore(novelsData);
  if (!meta[id]) {
    meta[id] = await fetchNovelMetadata(id);
  }

  return meta[id].chapters[0];
}

export function loadBookmark(): Promise<Bookmark[]> {
  if (!browser) return;

  return new Promise((resolve, reject) => {
    getBookmarkDataAll().then((list) => {
      if (list.length && browser) {
        resolve(list);
      } else {
        reject();
      }
    });
  });
}

export { bookmarkList };
