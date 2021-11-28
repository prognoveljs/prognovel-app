import { get, set, del, keys, createStore, Store } from "idb-keyval";
import type { Chapter } from "typings";

/** Offline database to store chapters
 * @ .get(novel: string, chapter: number)
 * @ .set(novel: string, chapter: number, value: string)
 * @ .del(novel: string, chapter?: number)
 * don't add chapter if to delete entire novel
 */
export const offlineDB = {
  async get(novel: string, chapterIndex: string): Promise<Chapter> {
    return await get(chapterIndex, this.getStore(novel));
  },

  async set(novel: string, chapterIndex: string, value: Chapter): Promise<void> {
    await set(chapterIndex, value, this.getStore(novel));
  },

  async delete(novel: string, chapterIndex: string = undefined): Promise<void> {
    if (chapterIndex) {
      await del(chapterIndex, this.getStore(novel));
    } else {
      this.deleteNovel(novel);
    }
  },

  // below are low-level functions
  store: new Map(),

  getStore(novel: string): Store {
    let idbStore = this.store.get(novel);

    if (!idbStore) {
      idbStore = createStore("offline-data", novel);
      this.store.set(novel, idbStore);
    }

    return idbStore;
  },

  async deleteNovel(novel: string): Promise<void> {
    const store: Store = this.getStore(novel);
    const chapters: IDBValidKey[] = await keys(store);

    chapters.forEach((key) => {
      del(key, store);
    });
  },
};
