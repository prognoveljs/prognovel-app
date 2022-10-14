<script lang="ts">
  import { page } from "$app/stores";
  import SkeletonShell from "$lib/components/SkeletonShell.svelte";
  import UserContact from "$lib/components/user-page/contact/UserContact.svelte";
  import UserFavorite from "$lib/components/user-page/favorite/UserFavorite.svelte";
  import UserStatus from "$lib/components/user-page/status/UserStatus.svelte";
  import Avatar from "$lib/components/user/Avatar.svelte";
  import { backend } from "$lib/store/backend";
  import {
    customBreadcrubChildren,
    customBreadcrumbTitle,
  } from "$lib/utils/navigation/custom-title";
  import { getPocketBaseAvatar } from "$lib/utils/users/avatar";
  import { formatDate } from "$lib/utils/users/profile";
  import type { UserData, UserProfile } from "$typings/user";
  import { Tab, TabContent, Tabs } from "carbon-components-svelte";
  import { onDestroy, setContext } from "svelte";
  import { Writable, writable } from "svelte/store";

  // export let data: {
  //   userData: UserData;
  // };
  $: id = $page?.params?.profileID;
  $: getUserProfile = ($backend && id ? fetchUserData(id) : new Promise(() => {})) as Promise<any>;

  const userProfile: Writable<UserProfile> = writable({});
  setContext("profileData", userProfile);

  $: if ($userProfile?.name) $customBreadcrumbTitle = $userProfile?.name;
  $customBreadcrubChildren = {
    profile: {
      label: "All Users",
      href: "/users/",
    },
  };
  onDestroy(() => {
    $customBreadcrumbTitle = "";
    $customBreadcrubChildren = {};
  });

  async function fetchUserData(id: string) {
    try {
      const res = (await $backend.records.getOne("profiles", id)) as UserProfile;

      userProfile.set(res);
      return res;
    } catch (error) {
      console.error("Error fetching user data", error);
      // throw error;
    }
  }

  type tab = "status" | "favorite" | "contact";
  let selectedTab: tab = "status";
</script>

<svelte:head>
  <title>User | {$userProfile?.name || "..."}</title>
</svelte:head>

<section class="banner" />
<div class="body">
  {#await getUserProfile}
    <!-- skeleton shell -->
    <SkeletonShell elClass="skeleton" height={180}>
      <rect width="72" height="72" x="54" y="32" rx="36" ry="36" />
      <rect width="100%" height="1.6em" x="0" y="62%" rx="4" ry="4" />
      <rect width="2.1em" height="1em" x="0.8em" y="81%" rx="4" ry="4" />
      <rect width="7.5em" height="1em" x="3.25em" y="81%" rx="4" ry="4" />
    </SkeletonShell>
  {:then profile}
    <Avatar size={72} url={getPocketBaseAvatar(profile)} />
    <h1>{profile?.name || "--"}</h1>
    <div>join: {formatDate(profile?.created)}</div>
  {:catch error}
    <!-- promise was rejected -->
  {/await}
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
    justify-content: end;
    transform: translateY(-105%) translateX(-50%);
    left: 50%;
    height: 180px;
    width: 180px;

    // right: 50%;

    h1 {
      margin: 0;
      width: max-content;
    }

    :global(.skeleton) {
      position: absolute;
      bottom: -7%;
      left: 50%;
      transform: translateX(-50%);
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
