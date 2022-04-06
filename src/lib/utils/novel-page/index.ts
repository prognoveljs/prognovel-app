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

// @ts-expect-error
export const novelList: string[] = import.meta.env.NOVEL_LIST;
// @ts-expect-error
export const novelTitles: {
  [novel: string]: string;
} = import.meta.env.NOVEL_TITLES;
// @ts-expect-error
export const novelGenres: {
  [novel: string]: string[];
} = import.meta.env.NOVEL_GENRES;
// @ts-expect-error
export const novelDemographics: {
  [novel: string]: string;
} = import.meta.env.NOVEL_DEMOGRAPHICS;
// @ts-expect-error
export const novelSynopsises: {
  [novel: string]: string;
} = import.meta.env.NOVEL_SYNOPSISES;
// @ts-expect-error
export const novelCoverPlaceholders: {
  [novel: string]: string;
} = import.meta.env.NOVEL_COVER_PLACEHOLDERS;
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

export function tagColorizer(tag: string): string {
  if (tag.includes("seinen") || tag.includes("mature")) {
    return "var(--green-1)";
  } else if (tag.includes("shounen") || tag.includes("younglit")) {
    return "var(--blue-1)";
  } else if (tag.includes("fantasy")) {
    return "var(--orange-2)";
  } else if (tag.includes("action")) {
    return "var(--red-2)";
  } else if (tag.includes("romance")) {
    return "var(--red-1)";
  } else if (tag.includes("adventure")) {
    return "var(--green-2)";
  } else if (tag.includes("mystery")) {
    return "var(--grey-1)";
  } else if (tag.includes("thriller")) {
    return "var(--grey-2)";
  } else if (tag.includes("drama")) {
    return "var(--teal-2)";
  } else if (tag.includes("scifi") || tag.includes("sci-fi")) {
    return "var(--silver-2)";
  } else if (tag.includes("historical")) {
    return "var(--orange-1)";
  } else if (tag.includes("psychological")) {
    return "var(--darkblue-2)";
  } else if (tag.includes("sliceoflife")) {
    return "var(--teal-1)";
  }

  return "currentColor";
}
