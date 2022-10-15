<script lang="ts">
  import BookmarkSection from "./shortcut/Bookmark.svelte";
  import HistorySection from "./shortcut/History.svelte";
  import type { Bookmark } from "$typings";

  export let bookmarkData: Bookmark[] = null;
  let select = "bookmark";
  $: translateX = select === "bookmark" ? "0" : "calc(var(--shortcut-width) * -1)";
</script>

<div class="shortcut">
  <div class="head">
    <div class="bookmark-tabs">
      <span
        class="bookmark {select === 'bookmark' ? 'select' : ''}"
        on:click={() => (select = "bookmark")}
      >
        bookmark
      </span>
      <span
        class="recent {select === 'recent' ? 'select' : ''}"
        on:click={() => (select = "recent")}
      >
        recent reads
      </span>
    </div>
  </div>
  <article style="transform: translateX({translateX});">
    <BookmarkSection loading={bookmarkData} />
    <HistorySection />
  </article>
</div>

<style lang="scss">
  .shortcut {
    --shorcut-head-height: 120px;
    --padding: 4px 8px;
    --height: calc(100vh - var(--header-height));
    width: var(--shortcut-width);
    height: var(--height);
    top: var(--header-height);
    left: var(--sidebar-width);
    background: var(--foreground-color);
    position: fixed;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: var(--shorcut-head-height) calc(var(--height) - var(--shorcut-head-height));
    box-shadow: 2px 0 12px #0003;
    border-right: 2px solid #8881;
    z-index: 10;
    overflow-x: hidden;

    @include screen("tablet") {
      display: var(--display, none);
      --shortcut-width: 100vw;
      height: 100vh;
    }

    :global(html.light) & {
      border-right: 1.5px solid #0002;
      box-shadow: none;
    }

    .head {
      width: 100%;
      height: var(--shorcut-head-height);
      background-color: hsl(var(--primary-color-h), 10%, 22%);
      box-shadow: 0 8px 16px #0002;
      z-index: 5;
      position: relative;

      :global(html.light) & {
        background-color: hsl(var(--primary-color-h), 60%, 44%);

        .recent,
        .bookmark {
          opacity: 1 !important;
        }

        .select {
          color: #fff !important;
          background: #fff3;
          border-radius: 4px;
        }
      }

      .bookmark-tabs {
        position: absolute;
        bottom: 4px;
        left: 0;
        display: flex;
        justify-content: space-around;
        width: 100%;
      }
    }
  }

  .bookmark,
  .recent {
    padding: var(--padding);
    opacity: 0.72;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.075em;
    cursor: pointer;
    user-select: none;
    font-weight: 500;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 15px;

    transition: color 0.175s ease-out;
  }

  .select {
    opacity: 1;
    color: hsl(var(--primary-color-h), var(--primary-color-s), 65%);
  }

  article {
    --padding: 0;
    display: flex;
    width: calc(var(--shortcut-width) * 2);
    transition: transform 0.325s ease-in-out;

    @include screen("tablet") {
      --padding: 24px;
    }

    @include screen("mobile") {
      --padding: 12px;
    }

    :global(section) {
      width: var(--shortcut-width);
      height: 100%;
      overflow-y: scroll;
      scrollbar-width: 0px;
    }
    :global(section::-webkit-scrollbar) {
      width: 0;
    }
  }
</style>
