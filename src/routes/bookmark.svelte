<script lang="ts">
  import ComingSoon from "$lib/components/ComingSoon.svelte";
  import Cover from "$lib/components/BookCover.svelte";
  import { loadBookmark } from "$lib/utils/bookmark";
  import { siteMetadata } from "$lib/store/states";
</script>

<svelte:head>
  <title>Bookmark</title>
</svelte:head>

<div class="container-center">
  <h1>
    Control bookmarked novels, along with detailed history and how do you want the app handle your
    local data.
  </h1>
  <article class="grid">
    {#if $siteMetadata.novelsMetadata}
      {#await loadBookmark()}
        <p>Loading...</p>
      {:then bookmarks}
        {#if bookmarks.length}
          {#each bookmarks as bookmark}
            <Cover novel={bookmark.id} title={bookmark.title} />
          {/each}
        {/if}
      {:catch error}
        <p>{error}</p>
      {/await}
    {/if}
  </article>
  <ComingSoon marginTop={48} />
</div>

<style lang="scss">
  $coverSize: 250px;
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, #{$coverSize});
    grid-gap: 24px;
    justify-content: space-between;
  }
</style>
