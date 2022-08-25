<script lang="ts">
  import { isCurrentChapterLocked } from "$lib/utils/web-monetization";
  import { ChapterState } from "$lib/utils/read-page/vars";
  import {
    chaptersLoaded,
    chaptersWithSpoiler,
    currentBook,
    currentChapter,
    currentContent,
  } from "$lib/store/read-page";
  import { getChapterStoreKey } from "$lib/utils/read-page";
  import SpeechSyntesis from "$lib/components/read-page/speech-synthesis/SpeechSyntesis.svelte";
  import { currentNovel } from "$lib/store/states";

  export let title: string;
  $: chapter = $currentChapter.slice(8).replace(/-/, ".");
  $: spoiler =
    Boolean(
      $chaptersLoaded?.[getChapterStoreKey($currentNovel, $currentBook, $currentChapter)]?.spoiler,
    ) || chaptersWithSpoiler.has(`${$currentNovel}/${$currentBook}/${$currentChapter}`);
</script>

<section class="title">
  <SpeechSyntesis />
  <div class="index" data-cy="chapter-number">
    <span id="chapter-index">
      CHAPTER {chapter}
    </span>
    {#if $isCurrentChapterLocked}🔒{/if}
  </div>
  <h1
    tabindex={spoiler ? 0 : -1}
    class:spoiler
    id="chapter-title"
    class:chapterError={$currentContent.meta && $currentContent.meta.status === ChapterState.Error}
  >
    {title}
  </h1>
</section>

<style lang="scss">
  .title {
    max-width: var(--contentMaxWidth);
    padding: var(--contentPadding, 0);
    width: 100%;
    margin: -10em auto 12px;

    h1 {
      --ratio: 1.75;
      --defaultFontSize: 20px;
      font-size: calc(var(--fontSize, 20px) * var(--ratio));
      margin-top: 0.25em;
      font-weight: 700;
      letter-spacing: -0.0225em;
      display: inline-block;
      position: relative;
      overflow: hidden;

      &.chapterError {
        color: red;
      }

      &.spoiler {
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          transition: all 0.125s ease-in-out;
          inset: 0;
          background-color: #fff2;
          backdrop-filter: blur(12px);
        }

        &:hover,
        &:focus {
          &::after {
            transform: translateY(100%);
          }
        }
      }
    }

    .index {
      margin-top: 0.5em;
      letter-spacing: 0.125em;
      color: var(--primary-color);
      font-weight: 300;

      @include screen("tablet") {
        .index {
          font-size: 16px;
        }
      }
    }
  }
</style>
