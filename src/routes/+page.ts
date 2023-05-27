import { SITE_TITLE } from "$lib/_setting";
import { get as getIDB } from "idb-keyval";
import { fetchSiteMetadata, getMetadataStore } from "$lib/utils/fetch-metadata";
import { loadPartialNovelsMetadata } from "$lib/utils/novel-page";
import { error } from "@sveltejs/kit";
import type { NovelMetadata, NovelsMetadata, SiteMetadata, Bookmark } from "$typings";
import { browser } from "$app/environment";

/** @type {import('./$types').PageLoad} */
export async function load({ params, query }) {
  return {
    sitemetadata: {},
    novelsMetadata: {},
  };
}
