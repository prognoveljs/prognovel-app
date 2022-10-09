<script lang="ts">
  import Download from "$lib/components/download/Download.svelte";
  import Cover from "$lib/components/BookCover.svelte";
  import Description from "./_NovelBookDescription.svelte";
  import {
    downloadProgress as progress,
    downloadCount as count,
  } from "$lib/utils/offline-reading/store";
  import {
    faShareAlt,
    faBookmark,
    faList,
    faChartArea,
    faMoneyBill,
  } from "@fortawesome/free-solid-svg-icons";
  import { toc } from "$lib/store/read-page/vars";
  import TOC from "$lib/components/read-page/ReadTableOfContent.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import Share from "$lib/components/novel-page/Share.svelte";
  import Bookmark from "$lib/components/novel-page/BookmarkSave.svelte";
  import GenreTags from "$lib/components/novel-page/GenreTags.svelte";
  import { showAffiliateReferrer, showRevshareStats } from "$lib/store/novel-page";
  import DownloadWindow from "$lib/components/download/DownloadWindow.svelte";
  import { getContext } from "svelte";
  import type { NovelMetadata } from "$typings";
  import { showTOC } from "$lib/store/read-page/state";

  export let novelMetadata: NovelMetadata = getContext("novelMetadata");
  export let id: string = getContext("id");

  $: title = novelMetadata?.title || "";
  $: isDownloading = $progress !== undefined;

  let showShareWindow = false;
  let showBookmark;
</script>

<div class="meta container-center">
  <section class="book-cover" style="grid-area: cover;">
    <Cover novel={id} isNovelPageCover={true} />
    <div class="buttons">
      <button style="grid-area: share;" on:click={() => (showShareWindow = true)}>
        <Icon size={"1.5em"} paddingBottom={"2.75px"} icon={faShareAlt} />
        <span>share</span>
      </button>
      <button style="grid-area: bookmark;" on:click={() => (showBookmark = true)}>
        <Icon size={"1.5em"} paddingBottom={"2.75px"} icon={faBookmark} />
        <span>bookmark</span>
      </button>
      <button
        class="mobile"
        style="grid-area: revshare;"
        on:click={() => ($showRevshareStats = true)}
      >
        <Icon size={"1.5em"} paddingBottom={"2.75px"} icon={faChartArea} />
        <span>revshare stats</span>
      </button>
      <button
        class="mobile"
        style="grid-area: promote;"
        on:click={() => ($showAffiliateReferrer = true)}
      >
        <Icon size={"1.5em"} paddingBottom={"2.75px"} icon={faMoneyBill} />
        <span>promote novel</span>
      </button>
      <Download {isDownloading} />
      <GenreTags />
    </div>
  </section>
  <Description />
  <button class="toc" on:click={() => ($showTOC = !$showTOC)}>
    <Icon icon={faList} size="20px" color="#222" />
  </button>
</div>

<Share show={showShareWindow} on:close={() => (showShareWindow = false)} />
<Bookmark {id} {title} showModal={showBookmark} on:close={() => (showBookmark = false)} />
<DownloadWindow />

{#if $toc.length && $showTOC}
  <TOC on:close={() => ($showTOC = false)} />
{/if}

<style lang="scss">
  $button-size: 36px;

  .meta {
    --padding: 24px;
    position: relative;
    display: grid;
    grid-template-columns: $cover-width 1fr;
    grid-template-areas: "cover description";
    grid-gap: 24px;
    margin-top: -72px;
    padding: var(--padding);

    @include screen("small-desktop") {
      margin-bottom: 4em;
    }

    @include screen("mobile") {
      --padding: 12px;
      max-width: 100vw !important;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      grid-template-areas: "cover" "description";
      margin-top: -220px;
      padding-bottom: calc(var(--mobile-menu-height) + 0em) !important;
    }
  }

  .book-cover {
    @include screen("mobile") {
      width: 100%;
      margin: 0 auto;
    }
  }

  .buttons {
    display: grid;
    grid-template-columns: $button-size $button-size 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas: "share bookmark offline" "tags tags tags";
    grid-gap: 6px;
    margin-top: 12px;
    justify-content: center;
    align-items: center;

    button {
      --bg-color: hsla(#{$h}, #{$s}, #{$l}, 0.25);
      max-height: $button-size;
      outline: none;
      font-family: inherit;
      background: none;
      border-radius: 2px;
      cursor: pointer;
      border: none;
      height: 100%;

      &.mobile,
      span {
        display: none;
        color: var(--text-body-color);
        @include screen("mobile") {
          display: block;
        }
      }

      span {
        opacity: 0.8;
      }

      :global(path) {
        opacity: 0.7;
      }

      &:hover {
        background-color: var(--bg-color);

        @include screen("mobile") {
          background-color: none;
        }

        :global(path) {
          opacity: 1;
        }
      }

      @include screen("mobile") {
        :global(svg) {
          font-size: 18px;
        }
      }
    }

    @include screen("mobile") {
      grid-template-columns: 1fr 1fr 4fr;
      grid-template-rows: repeat(2, 3.5em);
      grid-template-areas: "share bookmark tags" "revshare promote tags";
      grid-gap: 6px;
      margin-top: 2em;
    }
  }

  .toc {
    --alpha: 1;
    --light: 46%;
    --saturate: 92%;
    position: absolute;
    top: 50px;
    right: -4px;
    padding: 12px;
    border-radius: 50%;
    border: 0 solid var(--primary-color);
    background: hsla(var(--primary-color-h), var(--saturate), var(--light), var(--alpha));
    cursor: pointer;
    box-shadow: 0 2px 7px 1px #0003, 0 2px 17px 8px #0001;
    transform: translate3d(0, 0 0);
    transition: box-shadow 0.125s ease-out;
    will-change: box-shadow;

    &:focus {
      outline: none;
    }

    &:hover {
      --light: 55%;
      --satureate: 100%;
      box-shadow: 0 2px 10px 4px #0003, 0 2px 14px 5px #0000001a;
    }

    @include screen("small-tablet") {
      display: none;
    }
  }
</style>
