<script lang="ts">
  import Cover from "components/BookCover.svelte";
  import { getBookmarkLastRead } from "utils/bookmark";
  import { getNovelFirstChapter } from "utils/novel-page";
  import { novelsData, siteMetadata } from "store/states";
  import { onMount } from "svelte";
  import { fetchNovelMetadata } from "utils/fetch-metadata";
  import type { Bookmark } from "typings";

  export let bookmark: Bookmark;
  let pending: boolean = false;
  let destination: string;
  $: novel = bookmark ? bookmark.id : "";
  $: href = `read/${novel}/${destination}`;
  $: chapterList = $novelsData[novel]?.chapters ?? [];
  $: isLastChapterReached = chapterList.indexOf(destination) === chapterList.length - 1;
  $: isFirstChapter = chapterList.indexOf(destination) === 0;
  $: isReady = $siteMetadata.novels && $novelsData[novel] && destination;

  onMount(async () => {
    if (!novel) return;

    await fetchNovelMetadata(novel);
    destination = await getBookmarkLastRead(novel);

    if (!destination) {
      destination = await getNovelFirstChapter(novel);
    }
  });
</script>

{#if bookmark}
  <a {href}>
    <article tabindex="0" class:isLastChapterReached>
      {#if isReady}
        <div class="image">
          <Cover {novel} />
        </div>
        <span class="title">{bookmark.title || "--"}</span>
        <div class="reading">
          {#if isFirstChapter}
            <span class="begin">begin reading</span>
          {:else if isLastChapterReached}
            <span class="last-chapter-reached">last chapter reached</span>
          {:else}<span class="continue">last read at {destination || "..."}</span>{/if}
        </div>
      {/if}
    </article>
  </a>
{/if}

<style lang="scss">
  $bookmarkItemWidth: 250px;
  $bookmarkItemHeight: 125px;

  article {
    width: $bookmarkItemWidth;
    height: $bookmarkItemHeight;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    margin: 0 auto;
    cursor: pointer;
    border: 2px solid transparent;
    user-select: none;
    margin-bottom: 8px;
    background-color: #fff2;

    .image {
      transform: translateY(-15%);
      transition: all 0.225s ease-in-out;
    }

    .title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 12px;
      text-align: left;
      font-size: 36px;
      font-weight: 700;
      line-height: 1;
      text-shadow: 2px 2px #0004;
      transition: transform 0.425s ease-out;
      color: #fff;
    }

    .reading {
      position: absolute;
      bottom: 4px;
      left: 0;
      width: 100%;
      text-align: center;
      transform: translateY(12px);
      opacity: 0;
      transition: all 0.225s ease-out;
      transition-delay: 0.175s;

      & * {
        border-radius: 9.5px;
        padding: 2px 16px;
        background-color: hsl(var(--primary-color-h), 90%, 65%);
        font-size: 13px;
        color: #0009;
      }
    }

    &:hover {
      border-color: var(--primary-color);

      .image {
        transform: translateY(-17%);
      }

      .reading {
        transform: translateY(0);
        opacity: 1;
        transition-delay: 0;
      }

      .title {
        transform: translateY(-40px);
      }
    }
  }

  .isLastChapterReached {
    // image
    :global(img) {
      filter: saturate(60%) grayscale(33%);
    }
  }
</style>
