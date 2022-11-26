<script lang="ts">
  import { browser } from "$app/environment";
  import Avatar from "$lib/components/user/Avatar.svelte";
  import { backend } from "$lib/store/backend";
  import { backendReady } from "$lib/utils/backend";
  import { showErrorMessage } from "$lib/utils/error";
  import { getPocketBaseAvatar } from "$lib/utils/users/avatar";
  import { formatDate } from "$lib/utils/users/profile";
  import { PaginationNav } from "carbon-components-svelte";
  import { onMount } from "svelte";
  // import type {ListRes} from 'pocketbase'

  const AVATAR_SIZE = "40px";

  let pageIndex = 0;
  let totalPages = 1;
  let itemsPerPage = 20;
  $: getUsers = async (): Promise<any> => {
    if (!$backend) return new Promise(() => {});

    try {
      const res = await $backend?.collection("users").getList(pageIndex + 1, itemsPerPage);
      totalPages = res.totalPages;
      console.log(res);
      return res;
    } catch (error) {
      showErrorMessage({ message: `Failed to load profile list` });
    }

    return new Promise(() => {});
  };
</script>

<article style="--avatar-size: {AVATAR_SIZE};">
  <h1>All Users</h1>
  {#await getUsers()}
    <!-- promise is pending -->
  {:then users}
    {#each users.items as userProfile}
      <a href="/profile/{userProfile?.id}">
        <Avatar size={parseFloat(AVATAR_SIZE)} url={getPocketBaseAvatar(userProfile)} />
        <div class="meta">
          <div class="name">
            {userProfile?.username}
          </div>
          <div class="join">
            Join: {formatDate(userProfile?.created)}
          </div>
        </div>
      </a>
    {/each}
  {:catch error}
    <!-- promise was rejected -->
  {/await}
</article>

<div class="sticky-bottom">
  <PaginationNav bind:page={pageIndex} total={totalPages} />
</div>

<style lang="scss">
  article {
    width: 60em;
    max-width: 100%;
    margin: 5em auto;
    display: flex;
    flex-direction: column;

    h1 {
      font-weight: 700;
      margin-bottom: 1em;
    }

    a {
      padding: 1em 2em 1em 0;
      display: flex;
      gap: 0.8em;
      text-decoration: none;

      :global(.avatar) {
        grid-area: avatar;
      }

      .name {
        grid-area: name;
        font-size: 1.25em;
        line-height: 1;
        font-weight: 700;
        color: var(--primary-color-lighten-3);

        :global(html.light) & {
          color: var(--primary-color-darken-4);
        }
      }

      .join {
        opacity: 0.7;
      }

      &:hover {
        .name {
          text-decoration: underline;
          filter: brightness(120%);
        }
      }
    }
  }

  .sticky-bottom {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--background-color);
    width: var(--content-width);
    z-index: 10;
  }
</style>
