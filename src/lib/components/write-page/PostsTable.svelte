<script lang="ts">
  import { backend } from "$lib/store/backend";
  import { profile, userData } from "$lib/store/user";
  import { formatDate } from "$lib/utils/users/profile";
  import {
    Button,
    DataTable,
    DataTableSkeleton,
    Toolbar,
    ToolbarBatchActions,
    ToolbarContent,
    ToolbarSearch,
  } from "carbon-components-svelte";
  import { TrashCan } from "carbon-icons-svelte";
  import { CheckSquareIcon, PlusIcon, XCircleIcon } from "svelte-feather-icons";
  import { postRefreshKey } from "$lib/store/write-page";
  import { errorMessages } from "$lib/store/states";
  import { showErrorMessage } from "$lib/utils/error";
  import { createEventDispatcher } from "svelte";

  export let filter = ``;
  let page = 1;
  let itemsPerPage = 10;
  let search = "";
  const TOP_OFFSET = 200;
  const dispatch = createEventDispatcher();
  $: searchFilter = (i) => {
    if (!search) return true;
    try {
      return (i?.title as string)?.toLowerCase().includes(search);
    } catch (err) {
      return true;
    }
  };
  $: getPostList =
    $postRefreshKey && $backend?.collection && $profile?.id
      ? ($backend
          ?.collection("posts")
          ?.getList(page, itemsPerPage, {
            filter: `user = "${$profile?.id}" ${filter ? `&& ${filter}` : ""}`,
            expand: "novel_parent",
          })
          .catch((err) => {
            showErrorMessage({ message: err });
          }) as Promise<any>)
      : new Promise(() => {});

  export let headers = [
    { key: "title", value: "Post title" },
    { key: "is_monetized", value: "Web Monetization" },
    { key: "created", value: "Creation date" },
    { key: "published_at", value: "Modified date" },
    { key: "is_published", value: "Published?" },
  ];

  function renderList(list: any): any[] {
    return (list?.items || []).map((l) => {
      l.created = formatDate(l.created);
      l.published_at = l.published_at ? formatDate(l.published_at) : "--";
      return l;
    });
  }
  function openPost(data: any) {
    try {
      // data.volume_parent = volumeId;
    } catch (error) {}
    dispatch("postevent", data);
  }

  function deletePosts() {}
</script>

<article>
  {#await getPostList}
    <DataTableSkeleton {headers} rows={itemsPerPage} />
  {:then list}
    <DataTable {headers} rows={renderList(list).filter(searchFilter)}>
      <Toolbar>
        <ToolbarBatchActions>
          <Button icon={TrashCan} on:click={deletePosts}>Delete</Button>
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
          <Button icon={PlusIcon} on:click={() => openPost({})}>New Post</Button>
        </ToolbarContent>
      </Toolbar>
      <svelte:fragment slot="cell" let:row let:cell>
        <div class="clickable-row" on:click={() => openPost(row)} />
        <span>
          {#if cell.value === false}
            <XCircleIcon />
          {:else if cell.value === true}
            <CheckSquareIcon />
          {:else}
            {cell.value}
          {/if}
        </span>
      </svelte:fragment></DataTable
    >
  {/await}
</article>

<style lang="scss">
  article {
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

      td {
        position: relative;
        isolation: isolate;
        span {
          position: relative;
          z-index: 2;
        }
      }
    }
    .clickable-row {
      // background-color: red;
      position: absolute;
      inset: 0;
    }
  }
</style>
