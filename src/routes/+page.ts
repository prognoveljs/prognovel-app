import { SITE_TITLE } from "$lib/_setting";
import { get as getIDB } from "idb-keyval";
import { fetchSiteMetadata, getMetadataStore } from "$lib/utils/fetch-metadata";
import { loadPartialNovelsMetadata, novelTitles } from "$lib/utils/novel-page";
import { error } from "@sveltejs/kit";
import type { NovelMetadata, NovelsMetadata, SiteMetadata, Bookmark } from "$typings";
import { browser } from "$app/environment";

interface PreloadData {
  status: number;
  message?: string;
  fresh?: boolean;
  novels?: string[];
  bookmarkData?: Bookmark[];
}

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params, query }) {
  let url;
  let res;
  let data: PreloadData = { status: 200 };
  let novelsMetadata: NovelsMetadata = {};
  let bookmarkData: Bookmark[];

  url = `${import.meta.env.BACKEND_API}`;
  if (browser) {
    const store = getMetadataStore();
    data = await getIDB("homepage", store);

    if (!data) {
      // @ts-ignore
      data = await fetchSiteMetadata();
      data.fresh = true;
    }
    //@ts-ignore
    novelsMetadata = loadPartialNovelsMetadata(data as SiteMetadata);
    // bookmarkData = await loadBookmark();
    data.status = 200;
  } else {
    try {
      // try {
      //   data = readJson("assets/publish/sitemetadata.json");
      // } catch (error) {
      //   data.message = error;
      // }
      // data.novels.forEach((novel) => {
      //   const novelTemp: NovelMetadata = readJson(`assets/publish/${novel}/metadata.json`);
      //   // TODO check if adding all option of metadata is overkill
      //   // TODO strip synopsis and other metadata from novels
      //   novelsMetadata[novel] = novelTemp;
      // });
      data.status = 200;
    } catch (err) {
      console.log("Error reading site metadata!");
      data.status = 500;
      data.message = data.message || "Error when reading website metadata from build cache.";
      console.error(err);
    }
  }

  if (data.status === 200) {
    return {
      status: data.status,
      bookmarkData,
    };
  } else {
    throw error(data.status, data.message);
  }
}
