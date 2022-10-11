<script lang="ts">
  import { backend } from "$lib/store/backend";
  import { DataTable, DataTableSkeleton } from "carbon-components-svelte";
  import { createEventDispatcher } from "svelte";
  import { fade, fly } from "svelte/transition";

  const dispatch = createEventDispatcher();

  export let volumeId;
  let refreshKey: number = 1;
  let page = 1;
  let itemPerPage = 20;
  let el: HTMLElement;

  $: getChapterList =
    refreshKey && $backend?.records
      ? $backend?.records?.getList("chapters", page, itemPerPage, {
          filter: `volume_parent = "${volumeId}"`,
        })
      : new Promise(() => {});
  const TOP_OFFSET = 200;
</script>

<div
  class="screen-overlay"
  in:fade={{ duration: 300 }}
  out:fade={{ duration: 600 }}
  style="--opacity:0.8"
  on:click={() => dispatch("close")}
/>
<article
  bind:this={el}
  in:fly={{
    duration: 320,
    opacity: 1,
    y: el?.parentElement?.parentElement?.clientHeight - TOP_OFFSET,
  }}
  out:fly={{
    duration: 600,
    opacity: 1,
    y: el?.parentElement?.parentElement?.clientHeight - TOP_OFFSET,
  }}
  style="--top-offset:{TOP_OFFSET}px;"
>
  {#await getChapterList}
    <DataTableSkeleton />
  {:then list}
    <DataTable
      rows={list?.items}
      batchSelection
      headers={[
        { key: "title", value: "Chapter title" },
        { key: "is_monetized", value: "Stream Web Monetization" },
        { key: "title_spoiler", value: "Spoiler chapter title" },
        { key: "is_published", value: "Published?" },
        { key: "created", value: "Creation date" },
        { key: "updated", value: "Modified date" },
      ]}
    />
  {:catch error}
    <!-- promise was rejected -->
  {/await}
</article>

<style lang="scss">
  article {
    position: absolute;
    top: var(--top-offset);
    left: 0;
    width: 100%;
    background-color: var(--foreground-color);
    height: calc(100% - var(--top-offset));
    z-index: 10;
    contain: layout;
  }
</style>
