// import { toc, currentChapter, currentBook } from "store/read-page";
// import { currentNovel } from "store/states";

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
