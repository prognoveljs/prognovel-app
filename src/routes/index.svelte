<script context="module" lang="ts">
  import { SITE_TITLE } from "$lib/_setting";
  import { get } from "idb-keyval";
  import { fetchSiteMetadata, getMetadataStore } from "$lib/utils/fetch-metadata";
  import { loadPartialNovelsMetadata, novelTitles } from "$lib/utils/novel-page";
  import { isBrowser } from "$lib/store/states";
  import type { NovelMetadata, NovelsMetadata, SiteMetadata, Bookmark } from "$typings";

  interface PreloadData {
    status: number;
    message?: string;
    fresh?: boolean;
    novels?: string[];
    bookmarkData?: Bookmark[];
  }

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params, query }) {
    let url;
    let res;
    let data: PreloadData = { status: 200 };
    let novelsMetadata: NovelsMetadata = {};
    let bookmarkData: Bookmark[];

    url = `${import.meta.env.BACKEND_API}`;
    if (isBrowser) {
      const store = getMetadataStore();
      data = await get("homepage", store);

      if (!data) {
        // @ts-ignore
        data = await fetchSiteMetadata();
        data.fresh = true;
      }
      //@ts-ignore
      novelsMetadata = loadPartialNovelsMetadata(data as SiteMetadata);
      // bookmarkData = await loadBookmark();
      data.status = 200;
    } else {
      const path = await import("path");
      const fs = await import("fs");
      const readJson = (filePath) => {
        return JSON.parse(
          fs.readFileSync(path.join(import.meta.env.CACHE_PATH, filePath), "utf-8"),
        );
      };
      try {
        try {
          data = readJson("assets/publish/sitemetadata.json");
        } catch (error) {
          data.message = error;
        }
        data.novels.forEach((novel) => {
          const novelTemp: NovelMetadata = readJson(`assets/publish/${novel}/metadata.json`);
          // TODO check if adding all option of metadata is overkill
          // TODO strip synopsis and other metadata from novels
          novelsMetadata[novel] = novelTemp;
        });
        data.status = 200;
      } catch (err) {
        console.log("Error reading site metadata!");
        data.status = 500;
        data.message = data.message || "Error when reading website metadata from build cache.";
        console.error(err);
      }
    }

    if (data.status === 200) {
      return {
        status: data.status,
        props: {
          sitemetadata: data,
          novelList: data.novels,
          bookmarkData,
          novelsMetadata,
        },
      };
    } else {
      return {
        status: data.status,
        error: data.message,
      };
    }
  }
</script>

<script lang="ts">
  import { onMount, setContext } from "svelte";
  import GenerateHTML from "$lib/components/_HTML.svelte";
  import HomeNovels from "$lib/components/home-page/HomeNovels.svelte";
  import HomeShortcut from "$lib/components/home-page/HomeShortcut.svelte";
  import LazyComponentsSkeletonShell from "$lib/components/home-page/_LazyComponentsSkeletonShell.svelte";
  import { loadHomepageLazyComponents } from "$lib/utils/preload.js";
  import { page, siteMetadata } from "$lib/store/states";
  import NavMobile from "$lib/components/NavMobile.svelte";
  import HomeHero from "$lib/components/home-page/HomeHero.svelte";

  export let novelList: string[];
  export let sitemetadata: SiteMetadata & PreloadData;
  export let novelsMetadata: NovelsMetadata;
  export let bookmarkData: Bookmark[];

  setContext("data_static", {
    siteMetadata: sitemetadata,
    novelsMetadata: novelsMetadata,
  });

  $: setContext("data", {
    siteMetadata: $siteMetadata,
    page: $page,
  });

  onMount(async () => {
    if (!sitemetadata.fresh) fetchSiteMetadata();
  });
</script>

<svelte:head>
  <title>Home | {SITE_TITLE}</title>
</svelte:head>
<NavMobile />
<div class="container">
  <HomeShortcut {bookmarkData} />
  <div class="page-content">
    <div class="hero-container">
      <section class="hero">
        <!-- <h1>{SITE_TITLE}</h1> -->
        <HomeHero />
        <HomeNovels {novelsMetadata} grid={"novels"} />
      </section>
    </div>

    <!-- load lazy components -->
    {#await loadHomepageLazyComponents()}
      <LazyComponentsSkeletonShell />
    {:then component}
      <svelte:component this={component} />
    {/await}
  </div>
</div>

<GenerateHTML />

<style lang="scss">
  @import "style/homepage/base.scss";
</style>
