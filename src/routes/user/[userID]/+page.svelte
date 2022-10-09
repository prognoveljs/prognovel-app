<script lang="ts">
  import UserContact from "$lib/components/user-page/contact/UserContact.svelte";
  import UserFavorite from "$lib/components/user-page/favorite/UserFavorite.svelte";
  import UserStatus from "$lib/components/user-page/status/UserStatus.svelte";
  import Avatar from "$lib/components/user/Avatar.svelte";
  import { customBreadcrumbTitle } from "$lib/utils/navigation/custom-title";
  import { getPocketBaseAvatar } from "$lib/utils/users/avatar";
  import type { UserData } from "$typings/user";
  import { Tab, TabContent, Tabs } from "carbon-components-svelte";
  import { onDestroy, setContext } from "svelte";
  import { writable } from "svelte/store";

  export let data: {
    userData: UserData;
  };
  $: ({ userData } = data);
  const userState = writable(userData);
  setContext("userData", userState);

  $: if (userData?.profile?.name) $customBreadcrumbTitle = userData?.profile?.name;

  onDestroy(() => {
    $customBreadcrumbTitle = "";
  });

  $: console.log({ userData });
  type tab = "status" | "favorite" | "contact";
  let selectedTab: tab = "status";
</script>

<svelte:head>
  <title>User | {userData?.profile?.name || "..."}</title>
</svelte:head>

<section class="banner" />
<div class="body">
  <Avatar size={72} url={getPocketBaseAvatar(userData?.profile)} />
  <h1>{userData?.profile?.name || "--"}</h1>
  <div>join: {userData?.created ? new Date(userData?.created).toDateString() : ""}</div>
</div>

<div class="content">
  <div class="tabs">
    <div on:click={() => (selectedTab = "status")} class:selected={selectedTab === "status"}>
      Status
    </div>
    <div on:click={() => (selectedTab = "favorite")} class:selected={selectedTab === "favorite"}>
      Favorite Works
    </div>
    <div on:click={() => (selectedTab = "contact")} class:selected={selectedTab === "contact"}>
      Contact
    </div>
  </div>
  {#if selectedTab === "status"}
    <UserStatus />
  {:else if selectedTab === "favorite"}
    <UserFavorite />
  {:else if selectedTab === "contact"}
    <UserContact />
  {/if}
</div>

<style lang="scss">
  .banner {
    margin: 0 auto;
    height: 400px;
    width: 100%;
    max-width: 72em;
    background-color: yellowgreen;
    margin-top: 2em;
    border-radius: 12px;
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 200px;
      background: linear-gradient(to top, #000a, #0000);
    }
  }

  .body {
    position: absolute;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-110%) translateX(-50%);
    left: 50%;

    // right: 50%;

    h1 {
      margin: 0;
    }
  }

  .content {
    --content-width: 60em;
    width: 100%;
    max-width: var(--content-width);
    margin: 2em auto;
    .tabs {
      display: flex;
      gap: 0.5em;
      margin-bottom: 1em;

      div {
        --border-color: #fff4;
        --background-color: transparent;
        padding: 0.5em 1em;
        border-bottom: 2px solid var(--border-color);
        background-color: var(--background-color);
        position: relative;
        cursor: pointer;
        user-select: none;

        &:hover {
          --border-color: hsla(#{$hsl}, 0.6);
          --background-color: hsla(#{$hsl}, 0.075);
        }

        &.selected {
          --border-color: var(--primary-color);
          --background-color: hsla(#{$hsl}, 0.2);
        }
      }
    }
  }
</style>
