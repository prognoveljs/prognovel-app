import { BACKEND_API } from "settings";
import { chaptersAppended, toc } from "src/store/read-page";
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
export function getChapterUrl(novel: string, book: string, chapter: string, prefetch: number = 0): string {
  let chapterList = getStore(toc) as string[];
  const start = chapterList.findIndex((ch) => ch === `${book}/${chapter}`);
  const end = start + prefetch + 1;
  let list = chapterList.slice(start, end);
  return `${BACKEND_API}/chapter?fetch=${list.join(",")}&novel=${novel}`;
}

export function getChapterUrlFromList(novel: string, list: string[]) {
  return `${BACKEND_API}/chapter?fetch=${list.join(",")}&novel=${novel}`;
}
