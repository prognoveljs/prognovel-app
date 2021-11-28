import { currentChapterCursor, toc } from "src/store/read-page";
import { get as getStore } from "svelte/store";
import { novelsData } from "store/states";

export function getChapterStoreKey(novel, book, chapter) {
  return `${novel}/${book}/${chapter}`;
}

function getChapterName(cursor = 0, travel = 1) {
  const chapterList = getStore(toc);
  if (!cursor) {
    cursor = getStore(currentChapterCursor);
  }

  return chapterList[cursor + travel];
}

export function getNextChapter(cursor = 0) {
  return getChapterName(cursor);
}

export function getPreviousChapter(cursor = 0) {
  return getChapterName(cursor, -1);
}

export function setChapterCursor(novel, book, chapter) {
  const metadata = getStore(novelsData);
  const chapterList = metadata[novel].chapters;

  if (!chapterList) throw `Fails to load chapter list from ${novel} metadata.`;

  const cursor = chapterList.indexOf(`${book}/${chapter}`);
  currentChapterCursor.set(+cursor);
}

export function checkTableOfContentExists(novel) {
  const novelsMetadata = getStore(novelsData);

  if (!novelsMetadata[novel]) return;
  toc.set(novelsMetadata[novel].chapters);
}
