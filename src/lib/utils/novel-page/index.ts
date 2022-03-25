import { novelsData, siteMetadata } from "$lib/store/states";
import { derived, get as getStore, Readable } from "svelte/store";
import { fetchNovelMetadata } from "$lib/utils/fetch-metadata";
import { toc } from "$lib/store/read-page";
import { getCoverURLPath } from "$lib/utils/images";
import type { NovelsMetadata, SiteMetadata } from "$typings";

export function getNovelBookCoverSrc(
  novel: string,
  type: "jpeg" | "jpg" | "png" | "webp" = "webp",
): string {
  return getCoverURLPath(novel, { width: 256, height: 256 }, type);
}

export async function getNovelFirstChapter(novel: string): Promise<string> {
  let novelsMetadata: NovelsMetadata = getStore(novelsData);

  if (!novelsMetadata[novel]) {
    novelsMetadata[novel] = await fetchNovelMetadata(novel);
  }

  return novelsMetadata[novel].chapters?.[0] ?? "";
}

export const novelList = import.meta.env.NOVEL_LIST;
export const novelTitles = import.meta.env.NOVEL_TITLES;
export const novelGenres = import.meta.env.NOVEL_GENRES;
export const novelDemographics = import.meta.env.NOVEL_DEMOGRAPHICS;
export const novelSynopsises = import.meta.env.NOVEL_SYNOPSISES;
export const novelCoverPlaceholders = import.meta.env.NOVEL_COVER_PLACEHOLDERS;
console.log(novelCoverPlaceholders);
/**
 * Load novels metadata from memory. If a novel data hasn't been fetched from API, it will
 * returns the short version from parent site metadata that contains novel title, author, chapter numbers,
 * last chapter, demographic, genre, and tags.
 * @params SiteMetadata
 * @returns NovelsMetadata
 */
export function loadPartialNovelsMetadata(siteMetadata: SiteMetadata): NovelsMetadata {
  const novelsMetadata: NovelsMetadata = getStore(novelsData);
  const novelList: string[] = siteMetadata.novels;

  novelList.forEach((novel) => {
    if (!(novel in novelsMetadata)) {
      novelsMetadata[novel] = siteMetadata.novelsMetadata.find((meta) => meta.id === novel);
    }
  });

  return novelsMetadata;
}

export function createDerivedNovelsMetadata($meta: SiteMetadata) {
  if ($meta?.novelsMetadata) {
    return $meta.novelsMetadata.reduce((obj, cur) => {
      obj[cur.id] = cur;
      return obj;
    }, {});
  } else {
    return {};
  }
}

export function handleReadButton(novel: string): string {
  const tableOfContent: string[] = getStore(toc);
  if (!tableOfContent.length) return;

  const chapterDestination = tableOfContent[0];
  return `/read/${novel}/${chapterDestination}`;
}

export const novelCoverSubtitle: Readable<{
  [novel: string]: string;
}> = derived([novelsData], (novel_data) => {
  return novelList.reduce((result, novel: string) => {
    const genres: string[] = novel_data?.[novel] || novelGenres[novel] || [];
    const demographic: string = novel_data?.[novel] || novelDemographics[novel] || "";
    const subtitle = demographic ? `#${demographic}` : "";
    result[novel] =
      subtitle +
      genres.slice(0, 2).reduce((prev: string, cur: string): string => {
        prev += ` #${cur}`;
        return prev;
      }, "");

    return result;
  }, {});
});
