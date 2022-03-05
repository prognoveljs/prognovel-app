import { novelsData, siteMetadata } from "$lib/store/states";
import { derived, get as getStore } from "svelte/store";
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

export const novelTitles = import.meta.env.NOVEL_LIST.reduce((prev, cur) => {
  prev[cur] = import.meta.env.NOVELS_METADATA[cur].title;
  return prev;
}, {});

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

export const novelCoverSubtitle = derived([novelsData], (novel_data) => {
  return import.meta.env.NOVEL_LIST.reduce((result: string[], novel: string) => {
    const data = novel_data?.[novel] || import.meta.env.NOVELS_METADATA[novel];
    const genres: string[] = data.genre || [];
    const demographic: string = data.demographic || "";
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
// export function getNovelCoverSubtitle(novel: string): string {
//   const data = getStore(novelsData)?.[novel] || import.meta.env.NOVELS_METADATA[novel];
//   const genres: string[] = data.genre || [];
//   const demographic: string = data.demographic || "";
//   const result = demographic ? `#${demographic}` : "";

//   return (
//     result +
//     genres.slice(0, 2).reduce((prev: string, cur: string): string => {
//       prev += ` #${cur}`;
//       return prev;
//     }, "")
//   );
// }
