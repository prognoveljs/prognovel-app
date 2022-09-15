<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { faSync, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
  import { get, set } from "idb-keyval";
  import Icon from "./Icon.svelte";
  import { dev } from "$app/environment";

  let isUpdate;
  let overlayIn;
  let CookiesPrompt;

  $: if (isUpdate) {
    setTimeout(() => {
      overlayIn = true;
    }, 125);
  }

  async function enableCookies() {
    let cookies = await import(
      /* webpackChunkName: "cookies-prompt" */ "./misc/cookies/CookiesPrompt.svelte"
    );
    CookiesPrompt = cookies.default;
  }

  onMount(async () => {
    const repeatedVisit = await get("repeated-visit");
    if (repeatedVisit) {
    } else {
      await set("repeated-visit", true);

      // Uncomment this to get cookies back
      // await enableCookies();
    }

    if (dev) {
      // if (!CookiesPrompt) await enableCookies();
    } else {
      const cookiesAccept = await get("cookies-accept");
      if (cookiesAccept) {
        // load analytic here
      }
    }
  });
</script>

{#if CookiesPrompt}
  <svelte:component this={CookiesPrompt} />
{/if}
