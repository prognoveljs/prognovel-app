import { get, set } from "idb-keyval";
import type { HistoryRecent } from "typings";

export const IDB_PREFIX_HISTORY_RECENT = "history-recent";
// const getHistoryStore = () => new Store(IDB_PREFIX_HISTORY);

export async function saveRecent(novel: string, volumeAndChapter: string): Promise<HistoryRecent[]> {
  let recent: HistoryRecent[] = await get(IDB_PREFIX_HISTORY_RECENT);
  const lastRead: HistoryRecent = {
    id: novel,
    lastChapterRead: volumeAndChapter,
    lastReadAt: Date.now(),
  };

  console.log("saveRecent:", recent);
  if (recent?.length) {
    recent = recent.filter((obj) => obj.id !== novel);
    recent = [lastRead, ...recent];
  } else {
    recent = [lastRead];
  }

  await set(IDB_PREFIX_HISTORY_RECENT, recent);
  console.log("Saving", novel, "at", volumeAndChapter);
  return recent;
}

let findAsync;
export async function getRecentHistory(novel: string): Promise<HistoryRecent | undefined> {
  let recentList: HistoryRecent[] = (await get(IDB_PREFIX_HISTORY_RECENT)) ?? [];
  // if (!findAsync)
  //   findAsync = (await import(/* webpackChunkName: "js-coroutines" */ "js-coroutines")).findAsync;
  // return recentList?.length
  //   ? await findAsync(recentList, (obj: HistoryRecent) => obj.id === novel)
  //   : undefined;
  return recentList?.length ? recentList.find((obj: HistoryRecent) => obj.id === novel) : undefined;
}
