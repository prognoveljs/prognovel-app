<script lang="ts">
  import { backend } from "$lib/store/backend";
  import { page } from "$app/stores";
  import { userData } from "$lib/store/user";
  import SkeletonShell from "$lib/components/SkeletonShell.svelte";
  import { PlusCircleIcon } from "svelte-feather-icons";
  import NewVolumeModals from "$lib/components/write-page/novel/NewVolumeModals.svelte";
  import VolumeContainer from "$lib/components/write-page/novel/VolumeContainer.svelte";
  import VolumeChapterList from "$lib/components/write-page/novel/VolumeChapterList.svelte";

  export let data;
  let refreshKey = 1;
  $: ({ id, novelData } = data);

  $: getVolumeList =
    refreshKey && $backend
      ? $backend?.records?.getList("volumes", 1, 20, {
          filter: `novel_parent="${id}"`,
          // sort: "+order",
        })
      : [];

  let newVolumeModal = false;
  let showVolumeChapterList;
</script>

<h1>{novelData?.title}</h1>
{novelData?.synopsis}

<div class="chapter-container">
  <!-- {#key refreshKey} -->
  {#await Promise.all([getVolumeList])}
    {#each Array(4).fill("") as _}
      <SkeletonShell height="32" style="margin-top: 0.1em;">
        <rect width="100%" height="28" x="0" y="0" rx="4" ry="4" />
      </SkeletonShell>
    {/each}
  {:then [volumes]}
    {#each volumes?.items || [] as volume, index}
      <VolumeContainer on:click={() => (showVolumeChapterList = volume?.id)} {volume} {index} />
    {/each}
  {:catch error}
    <!-- promise was rejected -->
  {/await}
  <!-- {/key} -->
  <div class="volume-add" on:click={() => (newVolumeModal = true)}>
    <PlusCircleIcon size="70" />
    Add new volume
  </div>
  {#if newVolumeModal}
    <NewVolumeModals
      novelParent={id}
      on:refreshlist={() => refreshKey++}
      on:close={() => (newVolumeModal = false)}
    />
  {/if}

  {#if showVolumeChapterList}
    <!-- content here -->
    <VolumeChapterList
      volumeId={showVolumeChapterList}
      on:close={() => (showVolumeChapterList = null)}
    />
  {/if}
</div>

<style lang="scss">
  .chapter-container {
    --border-radius: 12px;
    margin-top: 2em;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2em;

    .volume-add {
      --border-color: #fff6;
      background-color: var(--foreground-color);
      height: 10em;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1em;
      border: 3px dashed var(--border-color);
      border-radius: var(--border-radius);
      font-size: 2em;
      cursor: pointer;
      &:hover {
        --border-color: hsla(#{$hsl}, 0.3);
        color: var(--primary-color-lighten-3);
      }
    }
  }
</style>
