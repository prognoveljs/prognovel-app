import { toc } from "$lib/store/read-page/vars";
import { chaptersAppended } from "$lib/store/read-page/state";
import { get as getStore } from "svelte/store";

export function getSlug(page, options = {}) {
  const slug = page.params.slug;
  return parseSlug(slug);
}

export function parseSlug(slug) {
  const regex = /-chapter-/;
  if (!regex.test(slug)) {
    throw slug + " is not a valid chapter.";
  }
  let [novel, chapter] = slug.split("-chapter-");

  // do something

  return [novel, chapter];
}

export function readSlug(slug: string) {
  const [novel, book, chapter] = slug.split("/");

  return {
    novel,
    book,
    chapter,
  };
}

// TODO convert to new API
export function getChapterUrl(
  novel: string,
  book: string,
  chapter: string,
  prefetch: number = 0,
): string {
  let chapterList = getStore(toc) as string[];
  const start = chapterList.findIndex((ch) => ch === `${book}/${chapter}`);
  const end = start + prefetch + 1;
  let list = chapterList.slice(start, end);
  const url = new URL(import.meta.env.BACKEND_API);
  if (import.meta.env.IS_STATIC_API) {
    url.pathname = `${novel}/${book}/${chapter}.json`;
  } else {
    url.pathname = "chapter";
    url.searchParams.set("fetch", list.join(","));
    url.searchParams.set("novel", novel);
    // `${import.meta.env.BACKEND_API}/chapter?fetch=${list.join(",")}&novel=${novel}`
  }
  return url.href;
}

export function getChapterUrlFromList(novel: string, list: string[]) {
  return `${import.meta.env.BACKEND_API}/chapter?fetch=${list.join(",")}&novel=${novel}`;
}
