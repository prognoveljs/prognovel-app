<script lang="ts">
  import { backend } from "$lib/store/backend";
  import SkeletonShell from "$lib/components/SkeletonShell.svelte";
  import { PlusCircleIcon } from "svelte-feather-icons";
  import NewVolumeModals from "$lib/components/write-page/novel/NewVolumeModals.svelte";
  import VolumeContainer from "$lib/components/write-page/novel/VolumeContainer.svelte";
  import VolumeChapterList from "$lib/components/write-page/novel/VolumeChapterList.svelte";
  import ChapterCanvas from "$lib/components/write-page/chapter/ChapterCanvas2.svelte";
  import { page } from "$app/stores";
  import { showErrorMessage } from "$lib/utils/error";

  let refreshKey = 1;

  $: id = $page?.params?.dashboardNovelID;
  $: getNovelData = (
    $backend && id
      ? $backend
          .collection("novels")
          .getOne(id)
          .catch((err) => {
            showErrorMessage({ message: err });
          })
      : new Promise(() => {})
  ) as Promise<any>;
  $: getVolumeList =
    refreshKey && $backend && id
      ? $backend?.collection("volumes")?.getList(1, 20, {
          filter: `novel_parent="${id}"`,
          // sort: "+order",
        })
      : { items: [] };

  let newVolumeModal = false;
  let showVolumeChapterList;
  let showChapterCanvas;
  let volumeTitle = "";
</script>

{#await getNovelData}
  <!-- skeleton -->
{:then novel}
  <h1>{novel?.title || ""}</h1>
  {novel?.synopsis || ""}
{/await}

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
      <VolumeContainer
        on:click={() => {
          volumeTitle = volume?.title || "";
          showVolumeChapterList = volume?.id;
        }}
        {volume}
        {index}
      />
    {/each}
    <div class="volume-add" on:click={() => (newVolumeModal = true)}>
      <PlusCircleIcon size="70" />
      Add new volume
    </div>
  {:catch error}
    <!-- promise was rejected -->
  {/await}
  <!-- {/key} -->
  {#if newVolumeModal}
    <NewVolumeModals
      novelParent={id}
      on:refreshlist={() => refreshKey++}
      on:close={() => (newVolumeModal = false)}
    />
  {/if}

  {#if showVolumeChapterList}
    <VolumeChapterList
      novel_parent={id}
      volumeId={showVolumeChapterList}
      title={volumeTitle}
      on:close={() => (showVolumeChapterList = null)}
      on:chapterevent={(e) => (showChapterCanvas = e.detail)}
    />
  {/if}
</div>

{#if showChapterCanvas}
  <ChapterCanvas
    novel_parent={id}
    data={showChapterCanvas}
    on:close={() => (showChapterCanvas = null)}
  />
{/if}

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
