import { FONT_SIZE, LINE_HEIGHT } from "./vars";
import { ChapterState } from "./vars";
import { get as getStore } from "svelte/store";
import { chapterTitles } from "$lib/store/read-page/state";
import type { Chapter } from "$typings";

export function getLoadingPlaceholder(novel = "", book = "", chapter = ""): Chapter {
  const titles = novel && book && chapter ? getStore(chapterTitles) : {};
  return {
    title: titles?.[novel]?.[book]?.[chapter] || "Loading...",
    html: `
    <style>
      .chapter-loading {
        display: grid;
        grid-template-columns: auto;
        grid-gap: ${FONT_SIZE * 0.75}px;
        margin-top: 20px;
        transform: scaleY(var(--fontCustomRatio, 1));
        width: 100%;
        max-width: var(--contentMaxWidth);
        padding: var(--contentPadding);
        margin-right: auto;
        margin-left: auto;
      }

      .skeleton-shell {
        width: 100%;
        height: calc(${FONT_SIZE * LINE_HEIGHT}px * var(--fontCustomRatio, 1));
        background-color: var(--foreground-color);
        opacity: 0.4;
        border-radius: 4px;
      }

      .last {
        width: 55%;
        margin-bottom: ${FONT_SIZE * 2}px;
      }
    </style>
    <div class="chapter-loading">
      <div class="skeleton-shell"></div>
      <div class="skeleton-shell"></div>
      <div class="skeleton-shell"></div>
      <div class="skeleton-shell"></div>
      <div class="skeleton-shell last"></div>
      <div class="skeleton-shell"></div>
      <div class="skeleton-shell"></div>
      <div class="skeleton-shell"></div>
      <div class="skeleton-shell last" style="width: 32%;"></div>
      <div class="skeleton-shell"></div>
      <div class="skeleton-shell"></div>
      <div class="skeleton-shell last" style="width: 60%;"></div>
    </div>
  `,
    meta: {
      status: ChapterState.Loading,
    },
  };
}

export function getErrorPlaceholder(novel = "", book = "", chapter = ""): Chapter {
  const titles = novel && book && chapter ? getStore(chapterTitles) : {};
  return {
    title: titles?.[novel]?.[book]?.[chapter] || "Error when reaching server",
    html: `
    <style>
      .chapter-error {
        
      }

      
    </style>
    <div class="chapter-error">
    </div>
  `,
    meta: {
      status: ChapterState.Error,
    },
  };
}
