<script lang="ts">
  import { backend } from "$lib/store/backend";
  import {
    Button,
    DataTable,
    DataTableSkeleton,
    Toolbar,
    ToolbarBatchActions,
    ToolbarContent,
    ToolbarMenu,
    ToolbarMenuItem,
    ToolbarSearch,
  } from "carbon-components-svelte";
  import { createEventDispatcher } from "svelte";
  import { PlusIcon } from "svelte-feather-icons";
  import { Edit, TrashCan } from "carbon-icons-svelte";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";
  // import FlexSearch from "flexsearch";

  const dispatch = createEventDispatcher();

  export let volumeId;
  export let title = "";
  export let refreshKey: number = 1;
  let page = 1;
  let itemPerPage = 20;
  let el: HTMLElement;
  let search = "";
  const TOP_OFFSET = 200;
  $: searchFilter = (i) => {
    if (!search) return true;
    try {
      return (i?.title as string)?.toLowerCase().includes(search);
    } catch (err) {
      return true;
    }
  };

  $: getChapterList =
    refreshKey && $backend?.records
      ? $backend?.records?.getList("chapters", page, itemPerPage, {
          filter: `volume_parent = "${volumeId}"`,
          sort: "+index",
        })
      : new Promise(() => {});

  function mapRows(list: any): any[] {
    return list?.items?.map((i) => {
      i.created = new Date(i.created).toDateString();
      i.updated = new Date(i.updated).toDateString();
      return i;
    });
  }

  function appendVolumeData(data: any) {
    try {
      data.volume_parent = volumeId;
    } catch (error) {}
    return data;
  }

  let selectedRowIds = [];
</script>

<div
  class="screen-overlay"
  in:fade={{ duration: 300 }}
  out:fade={{ duration: 600 }}
  style="--opacity:1"
  on:click={() => dispatch("close")}
/>
<article
  bind:this={el}
  in:fly={{
    duration: 225,
    // opacity: 1,
    easing: cubicOut,
    y: el?.parentElement?.parentElement?.clientHeight - TOP_OFFSET,
  }}
  out:fly={{
    duration: 425,
    // opacity: 1,
    easing: cubicIn,
    y: el?.parentElement?.parentElement?.clientHeight - TOP_OFFSET,
  }}
  style="--top-offset:{TOP_OFFSET}px;"
>
  <strong>{title}</strong>
  {#await getChapterList}
    <DataTableSkeleton />
  {:then list}
    <DataTable
      sortable
      bind:selectedRowIds
      rows={mapRows(list).filter(searchFilter)}
      batchSelection
      headers={[
        { key: "index", value: "Ch. Index" },
        { key: "title", value: "Chapter title" },
        { key: "is_monetized", value: "Web Monetization" },
        { key: "title_spoiler", value: "Spoiler " },
        { key: "created", value: "Creation date" },
        { key: "updated", value: "Modified date" },
        { key: "is_published", value: "Published?" },
        { key: "action", value: "" },
      ]}
    >
      <Toolbar>
        <ToolbarBatchActions>
          <Button icon={TrashCan}>Delete</Button>
        </ToolbarBatchActions>
        <ToolbarContent>
          <ToolbarSearch bind:value={search} />
          <!-- <ToolbarMenu>
            <ToolbarMenuItem primaryFocus>Restart all</ToolbarMenuItem>
            <ToolbarMenuItem href="https://cloud.ibm.com/docs/loadbalancer-service">
              API documentation
            </ToolbarMenuItem>
            <ToolbarMenuItem hasDivider danger>Stop all</ToolbarMenuItem>
          </ToolbarMenu> -->
          <Button icon={PlusIcon} on:click={() => dispatch("chapterevent", appendVolumeData({}))}
            >New Chapter</Button
          >
        </ToolbarContent>
      </Toolbar>
      <svelte:fragment slot="cell" let:row let:cell>
        {#if cell.key === "action"}
          <Button
            kind="ghost"
            icon={Edit}
            on:click={() => dispatch("chapterevent", appendVolumeData(row))}>Edit</Button
          >
        {:else}
          {cell.value}
        {/if}
      </svelte:fragment>
    </DataTable>
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

    :global {
      .bx--table-column-checkbox {
        // display: flex;
        // border-bottom: none;
        // align-items: center;
        // justify-content: center;
        .bx--checkbox-label::before {
          // display: none;
          // top: 0;
          bottom: 0.125rem;
        }
      }
    }

    strong {
      font-weight: 700;
      font-size: 2em;
      max-width: min(70em, 60%);
      position: absolute;
      bottom: calc(100% + 0.25em);
      left: 0.5em;
      color: var(--primary-color-lighten-3);
      pointer-events: none;

      :global(html.light) & {
        color: var(--primary-color-darken-2);
      }
    }
  }
</style>
