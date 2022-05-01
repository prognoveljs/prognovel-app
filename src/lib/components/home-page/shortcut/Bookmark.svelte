<script lang="ts">
  import Icon from "$lib/components/Icon.svelte";
  import BookmarkItem from "./BookmarkItem.svelte";
  import { faFire } from "@fortawesome/free-solid-svg-icons";
  import { loadBookmark } from "$lib/utils/bookmark";
  import { siteMetadata } from "$lib/store/states";
  import HelpContainer from "./help/HelpContainer.svelte";
  import type { Bookmark } from "$typings";
  import { getContext } from "svelte";

  export let loading: Bookmark[] = null;
  export let showHelp = getContext("show-help") ?? true;
</script>

<section aria-disabled="true" id="bookmark-body">
  {#if $siteMetadata.novelsMetadata}
    {#await loading ? Promise.resolve(loading) : loadBookmark()}
      <span>...</span>
    {:then bookmarks}
      <div class="grid-item">
        {#each bookmarks as bookmark}
          <BookmarkItem {bookmark} />
        {/each}
      </div>
      {#if showHelp}
        <div class="help">❓ read meh first</div>
        <HelpContainer />
      {/if}
    {:catch _}
      <div class="empty">
        <div style="padding-top: 12px;" />
        <Icon size="3em" icon={faFire} />
        <em>You don't have any books bookmarked.</em>
      </div>
      {#if showHelp}
        <div class="help">❓ read meh first</div>
        <HelpContainer />
      {/if}
    {/await}
  {/if}
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 var(--padding);
    padding-top: 24px;
    position: relative;
    width: var(--shortcut-width);

    @import "_empty-content.scss";

    // button.add {
    //   padding: 4px 12px;
    // }
    .grid-item {
      width: 100%;
      padding: 0 12px;
      @include screen("tablet") {
        padding: 0;
        position: relative;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 4px 12px;
      }

      @include screen("mobile") {
        gap: 4px;
      }
    }
  }

  .help {
    text-align: left;
    font-size: 0.9em;
    align-self: start;
    margin: 2px 8px;
    margin-top: 50px;
  }
</style>
