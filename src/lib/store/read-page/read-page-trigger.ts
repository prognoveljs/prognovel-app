import { novelsData, currentNovel } from "$lib/store/states";
import { get as getStore } from "svelte/store";
import { tick } from "svelte";
import { fetchNovelMetadata } from "$lib/utils/fetch-metadata";
import { BACKEND_API } from "$lib/_setting.ts";
import { fireDebounceFetchChapter } from "$lib/utils/read-page/fetch-content";
import { toc, chapterTitles } from "./index";
import type { ChapterTitles } from "./index";
import { isBrowser } from "$lib/store/states";

if (isBrowser) {
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
  let data;
  const titles = getStore(chapterTitles);
  if (titles[novel]) return;

  if (freshChapterTitles) {
    data = freshChapterTitles;
  } else {
    const response = await fetch(`${BACKEND_API}/novel?name=${novel}&titles_only=true`);
    if (response.status > 299) {
      return;
    }
    data = await response.json();
  }
  titles[novel] = data;
  chapterTitles.set(titles);
}
