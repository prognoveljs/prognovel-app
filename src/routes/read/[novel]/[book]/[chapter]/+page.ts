import { browser } from "$app/environment";
import { prefetchChapter, prefetchNextChapter } from "$lib/utils/read-page/fetch-content";
import { checkTableOfContentExists } from "$lib/utils/read-page/navigation";
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
