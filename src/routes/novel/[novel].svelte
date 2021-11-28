<script context="module" lang="ts">
  import { getLocalNovelMetadataCache, fetchNovelMetadata } from "utils/fetch-metadata";
  import { getCoverURLPath, prefetchBannerImage } from "utils/images";

  const __SAPPER__PRELOAD_INDEX = 2;
  let SLUG;

  export async function preload({ params, query }) {
    SLUG = params.novel;
    let data: any = {};
    let url;

    url = `/publish/${SLUG}/metadata.json`;
    if ((process as any).browser) {
      prefetchBannerImage(SLUG);
      data = await getLocalNovelMetadataCache(SLUG);

      if (!data) {
        data = await fetchNovelMetadata(SLUG);
        data.fresh = true;
      }
      data.status = 200;
    } else {
      const path = await import("path");
      const fs = await import("fs");
      url = process.env.CACHE_FOLDER + `/assets/publish/${SLUG}/metadata.json`;
      try {
        data = JSON.parse(fs.readFileSync(url, "utf-8"));
        data.status = 200;
      } catch (error) {
        data.status = 500;
        data.message = "Error when reading " + SLUG + " metadata from build cache.";
        console.error(error);
      }
    }

    if (data.status === 200) {
      return { novelMetadata: data, id: SLUG };
    } else {
      this.error(data.status, data.message);
    }
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  // import { novels } from "../../mock";
  import { fetchSuggestions } from "./_suggestions";
  import { stores } from "@sapper/app";
  import InstantAffiliate from "components/web-monetization/InstantAffiliate.svelte";
  import Banner from "./_NovelBanner.svelte";
  import Book from "./_NovelBook.svelte";
  import Affiliate from "components/novel-page/Affiliate.svelte";
  import RevenueSharingStats from "components/novel-page/RevenueSharingStats.svelte";
  import { toc, chaptersLoaded } from "store/read-page";
  import { getChapterStoreKey, prefetchChapter } from "utils/read-page";
  import type { NovelMetadata } from "typings";

  export let id;
  export let novelMetadata: NovelMetadata;
  const { page } = stores() as any;
  let affiliate = $page.query.affiliate || "";
  let affiliateName = $page.query.affiliateName || "";

  toc.subscribe((chapterList) => {
    // TODO - use recent novel history
    const destinationChapter = chapterList[0];
    if (typeof destinationChapter === "string") {
      const [book, chapter] = destinationChapter.split("/");
      const key = getChapterStoreKey(id, book, chapter);

      if ($chaptersLoaded[key]) return;
      prefetchChapter(id, book, chapter);
    }
  });

  function getSiteURL(): string {
    if (this && this.location) return new URL(this.location).origin;
    return process.env.URL || process.env.VERCEL_URL || "";
  }
</script>

<svelte:head>
  <title>{novelMetadata ? novelMetadata.title : "Loading..."}</title>
  <meta property="og:title" content={novelMetadata.title} />
  <meta property="og:type" content="book" />
  <meta property="og:book:author" content={novelMetadata.author} />
  <meta
    property="og:book:tag"
    content={[...novelMetadata.genre, ...novelMetadata.tags].join(", ")}
  />
  <meta
    property="og:image"
    content={getSiteURL() + getCoverURLPath(id, { height: 256, width: 256 }, "jpeg")}
  />
</svelte:head>

<Banner {novelMetadata} {id} />
<Book {novelMetadata} {id} title={novelMetadata.title} />

<RevenueSharingStats />
<Affiliate {affiliate} {affiliateName} title={novelMetadata.title || ""} />
<InstantAffiliate title={novelMetadata.title} />

<style lang="scss">
</style>
