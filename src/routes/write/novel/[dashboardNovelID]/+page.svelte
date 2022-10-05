<script lang="ts">
  import { backend } from "$lib/store/backend";
  import { page } from "$app/stores";
  import { userData } from "$lib/store/user";
  import SkeletonShell from "$lib/components/SkeletonShell.svelte";

  export let data;
  $: ({ id, novelData } = data);

  $: getChapterList = $backend.records.getList("chapters", 1, 20, {
    filter: `novelParent="${id}"`,
    sort: "+order",
  });
  $: getVolumeList = $backend.records.getList("volumes", 1, 20, {
    filter: `novelParent="${id}"`,
    sort: "+order",
  });
</script>

<h1>{novelData.title}</h1>
{novelData.synopsis}

<div class="chapter-container">
  {#await Promise.all([getVolumeList, getChapterList])}
    {#each Array(4).fill("") as _}
      <SkeletonShell height="32" style="margin-top: 0.1em;">
        <rect width="100%" height="28" x="0" y="0" rx="4" ry="4" />
      </SkeletonShell>
    {/each}
  {:then [volumes, chapters]}
    {#each volumes?.items || [] as volume}
      <div class="volume">
        <h2>{volume?.title}</h2>
        <div class="chapter-list">
          {#each (chapters?.items || []).filter((c) => c.volume === volume.id) as chapter}
            <a href="/write/chapter/{chapter.id}">{chapter.title}</a>
          {/each}
        </div>
      </div>
    {/each}
  {:catch error}
    <!-- promise was rejected -->
  {/await}
</div>

<style lang="scss">
  .chapter-container {
    margin-top: 2em;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2em;
    .volume {
      background-color: #0002;
      padding: 1em;

      h2 {
        margin-top: 0.3em;
      }

      .chapter-list {
        display: flex;
        flex-direction: column;
      }
      // display: flex;
    }
  }
</style>
