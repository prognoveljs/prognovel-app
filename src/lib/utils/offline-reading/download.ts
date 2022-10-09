import { downloadProgress, downloadCount, downloadNovel, downloadErrors } from "./store";
import { get as getStore } from "svelte/store";
import { toc } from "$lib/store/read-page/vars";
import { offlineDB } from "./db";
import type { Chapter } from "$typings";
import { getChapterUrl } from "../read-page/slug";

let download;

async function fetchChapter(url: string, novel: string, book: string, chapter: string) {
  let data: Chapter;
  try {
    data = await fetchUrl(url);
  } catch (error) {
    downloadErrors.update((arr) => [...arr, url]);
    throw `Fails to download ${novel} chapter ${chapter}.`;
  }

  downloadProgress.update((value) => value + 1);
  console.log("Downloading", getStore(downloadProgress), "of", getStore(downloadCount));
  await offlineDB.set(novel, `${book}/${chapter}`, data[`${book}/${chapter}`]);
}

async function fetchUrl(url: string) {
  const res = await fetch(url);
  const type = res.headers.get("content-type");
  let data: Chapter;

  if (type === "application/json") {
    data = await res.json();
  } else {
    // data = await res.text();
    throw url + "is not a JSON.";
  }

  return data;
}

interface DownloadRetry {
  url: string;
  chapter: string;
  novel: string;
}

async function retryDownload(chapter: string) {
  const retries = getStore(downloadErrors);
  downloadErrors.set([]);

  retries.forEach(async ({ url, chapter, novel }) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      downloadProgress.update((value) => value++);
      await offlineDB.set(novel, chapter, data);
    } catch (err) {
      downloadErrors.update((arr) => [...arr, url]);
      throw `Fails to download ${novel} chapter ${chapter}.`;
    }
  });
}

function batchDownload({ novel, chapters }) {
  chapters.forEach((ch) => {
    const book = ch.split("/")[0];
    const chapter = ch.split("/")[1];
    const url = getChapterUrl(novel, book, chapter, 0);
    fetchChapter(url, novel, book, chapter);
  });
}

export function startDownload(downloadedNovel, novel, test = false) {
  let progress = getStore(downloadProgress);
  let chapterList = getStore(toc) as string[];

  if (!chapterList) return;

  const downloadTotal = chapterList.length;

  if (progress !== undefined) {
    return;
  }

  download = {
    novel: downloadedNovel,
    chapters: chapterList,
  };

  downloadProgress.set(0);
  downloadErrors.set([]);
  downloadCount.set(downloadTotal);
  downloadNovel.set(downloadedNovel);

  // don't download in test
  if (!test) {
    batchDownload(download);
  }

  const offlineIndexMeta = {
    id: downloadedNovel,

    // Required; url needs to be an offline-capable HTML page.
    // For compatibility during the Origin Trial, include launchUrl as well.
    url: "/" + downloadedNovel,
    launchUrl: "/" + downloadedNovel,

    // Required; used in user-visible lists of content.
    title: novel.title,

    // Required; used in user-visible lists of content.
    description: novel.synopsis,

    // Required; used in user-visible lists of content.
    icons: [
      {
        src: `/publish/${novel.id}/cover-64x64.webp`,
        sizes: "64x64",
        type: "image/webp",
      },
    ],

    // Optional; valid categories are currently:
    // 'homepage', 'article', 'video', 'audio', or '' (default).
    category: "",
  };

  addToOfflineIndex(offlineIndexMeta);
}

async function addToOfflineIndex(meta) {
  const sw = await navigator.serviceWorker.ready;

  if ("index" in sw) {
    (sw as any).index.add(meta);
    console.log(meta.id, "added to offline content index.");
  }
}
