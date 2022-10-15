<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import Avatar from "$lib/components/user/Avatar.svelte";
  import { backend } from "$lib/store/backend";
  import { userData } from "$lib/store/user";
  import { getPocketBaseAvatar } from "$lib/utils/users/avatar";
  import { Button, PaginationNav, TextArea } from "carbon-components-svelte";
  import { SendAlt } from "carbon-icons-svelte";
  import { getContext, onMount } from "svelte";
  import { Writable } from "svelte/store";
  import type { UserData, UserProfile } from "$typings/user";
  import { backendReady } from "$lib/utils/backend";

  const pageProfileData: Writable<UserProfile> = getContext("profileData");
  let statusContent: string = "";
  let totalStatus = 0;
  let totalPages = 1;
  const MAX_STATUS_LENGTH = 120;
  $: disabled = statusContent.length > MAX_STATUS_LENGTH || !statusContent.length;

  $: allStatus = [];
  let pageIndex = 0;
  $: if (pageIndex + 1 && $backend && $page?.params?.profileID) getAllStatus();

  async function getAllStatus() {
    try {
      const res = await $backend?.records?.getList("comments", pageIndex + 1, 10, {
        filter: `urlKey="${$page.url.pathname}"`,
        expand: "userProfile",
        sort: "-created",
      });
      if (!res?.items) return;
      allStatus = res.items;
      totalStatus = res.totalItems;
      totalPages = res.totalPages;
    } catch (error) {
      console.error("Error showing status items", error);
    }
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
  <TextArea
    bind:value={statusContent}
    placeholder={$userData?.user?.profile?.id === $pageProfileData?.id
      ? "What are you thinking today?"
      : `Say something to ${$pageProfileData?.name || "..."}`}
  />
  <div class="cta">
    <em class="content-length" class:disabled>
      {statusContent.length}/{MAX_STATUS_LENGTH}
    </em>
    <Button on:click={createStatus} {disabled} icon={SendAlt} size="small">Send</Button>
  </div>
{/if}

<!-- TODO - sanitize user status HTML -->
<section class="status-container">
  {#each allStatus as status}
    <div class="status-body">
      <a
        href="/profile/{status?.['@expand']?.userProfile?.id}/"
        disabled={!status?.["@expand"]?.userProfile?.id}
      >
        {#key status}
          <Avatar size={40} url={getPocketBaseAvatar(status?.["@expand"]?.userProfile)} />
        {/key}
      </a>
      <div class="status-content">
        <a
          href="/profile/{status?.['@expand']?.userProfile?.id}/"
          disabled={!status?.["@expand"]?.userProfile?.id}
        >
          {status?.["@expand"]?.userProfile?.name || ""}
        </a>
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
      gap: 1.2em;

      a {
        font-weight: 700;
        display: block;
        line-height: 1;
      }
    }
  }

  .sticky-bottom {
    position: fixed;
    bottom: 0;
    left: var(--sidebar-width);
    width: calc(100% - var(--sidebar-width));
    background-color: var(--background-color);

    z-index: 10;
    height: 48px;

    :global {
      .bx--pagination-nav {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
</style>
