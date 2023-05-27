import { get } from "svelte/store";
import { siteMetadata, novelsData } from "$lib/store/states";
import { set as setIDB, get as getIDB, createStore } from "idb-keyval";
import type { SiteMetadata, NovelMetadata } from "$typings";

export const getMetadataStore = () => createStore("app-metadata", "api");
const IDB_NOVEL_PREFIX = "novel-";
const IDB_HOMEPAGE_PREFIX = "homepage";

export async function fetchSiteMetadata(): Promise<SiteMetadata> {
  const res = await fetch("/api/site-metadata");
  const metadata: SiteMetadata = await res.json();

  return metadata;
}

// TODO add loading status to NovelMetadata
export async function fetchNovelMetadata(id: string): Promise<NovelMetadata> {
  const url = new URL(import.meta.env.BACKEND_API);
  if (import.meta.env.IS_STATIC_API) {
    url.pathname = id + "/metadata.json";
  } else {
    url.pathname = "novel";
    url.searchParams.set("name", id);
  }
  let data: NovelMetadata;
  try {
    const response = await fetch(url.href);
    data = await response.json();
    // console.log("🚀 fetching novel metadata", data);
    await setIDB(IDB_NOVEL_PREFIX + id, data, getMetadataStore());
  } catch (err) {
    console.error(`Failed to fetch ${id} from server.`);
    data = await getIDB(IDB_NOVEL_PREFIX + id, getMetadataStore());
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
  const data: NovelMetadata = await getIDB(IDB_NOVEL_PREFIX + id, getMetadataStore());

  // console.log("💾 loading novel metadata", data);
  updateNovelMeta(id, data);

  return data;
}

function updateNovelMeta(id: string, data: NovelMetadata, source = "") {
  if (!data) {
    // console.error(`Error when updating novel metadata${source ? " from " + source : ""}. Data is ${data}.`);
    return;
  }

  const update = get(novelsData);
  update[id] = data;
  novelsData.set(update);
}
