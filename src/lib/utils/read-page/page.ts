// import { toc, currentChapter, currentBook } from "$lib/store/read-page";
// import { currentNovel } from "$lib/store/states";

import { resetLastContent } from "./render-content";

export function enterPage() {
  // initializePopState();
}

export function leavePage() {
  // destroyPopState();
  // toc.set([]);
  // currentNovel.set("");
  // currentChapter.set("");
  // currentBook.set("");
  resetLastContent();
}
