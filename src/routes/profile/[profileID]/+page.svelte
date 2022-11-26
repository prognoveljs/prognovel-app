<script lang="ts">
  import { page } from "$app/stores";
  import SkeletonShell from "$lib/components/SkeletonShell.svelte";
  import Tab from "$lib/components/Tab.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import UserContact from "$lib/components/user-page/contact/UserContact.svelte";
  import UserFavorite from "$lib/components/user-page/favorite/UserFavorite.svelte";
  import UserStatus from "$lib/components/user-page/status/UserStatus.svelte";
  import Avatar from "$lib/components/user/Avatar.svelte";
  import { backend } from "$lib/store/backend";
  import { showErrorMessage } from "$lib/utils/error";
  import {
    customBreadcrubChildren,
    customBreadcrumbTitle,
  } from "$lib/utils/navigation/custom-title";
  import { getPocketBaseAvatar } from "$lib/utils/users/avatar";
  import { formatDate } from "$lib/utils/users/profile";
  import type { UserData } from "$typings/user";
  import { onDestroy, setContext } from "svelte";
  import { Writable, writable } from "svelte/store";

  // export let data: {
  //   userData: UserData;
  // };
  $: id = $page?.params?.profileID;
  $: getUserProfile = (
    $backend && id
      ? fetchUserData(id).catch((err) => {
          showErrorMessage({ message: err });
        })
      : new Promise(() => {})
  ) as Promise<any>;

  const userProfile: Writable<UserData> = writable({});
  setContext("profileData", userProfile);

  $: if ($userProfile?.username) $customBreadcrumbTitle = $userProfile?.username;
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
      const res = (await $backend.collection("users").getOne(id)) as UserData;

      userProfile.set(res);
      return res;
    } catch (error) {
      showErrorMessage({ message: error });
    }
  }

  type tab = "status" | "favorite" | "contact";
  let selectedTab: tab = "status";
</script>

<svelte:head>
  <title>User | {$userProfile?.username || "..."}</title>
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
    <h1>{profile?.username || "--"}</h1>
    <div>join: {formatDate(profile?.created)}</div>
  {:catch error}
    <!-- promise was rejected -->
  {/await}
</div>

<div class="content">
  <Tabs
    selected="status"
    let:tab
    tabs={[{ label: "Status" }, { label: "Favorite works" }, { label: "Contact info" }]}
  >
    <Tab id="status" {tab}>
      <UserStatus />
    </Tab>
    <Tab id="favorite_works" {tab}>
      <UserFavorite />
    </Tab>
    <Tab id="contact_info" {tab}>
      <UserContact />
    </Tab>
  </Tabs>
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
  }
</style>
