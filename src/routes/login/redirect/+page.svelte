<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import { backend } from "$lib/utils/backend";
  import { onMount } from "svelte";
  import { user } from "$lib/store/user";
  import { goto } from "$app/navigation";
  import { LoaderIcon } from "svelte-feather-icons";

  const url = new URL($page.url.href.replace("redirect/?", "redirect?"));
  onMount(() => {
    const code = url.searchParams.get("code");
  });
  $: if ($backend && browser) {
    const authProvider: any = JSON.parse(localStorage.getItem("authProvider") || "{}");
    console.log(location.origin + "/login/redirect");
    $backend.users
      .authViaOAuth2(
        authProvider.name,
        url.searchParams.get("code"),
        authProvider.codeVerifier,
        //@ts-ignore
        location.origin + "/login/redirect",
      )
      .then((u) => {
        $user = u;
        console.log({ user: u });
        goto("/");
      });
  }
</script>

<svelte:head>
  <title>OAuth 2.0 Loading...</title>
</svelte:head>

<article>
  <LoaderIcon size="32" />
  Loading user data...
</article>

<style lang="scss">
  article {
    font-size: 1.8em;
    position: relative;
    top: 12%;
    width: 400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 0.5em;
    :global(svg) {
      // display: block;
      animation: spin 4s linear infinite;
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
