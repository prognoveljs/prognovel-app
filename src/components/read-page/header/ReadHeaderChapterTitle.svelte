<script lang="ts">
  import { isCurrentChapterLocked } from "utils/web-monetization";
  import { ChapterState } from "utils/read-page/vars";
  import { currentChapter, currentContent } from "store/read-page";

  export let title: string;
  $: chapter = $currentChapter.slice(8).replace(/-/, ".");
</script>

<section class="title">
  <div class="index" data-cy="chapter-number">
    CHAPTER
    {chapter}
    {#if $isCurrentChapterLocked}🔒{/if}
  </div>
  <h1
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

      &.chapterError {
        color: red;
      }
    }

    .index {
      margin-top: 2.5em;
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
