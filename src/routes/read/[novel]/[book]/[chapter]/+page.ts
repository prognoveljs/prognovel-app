import { browser } from "$app/environment";
import {
  checkTableOfContentExists,
  prefetchNextChapter,
  prefetchChapter,
} from "$lib/utils/read-page";
export const prerender = false;

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params }) {
  const { novel, book, chapter } = params;
  if (browser) {
    checkTableOfContentExists(novel);
    prefetchChapter(novel, book, chapter).then((_) => {
      prefetchNextChapter();
      // prefetch((document.querySelector("a.next-link") as HTMLAnchorElement).href);
    });
  }

  return {};
}
