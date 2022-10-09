<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import Avatar from "$lib/components/user/Avatar.svelte";
  import { backend } from "$lib/store/backend";
  import { userData } from "$lib/store/user";
  import { getPocketBaseAvatar } from "$lib/utils/users/avatar";
  import { Button, PaginationNav, TextArea } from "carbon-components-svelte";
  import { SendAlt } from "carbon-icons-svelte";
  import { onMount } from "svelte";

  let statusContent: string = "";
  let totalStatus = 0;
  let totalPages = 1;
  const MAX_STATUS_LENGTH = 120;
  $: disabled = statusContent.length > MAX_STATUS_LENGTH;

  $: allStatus = [];
  let pageIndex = 1;
  $: if (pageIndex + 1 && browser) getAllStatus();

  // $: console.log({ allStatus });

  async function getAllStatus() {
    const res = await $backend?.records?.getList("comments", pageIndex + 1, 10, {
      filter: `urlKey="${$page.url.pathname}"`,
      expand: "userProfile",
      sort: "-created",
    });
    if (!res?.items) return;
    allStatus = res.items;
    totalStatus = res.totalItems;
    totalPages = res.totalPages;
    console.log(res);
  }

  async function createStatus() {
    try {
      let content = statusContent;
      statusContent = "";
      await $backend.records.create("comments", {
        urlKey: $page.url.pathname,
        userProfile: $userData?.user?.profile?.id,
        user: $userData?.user?.id,
        content,
      });

      getAllStatus();
    } catch (error) {}
  }

  onMount(() => {
    // getAllStatus();
  });
</script>

{#if $userData?.user?.id}
  <TextArea bind:value={statusContent} placeholder="What are you thinking today?" />
  <div class="cta">
    <em class="content-length" class:disabled>
      {statusContent.length}/{MAX_STATUS_LENGTH}
    </em>
    <Button on:click={createStatus} {disabled} icon={SendAlt} size="small">Send</Button>
  </div>
{/if}

<section class="status-container">
  {#each allStatus as status}
    <div class="status-body">
      <Avatar url={getPocketBaseAvatar(status?.["@expand"]?.userProfile)} />
      <div class="status-content">
        <strong>{status?.["@expand"]?.userProfile?.name || ""}</strong>
        {status?.content || ""}
      </div>
    </div>
  {/each}
</section>

<div class="sticky-bottom">
  <PaginationNav bind:page={pageIndex} total={totalPages} />
</div>

<style lang="scss">
  .cta {
    display: flex;
    margin: 0.5em auto 2em;
    justify-content: end;
    align-items: center;
    gap: 0.5em;

    .content-length {
      font-weight: 300;
      opacity: 0.7;
      font-size: 0.9em;

      &.disabled {
        color: red;
        font-weight: 500;
        filter: contrast(80%);
      }
    }
  }

  .status-container {
    margin-bottom: 3em;
    display: flex;
    flex-direction: column;

    .status-body {
      display: flex;
      // flex-direction: column;
      min-height: 4em;
      gap: 2em;

      strong {
        display: block;
        line-height: 1;
      }
    }
  }

  .sticky-bottom {
    position: fixed;
    bottom: 0;
    background-color: var(--background-color);
    width: var(--content-width);
    z-index: 10;
  }
</style>
