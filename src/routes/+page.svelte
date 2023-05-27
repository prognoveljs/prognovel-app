<script lang="ts">
  import { onMount, setContext } from "svelte";
  import GenerateHTML from "$lib/components/_HTML.svelte";
  import HomeShortcut from "$lib/components/home-page/HomeShortcut.svelte";
  // import LazyComponentsSkeletonShell from "$lib/components/home-page/_LazyComponentsSkeletonShell.svelte";
  // import { loadHomepageLazyComponents } from "$lib/utils/preload.js";
  import { page, siteMetadata } from "$lib/store/states";
  import NavMobile from "$lib/components/NavMobile.svelte";
  import HomeHero from "$lib/components/home-page/HomeHero.svelte";
  import { SITE_TITLE } from "$lib/_setting";
  import { fetchSiteMetadata } from "$lib/utils/fetch-metadata";
  import type { NovelMetadata, NovelsMetadata, SiteMetadata, Bookmark } from "$typings";
  import ComponentsLazy from "$lib/components/home-page/ComponentsLazy.svelte";

  export let data;

  $: ({ sitemetadata, novelsMetadata } = data);

  setContext("data_static", {
    siteMetadata: sitemetadata,
    novelsMetadata: novelsMetadata,
  });

  $: setContext("data", {
    siteMetadata: $siteMetadata,
    page: $page,
  });

  onMount(async () => {});
</script>

<svelte:head>
  <title>Home | {SITE_TITLE}</title>
</svelte:head>
<NavMobile />
<div class="container">
  <HomeShortcut />
  <div class="page-content">
    <div class="hero-container">
      <section class="hero">
        <HomeHero />
      </section>
    </div>
  </div>
</div>

<div class="lazy-component">
  <div class="horizontal-line" />
  <ComponentsLazy />
</div>

<GenerateHTML />

<style lang="scss">
  @import "style/homepage/base.scss";

  .lazy-component {
    --hero-bg: hsl(var(--primary-color-h), 85%, 35%);
    width: calc(100% - var(--shortcut-width));
    left: var(--shortcut-width);
    position: relative;
    overflow: hidden;

    @include screen("tablet") {
      width: 100%;
      left: 0;
      margin: 0 auto;
    }

    @include screen("small-mobile") {
      width: 100%;
      left: 0;
      margin: 0 auto;
    }

    &::before {
      content: "";
      position: absolute;
      width: 500%;
      min-height: 500px;
      height: 100%;
      background-color: var(--background-color);
      top: 2px;
      left: -200%;
      opacity: 0.6;
      z-index: -1;
    }
  }
</style>
