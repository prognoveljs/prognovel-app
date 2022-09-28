<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { backend } from "$lib/store/backend";
  import { onMount, tick } from "svelte";
  import { user, profile } from "$lib/store/user";
  import { goto } from "$app/navigation";
  import { LoaderIcon } from "svelte-feather-icons";
  import type { UserProfile } from "$typings/user";
  import { updateProfile } from "$lib/utils/backend/user";
  const url = new URL($page.url.href.replace("redirect/?", "redirect?"));
  let data;
  onMount(() => {
    data = { code: url.searchParams.get("code") };
  });
  $: if ($backend && browser) {
    const authProvider: any = JSON.parse(localStorage.getItem("authProvider") || "{}");
    console.log(location.origin + "/login/redirect");
    data = {
      ...data,
      authProvider,
    };
    $backend.users
      .authViaOAuth2(
        authProvider.name,
        url.searchParams.get("code"),
        authProvider.codeVerifier,
        //@ts-ignore
        location.origin + "/login/redirect",
      )
      .then(async (u: any) => {
        $user = u;
        // $backend.authStore.exportToCookie();
        console.log(u);
        await tick();
        await normalizeUserData();
        goto("/");
      })
      .catch(console.error);
  }

  async function normalizeUserData() {
    const data: UserProfile | { name?: string; avatar?: Blob } = {};
    const form = new FormData();

    if (!$profile?.name) data.name = $user.meta?.name;
    if (!$profile?.avatar) {
      try {
        const res = await fetch($user?.meta?.avatarUrl);
        const blob = await res.blob();
        data.avatar = blob;
      } catch (error) {
        console.error(error);
      }
    }
    if (JSON.stringify(data) === "{}") return;
    updateProfile(data, true);
  }
</script>

<svelte:head>
  <title>OAuth 2.0 Loading...</title>
</svelte:head>

<article>
  <div class="flex">
    <LoaderIcon class="loader" size="32" />
    Loading user data...
  </div>
</article>

<style lang="scss">
  article {
    font-size: 1.8em;
    position: relative;
    top: 12%;
    width: 400px;
    margin: 0 auto;
    .flex {
      display: flex;
      align-items: center;
      gap: 0.5em;
      margin-bottom: 1em;

      :global(svg.loader) {
        // display: block;
        animation: spin 4s linear infinite;
      }
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
