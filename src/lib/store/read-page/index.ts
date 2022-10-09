// export {
//   toc,
//   currentBook,
//   currentChapter,
//   currentChapterCursor,
//   currentChapterIndex,
//   currentChapterTitle,
//   currentContent,
//   chaptersLoaded,
// } from "./read-page-current-vars";
// export {
//   chapterTitles,
//   chaptersAppended,
//   fontSize,
//   asyncTextRendering,
//   registeredPlugins,
//   chaptersWithSpoiler,
//   showTOC,
// } from "./read-page-state";

// export {
//   disableNextChapter,
//   disablePrevChapter,
//   nextChapterLink,
//   prevChapterLink,
//   nextChapter,
//   prevChapter,
//   infiniteLoading,
// } from "./read-page-navigation";

// read-page-trigger.ts

import { novelsData, currentNovel } from "$lib/store/states";
import { get as getStore } from "svelte/store";
import { tick } from "svelte";
import { fetchNovelMetadata } from "$lib/utils/fetch-metadata";
import { fireDebounceFetchChapter } from "$lib/utils/read-page/fetch-content";
import { browser } from "$app/environment";
import { toc } from "./vars";
import { chaptersWithSpoiler, chapterTitles } from "./state";
import type { ChapterTitles, ChapterTitlesChildren } from "./state";

if (browser) {
  console.log("Subscribing novel metadata...");
  currentNovel.subscribe(async (novel) => {
    if (!novel) {
      toc.set([]);
      return;
    }
    let meta: any = getStore(novelsData);
    meta[novel] = await fetchNovelMetadata(novel);
    updateChapterTitles(novel, meta[novel].chapterTitles);
    toc.set(meta[novel].chapters);
    await tick();
    fireDebounceFetchChapter();
  });
}

async function updateChapterTitles(novel: string, freshChapterTitles?: ChapterTitles) {
  let data: ChapterTitles;
  let titles = getStore(chapterTitles);
  if (titles[novel]) return;

  if (freshChapterTitles) {
    data = freshChapterTitles;
  } else {
    const response = await fetch(
      `${import.meta.env.BACKEND_API}/novel?name=${novel}&titles_only=true`,
    );
    if (response.status > 299) {
      return;
    }
    data = await response.json();
  }
  const novelChapterTitles = Object.keys(data).reduce(
    (all: ChapterTitlesChildren, book: string) => {
      const spoilerTag = "$";

      all[book] = Object.keys(data[book]).reduce((prev, ch) => {
        let chapterTitle: unknown = data?.[book]?.[ch];
        if (typeof chapterTitle === "string") {
          if (chapterTitle.startsWith(spoilerTag)) {
            chaptersWithSpoiler.add(`${novel}/${book}/${ch}`);
            chapterTitle = chapterTitle.slice(1);
          }
        }
        prev[ch] = chapterTitle;
        return prev;
      }, {});
      return all;
    },
    {},
  );
  titles = getStore(chapterTitles) ?? {};
  titles[novel] = novelChapterTitles;
  chapterTitles.set(titles);
}
