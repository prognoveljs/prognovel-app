import { setNovelRecentHistory } from "./history";
import { tick } from "svelte";
import { get as getStore, writable, Writable } from "svelte/store";
// import { asyncTextRendering, toc, chaptersLoaded, infiniteLoading } from "$lib/store/read-page";
import { isLaunchOnPWA } from "../pwa";
import type { Chapter } from "$typings";
import { getChapterStoreKey } from "./navigation";
import { enablePremiumContent } from "$lib/utils/web-monetization";
import { currentNovel } from "$lib/store/states";
import { frameTick } from "../animation";
import { asyncTextRendering } from "$lib/store/read-page/state";
import { chaptersLoaded, toc } from "$lib/store/read-page/vars";
import { infiniteLoading } from "$lib/store/read-page/navigation";

type RenderContentReady = {
  [volumeAndChapter: string]: Promise<boolean>;
};
export const renderContentReady: Writable<RenderContentReady> = writable({});

export function createContentDelay(novel: string, chapterIndex: string): Promise<any> {
  const last = (getStore(toc) ?? []).slice(-3);
  const includes = last.includes(chapterIndex);
  const [book, chapter] = chapterIndex.split("/");
  const content: Chapter = getStore(chaptersLoaded)[getChapterStoreKey(novel, book, chapter)];

  if (includes && !content.monetization && !isLaunchOnPWA() && !getStore(enablePremiumContent)) {
    lastContent = `Ads: ${chapterIndex}`;
    return new Promise(() => {});
  } else {
    return Promise.resolve();
  }
}

function splitHTML(html: string, length = 1000): string[] {
  let result: string[] = [];
  let temp = "";
  let index = 0;
  const dom = new DOMParser().parseFromString(html, "text/html");

  while (dom.body.firstElementChild) {
    const el = dom.body.firstElementChild;
    temp += el.outerHTML || "";
    index += el.innerHTML.length;
    dom.body.removeChild(el);

    if (index >= length || !dom.body.firstElementChild) {
      result.push(temp);
      temp = "";
      index = 0;
    }
  }

  return result;
}

interface ContentRendererProps {
  novel: string;
  book: string;
  chapter: string;
  content: Chapter;
}

let lastContent;

export function resetLastContent(): void {
  lastContent = null;
}

export function contentRenderer(
  node: HTMLElement,
  { novel, book, chapter, content }: ContentRendererProps,
): void {
  // prevent unnecessarily render multiple times
  // console.log("Last content:", lastContent);
  if (lastContent === JSON.stringify(content)) return;
  lastContent = JSON.stringify(content);

  tick().then(() => {
    if (getStore(asyncTextRendering)) {
      _asyncTextRendering(content.html);
    } else {
      // TODO - Improve security when using innerHTML
      // ideally clean sanitize dirty HTML while
      // allowing WebComponents at the same time
      node.innerHTML = content.html;
      complete();
    }

    if (!getStore(infiniteLoading)) {
      _updateNovelRecentHistory();
    }
  });

  function _asyncTextRendering(html: string): void {
    const chunks = splitHTML(html);
    node.innerHTML = chunks.shift();
    _update(chunks);
  }

  function _update(chunks: string[]): void {
    if (!node) return;
    const chunk = chunks.shift();

    // TODO - Improve security when using innerHTML
    node.innerHTML += chunk;

    // TODO ensure updating DOM will not clash
    // if current chapter is already not the soon updated one
    if (chunks.length) {
      requestAnimationFrame(() => _update(chunks));
    } else {
      complete();
    }
  }

  async function complete() {
    await frameTick();
    renderContentReady.update((pool) => {
      pool[`${novel}/${book}/${chapter}`] = Promise.resolve(true);
      return pool;
    });
  }

  async function _updateNovelRecentHistory(): Promise<void> {
    setNovelRecentHistory(novel, `${book}/${chapter}`);
  }
}
