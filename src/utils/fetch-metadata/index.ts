import { get as getStore } from "svelte/store";
import { siteMetadata, novelsData } from "store/states";
import { BACKEND_API } from "settings";
import { set, get, createStore } from "idb-keyval";
import type { SiteMetadata, NovelMetadata } from "typings";

export const getMetadataStore = () => createStore("app-metadata", "api");
const IDB_NOVEL_PREFIX = "novel-";
const IDB_HOMEPAGE_PREFIX = "homepage";

export async function fetchSiteMetadata(): Promise<SiteMetadata> {
  let data: SiteMetadata;
  try {
    const response = await fetch(BACKEND_API);
    data = await response.json();
    await set(IDB_HOMEPAGE_PREFIX, data, getMetadataStore());
  } catch (err) {
    console.error("Failed to fetch site metadata from server.");
    try {
      data = await get(IDB_HOMEPAGE_PREFIX, getMetadataStore());
    } catch (error) {
      console.error("Error reading site metadata from IndexedDB.");
      throw new Error(error);
    }
    if (!data) {
      try {
        const staleResponse = await fetch("/publish/sitemetadata.json");
        data = await staleResponse.json();
        data.stale = true;
      } catch (err) {
        throw `Failed to find fallback for homepage. No metadata found in cache.`;
      }
    }
  }

  siteMetadata.set(data);

  return data;
}

// TODO add loading status to NovelMetadata
export async function fetchNovelMetadata(id: string): Promise<NovelMetadata> {
  const url = `${BACKEND_API}/novel?name=${id}`;
  let data: NovelMetadata;
  try {
    const response = await fetch(url);
    data = await response.json();
    // console.log("🚀 fetching novel metadata", data);
    await set(IDB_NOVEL_PREFIX + id, data, getMetadataStore());
  } catch (err) {
    console.error(`Failed to fetch ${id} from server.`);
    data = await get(IDB_NOVEL_PREFIX + id, getMetadataStore());
    if (!data) {
      const staleResponse = await fetch(`/publish/${id}/metadata.json`);
      data = await staleResponse.json();
      data.stale = true;
      // throw `Failed to find fallback for ${id}. No metadata found in cache.`;
    }
  }

  updateNovelMeta(id, data);

  return data;
}

export async function getLocalNovelMetadataCache(id: string): Promise<NovelMetadata> {
  const data: NovelMetadata = await get(IDB_NOVEL_PREFIX + id, getMetadataStore());

  // console.log("💾 loading novel metadata", data);
  updateNovelMeta(id, data);

  return data;
}

function updateNovelMeta(id: string, data: NovelMetadata, source = "") {
  if (!data) {
    // console.error(`Error when updating novel metadata${source ? " from " + source : ""}. Data is ${data}.`);
    return;
  }

  const update = getStore(novelsData);
  update[id] = data;
  novelsData.set(update);
}
