<script lang="ts">
  import Icon from "components/Icon.svelte";
  import BookmarkItem from "./BookmarkItem.svelte";
  import { faFire } from "@fortawesome/free-solid-svg-icons";
  import { loadBookmark } from "utils/bookmark";
  import { siteMetadata } from "store/states";
  import HelpContainer from "./help/HelpContainer.svelte";
  import type { Bookmark } from "typings";

  export let loading: Bookmark[];
</script>

<section aria-disabled="true" id="bookmark-body">
  {#if $siteMetadata.novelsMetadata}
    {#await loading ? Promise.resolve(loading) : loadBookmark()}
      <span>...</span>
    {:then bookmarks}
      {#each bookmarks as bookmark}
        <BookmarkItem {bookmark} />
      {/each}
      <div class="help">❓ read meh first</div>
      <HelpContainer />
    {:catch _}
      <div class="empty">
        <div style="padding-top: 12px;" />
        <Icon size="3em" icon={faFire} />
        <em>You don't have any books bookmarked.</em>
      </div>
      <div class="help">❓ read meh first</div>
      <HelpContainer />
    {/await}
  {/if}
</section>

<style lang="scss">
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-top: 24px;

    @import "_empty-content.scss";

    // button.add {
    //   padding: 4px 12px;
    // }
  }

  .help {
    text-align: left;
    font-size: 0.9em;
    align-self: start;
    margin: 2px 8px;
    margin-top: 50px;
  }
</style>
