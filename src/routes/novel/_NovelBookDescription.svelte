<script lang="ts">
  import DescriptionInfo from "$lib/components/novel-page/DescriptionInfo.svelte";
  import { currentNovel } from "$lib/store/states";
  import { getContext } from "svelte";
  import type { NovelMetadata } from "$typings";
  import { handleBeginReadingButton, ReadNowObject } from "$lib/utils/novel-page";
  import ChapterNavigation from "$lib/components/navigation/chapter/ChapterNavigation.svelte";
  import { toc } from "$lib/store/read-page/vars";
  import { browser } from "$app/environment";

  let novelMetadata: NovelMetadata = getContext("novelMetadata");
  let showMore = false;
  $: height = showMore ? "auto" : "270px";

  let nextChapter;
  $: lastReadAt = null;
  $: readNowData = (
    $toc?.length ? handleBeginReadingButton($currentNovel) : Promise.resolve("")
  ) as Promise<ReadNowObject>;
  $: readNowData.then((data) => {
    if (typeof data?.link === "string") nextChapter = data?.link;
    lastReadAt = data?.lastReadAt;
  });
  $: isLinkReady = nextChapter;
  $: disableLink = Boolean(!browser || !isLinkReady);
</script>

<article>
  <div class="header-wrapper">
    <h1 id="novel-title">{novelMetadata ? novelMetadata.title : "Loading..."}</h1>
  </div>
  <DescriptionInfo {novelMetadata} />
  <div class="novel-description" style="height: {height};" class:hideMore={!showMore}>
    {@html novelMetadata ? novelMetadata.synopsis : ""}
    {#if !showMore}<span class="show-more" on:click={() => (showMore = true)}>show more</span>{/if}
  </div>
  <ChapterNavigation
    {nextChapter}
    backChapter={lastReadAt ? $toc[0] : ""}
    backButtonLabel="Read from first chapter"
    nextButtonLabel={lastReadAt ? "Continue reading" : "Begin reading"}
    disabledNext={disableLink}
    nextChapterLabel={lastReadAt ? "last read at" : "from"}
    hasLoading={true}
  />
</article>

<style lang="scss">
  article {
    position: relative;
    grid-area: description;

    animation: 1s linear forwards progress;
    animation-timeline: desc-roll;
    padding-top: 56px;

    @include screen("mobile") {
      margin: {
        right: calc(var(--padding) * -1);
        left: calc(var(--padding) * -1);
      }
      padding: var(--padding);

      @supports (animation-timeline: works) {
        background: var(--foreground-color);
        box-shadow: 0 -4px 12px #0002, 0 -2px 4px #0005;
        @keyframes progress {
          from {
            transform: translateY(-100px);
          }

          to {
            transform: translateY(0);
          }
        }

        @scroll-timeline desc-roll {
          source: auto;
          orientation: vertical;
          scroll-offsets: 0%, 200px;
          time-range: 1s;
        }
      }
    }
  }

  .header-wrapper {
    position: relative;
    h1 {
      margin-top: 0;
      font-weight: 700;
      color: #fff;
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;

      @include screen("mobile") {
        position: relative;
      }
    }
  }

  .novel-description {
    overflow-y: hidden;
    position: relative;

    .show-more {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      position: absolute;
      width: 100%;
      height: 48px;
      bottom: 0;
      left: 0;
      color: var(--primary-color);
      text-align: center;
      padding-bottom: 6px;
      z-index: 5;
      cursor: pointer;
      opacity: 0.66;
      text-shadow: 0 0 4px var(--foreground-color);

      &:hover {
        opacity: 1;
      }

      @include screen("mobile") {
        font-size: 16px;
        padding-bottom: 16px;
      }
    }
  }

  .hideMore {
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 160px;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(
        to top,
        var(--background-color),
        var(--background-color-alpha)
      );
      border-bottom: 1.5px solid hsla(var(--primary-color-h), 55%, 44%, 1);
      @include screen("mobile") {
        @supports (animation-timeline: works) {
          background-image: linear-gradient(
            to top,
            var(--foreground-color),
            var(--foreground-color-alpha)
          );
        }
      }
    }
  }
</style>
