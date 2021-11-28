<script context="module" lang="ts">
  import { SITE_TITLE, BACKEND_API, SITE_SUBTITLE, SITE_SUBTITLE2 } from "settings";
  import { get } from "idb-keyval";
  import { fetchSiteMetadata, getMetadataStore } from "utils/fetch-metadata";
  import { loadNovelTitles, loadPartialNovelsMetadata } from "utils/novel-page";
  import { loadBookmark } from "utils/bookmark";
  import type { NovelMetadata, NovelsMetadata, SiteMetadata, Bookmark } from "typings";

  interface PreloadData {
    status: number;
    message?: string;
    fresh?: boolean;
    novels?: string[];
    bookmarkData?: Bookmark[];
  }

  export async function preload({ params, query }) {
    let url;
    let res;
    let data: PreloadData = { status: 200 };
    let novelsMetadata: NovelsMetadata = {};
    let novelTitles = {};
    let bookmarkData: Bookmark[];

    url = `${BACKEND_API}`;
    if ((process as any).browser) {
      const store = getMetadataStore();
      data = await get("homepage", store);

      if (!data) {
        // @ts-ignore
        data = await fetchSiteMetadata();
        data.fresh = true;
      }
      novelTitles = loadNovelTitles(data);
      //@ts-ignore
      novelsMetadata = loadPartialNovelsMetadata(data as SiteMetadata);
      // bookmarkData = await loadBookmark();
      data.status = 200;
    } else {
      const path = await import("path");
      const fs = await import("fs");
      const readJson = (filePath) => {
        return JSON.parse(fs.readFileSync(path.join(process.env.CACHE_FOLDER, filePath), "utf-8"));
      };
      try {
        data = readJson("assets/publish/sitemetadata.json");
        data.novels.forEach((novel) => {
          const novelTemp: NovelMetadata = readJson(`assets/publish/${novel}/metadata.json`);

          novelTitles[novel] = novelTemp.title;
          // TODO check if adding all option of metadata is overkill
          // TODO strip synopsis and other metadata from novels
          novelsMetadata[novel] = novelTemp;
        });
        data.status = 200;
      } catch (error) {
        console.log("Error reading site metadata!");
        data.status = 500;
        data.message = "Error when reading website metadata from build cache.";
        console.error(error);
      }
    }

    if (data.status === 200) {
      return {
        sitemetadata: data,
        novelList: data.novels,
        bookmarkData,
        novelsMetadata,
        novelTitles,
        SITE_SUBTITLE,
        SITE_SUBTITLE2,
      };
    } else {
      console.log("Error!");
      console.log("--", data.message);
      this.error(data.status, data.message);
    }
  }
</script>

<script lang="ts">
  // import {} from "settings";
  import { onMount, setContext } from "svelte";
  import GenerateHTML from "components/_HTML.svelte";
  import { HomeHero } from "style/homepage/components";
  import HomeShortcut from "components/home-page/HomeShortcut.svelte";
  import LazyComponentsSkeletonShell from "components/home-page/_LazyComponentsSkeletonShell.svelte";
  import { loadHomepageLazyComponents } from "utils/preload";
  import { page, siteMetadata } from "states";
  import NavMobile from "components/NavMobile.svelte";

  export let novelList: string[];
  export let novelTitles: string[];
  export let sitemetadata: SiteMetadata & PreloadData;
  export let novelsMetadata: NovelsMetadata;
  export let bookmarkData: Bookmark[];
  export let SITE_SUBTITLE;
  export let SITE_SUBTITLE2;

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
        <h1>{SITE_TITLE}</h1>
        {#if SITE_SUBTITLE}
          <h2><span style="font-size: 0.8em;">🔥🔥🔥</span><br />{SITE_SUBTITLE}</h2>
        {/if}
        {#if SITE_SUBTITLE2}
          <h3>{SITE_SUBTITLE2}</h3>
        {/if}
        <HomeHero titles={novelTitles} {novelList} {novelsMetadata} grid={"novels"} />
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
        ><path
          fill="var(--hero-bg)"
          fill-opacity="1"
          d="M0,224L40,224C80,224,160,224,240,192C320,160,400,96,480,69.3C560,43,640,53,720,69.3C800,85,880,107,960,144C1040,181,1120,235,1200,224C1280,213,1360,139,1400,101.3L1440,64L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        /></svg
      >
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
