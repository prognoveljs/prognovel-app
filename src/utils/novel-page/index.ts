import { novelsData, siteMetadata } from "store/states";
import { get as getStore } from "svelte/store";
import type { NovelsMetadata, SiteMetadata } from "typings";
import { fetchNovelMetadata } from "utils/fetch-metadata";
import { toc } from "src/store/read-page";
import { goto } from "@sapper/app";
import { getCoverURLPath } from "utils/images";

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

const novelTitles = new Map();
export function getNovelTitle(novel) {
  if (!novelTitles.size) loadNovelTitles(getStore(siteMetadata));
  if (novelTitles.has(novel)) {
    return novelTitles.get(novel);
  } else {
    return novel;
  }
}

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
/**
 * loadNovelTitles() behaves the same as getNovelTitles(),
 * but loads novel titles bulk at once to avoid unnecessary
 * operation when getting novel title individually.
 *
 * Useful when used within Svelte's for each loop bracket.
 *
 * @param meta NovelsMetadata
 * @returns Array<string>
 */
export function loadNovelTitles(meta) {
  let titles = {};
  if (!meta.novelsMetadata) return titles;
  meta.novelsMetadata.forEach((novel) => {
    titles[novel.id] = novel.title;
    novelTitles.set(novel.id, novel.title);
  });
  return titles;
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
  return `read/${novel}/${chapterDestination}`;
}

export function getNovelCoverSubtitle(
  novel: string,
  opts?: {
    novelsMetadata: NovelsMetadata;
  },
): string {
  const genres: string[] =
    (opts?.novelsMetadata?.[novel] || getStore(novelsData)?.[novel])?.genre || [];
  const demographic: string =
    (opts?.novelsMetadata?.[novel] || getStore(novelsData)?.[novel])?.demographic || "";
  const result = demographic ? `#${demographic}` : "";

  return (
    result +
    genres.slice(0, 2).reduce((prev: string, cur: string): string => {
      prev += ` #${cur}`;
      return prev;
    }, "")
  );
}
