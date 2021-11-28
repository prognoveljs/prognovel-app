<script lang="ts">
  import Nav from "components/Nav.svelte";
  import Sidebar from "components/Sidebar.svelte";
  import Footer from "components/Footer2.svelte";
  import OnVisit from "components/OnVisit.svelte";
  import Loading from "components/misc/PageLoading.svelte";
  import DownloadProgress from "components/download/DownloadProgress.svelte";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { stores } from "@sapper/app";
  import { isMobileScreen } from "utils/mobile";
  import MobileMenuBase from "components/mobile/menu/MobileMenuBase.svelte";
  import { currentNovel, page as currentPage } from "store/states";
  import { updatePaymentPointers } from "utils/web-monetization";
  import ServiceWorkerUpdate from "components/misc/ServiceWorkerUpdate.svelte";
  import { FORBIDDEN_NOVEL_ID } from "src/store/novel-page";
  import Analytics from "components/analytics/Analytics.svelte";

  export let segment;
  const { preloading, page } = stores() as any;

  $: $currentPage = $page;
  $: $currentNovel = FORBIDDEN_NOVEL_ID.includes($page?.params?.novel)
    ? ""
    : $page?.params?.novel || "";

  if ((process as any).browser) {
    currentNovel.subscribe((novel) => {
      updatePaymentPointers(novel);
    });
  }

  const transition = {
    In: () => {
      return { x: 12, duration: isMobileScreen() ? 300 : 0 };
    },
    Out: () => {
      return { x: 8, duration: isMobileScreen() ? 65 : 0 };
    },
  };

  onMount(async () => {});
</script>

<Nav {segment} page={$page} />
<Sidebar {segment} />

<div class="layout__grid">
  <main in:fly={transition.In()} out:fly={transition.Out()}>
    <slot />
  </main>
  <Footer />
</div>

<OnVisit />
<DownloadProgress />
<Loading isNavigatingBetweenPages={$preloading} {segment} />
<ServiceWorkerUpdate />
<Analytics page={$page} />
<MobileMenuBase />

<style lang="scss">
  // @import "../../style/cssVariables.scss";
  @import "../../style/fonts.scss";
  @import "../../style/resets.scss";

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

  :global(a:focus) {
    /* font-weight: 700; */
    outline: 2px dashed var(--primary-color);
  }
  :global(a:active) {
    /* font-weight: 700; */
    outline-color: transparent;
  }
</style>
