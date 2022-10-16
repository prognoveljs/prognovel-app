<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Footer from "$lib/components/Footer2.svelte";
  import OnVisit from "$lib/components/OnVisit.svelte";
  import Loading from "$lib/components/misc/PageLoading.svelte";
  import DownloadProgress from "$lib/components/download/DownloadProgress.svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { navigating, page } from "$app/stores";
  import { isMobileScreen } from "$lib/utils/mobile";
  import MobileMenuBase from "$lib/components/mobile/menu/MobileMenuBase.svelte";
  import { currentNovel, page as currentPage } from "$lib/store/states";
  import { updatePaymentPointers } from "$lib/utils/web-monetization";
  import ServiceWorkerUpdate from "$lib/components/misc/ServiceWorkerUpdate.svelte";
  import { FORBIDDEN_NOVEL_ID } from "$lib/store/novel-page";
  import Analytics from "$lib/components/analytics/Analytics.svelte";
  import { appStart } from "$lib/utils/app-start";
  // import "carbon-components-svelte/css/g90.css";
  import "@skeleton-elements/svelte/skeleton-elements.css";
  import PwaHeader from "$lib/components/pwa/PWAHeader.svelte";
  import { browser } from "$app/environment";
  import ErrorMessages from "$lib/components/errors/ErrorMessages.svelte";

  $: $currentPage = $page;
  $: $currentNovel = FORBIDDEN_NOVEL_ID.includes($page?.params?.novel)
    ? ""
    : $page?.params?.novel || "";

  const transition = {
    In: () => {
      return { x: 12, duration: isMobileScreen() ? 300 : 0 };
    },
    Out: () => {
      return { x: 8, duration: isMobileScreen() ? 65 : 0 };
    },
  };

  onMount(async () => {
    appStart();
    currentNovel.subscribe((novel) => {
      updatePaymentPointers(novel);
    });
  });
</script>

<!-- 
<svelte:head>
  {#if !browser || !("windowControlsOverlay" in navigator)}
    <meta name="theme-color" content="#333" />
  {:else if document.querySelector("html").classList.contains("light")}
    <meta name="theme-color" content="#fff" />
  {:else}
    <meta name="theme-color" content="#444" />
  {/if}
</svelte:head> -->

<Nav />
<Sidebar />

<div class="layout__grid">
  <main in:fly={transition.In()} out:fly={transition.Out()}>
    <slot />
  </main>
  <Footer />
</div>

<OnVisit />
<DownloadProgress />
<Loading isNavigatingBetweenPages={$navigating} />
<ServiceWorkerUpdate />
<Analytics />
<MobileMenuBase />
<PwaHeader />
<ErrorMessages />

<style lang="scss">
  // @import "../../style/cssVariables.scss";
  @import "../../style/fonts.scss";
  @import "../../style/resets.scss";
  :global {
    @import "../../style/page-global-styles.scss";
  }

  :global(body) {
    overflow-y: scroll;
  }
  :global(:root) {
    --body-margin: 24px;

    @include screen("tablet") {
      --body-margin: 24px;
    }
    @include screen("small-tablet") {
      --body-margin: 16px 24px;
      --sidebar-width: 0 !important;
    }
    @include screen("mobile") {
      --body-margin: 16px 24px;
    }
  }

  .layout__grid {
    position: relative;
    width: calc(100% - var(--sidebar-width));
    left: calc(var(--sidebar-width) / 2);
    margin: 0 auto;
    box-sizing: border-box;
    display: grid;
    min-height: calc(100vh - var(--header-height));
    grid-template-rows: 1fr auto;
    overflow: auto;

    @include screen("small-tablet") {
      left: 0;
      width: 100%;
    }
    @include screen("mobile") {
    }
  }

  main {
    min-height: 65vh;

    @include screen("small-tablet") {
      max-width: 100vw;
    }
  }

  :global(.container-center) {
    max-width: 56em;
    padding: 38px var(--mobile-body-side-margin);
    box-sizing: border-box;
    margin: 0 auto;
  }

  :global(a:focus),
  :global(.btn-focusable:focus) {
    /* font-weight: 700; */
    outline: 2px dashed var(--primary-color);
  }
  :global(a:active) {
    /* font-weight: 700; */
    outline-color: transparent;
  }
</style>
