<script context="module" lang="ts">
  import { getLocalNovelMetadataCache, fetchNovelMetadata } from "$lib/utils/fetch-metadata";
  import { getCoverURLPath, prefetchBannerImage } from "$lib/utils/images";
  import { isBrowser } from "$lib/store/states";

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params }) {
    const { novel } = params;
    let data: any = {};
    let url;

    url = `/publish/${novel}/metadata.json`;
    if (isBrowser) {
      prefetchBannerImage(novel);
      data = await getLocalNovelMetadataCache(novel);

      if (!data) {
        data = await fetchNovelMetadata(novel);
        data.fresh = true;
      }
      data.status = 200;
    } else {
      const path = await import("path");
      const fs = await import("fs");
      console.log(novel);
      url = `.cache/assets/publish/${novel}/metadata.json`;
      try {
        data = JSON.parse(fs.readFileSync(url, "utf-8"));
        data.status = 200;
      } catch (error) {
        data.status = 500;
        data.message = "Error when reading " + novel + " metadata from build cache.";
        console.error(error);
      }
    }

    if (data.status === 200) {
      return { status: data.status, props: { novelMetadata: data, id: novel } };
    } else {
      return {
        error: data.message,
        status: data.status,
      };
    }
  }
</script>

<script lang="ts">
  import { setContext } from "svelte";
  // import { novels } from "../../mock";
  import { fetchSuggestions } from "./_suggestions";
  import { page } from "$app/stores";
  import InstantAffiliate from "$lib/components/web-monetization/InstantAffiliate.svelte";
  import Banner from "./_NovelBanner.svelte";
  import Book from "./_NovelBook.svelte";
  import Affiliate from "$lib/components/novel-page/Affiliate.svelte";
  import RevenueSharingStats from "$lib/components/novel-page/RevenueSharingStats.svelte";
  import { toc, chaptersLoaded } from "$lib/store/read-page";
  import { getChapterStoreKey, prefetchChapter } from "$lib/utils/read-page";
  import type { NovelMetadata } from "$typings";

  export let id;
  export let novelMetadata: NovelMetadata;
  let affiliate = $page.url.searchParams.get("affiliate") || "";
  let affiliateName = $page.url.searchParams.get("affiliateName") || "";

  setContext("id", id);
  setContext("novelMetadata", novelMetadata);

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
    return import.meta.env.URL || import.meta.env.VERCEL_URL || "";
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

<Banner />
<Book />

<RevenueSharingStats />
<Affiliate {affiliate} {affiliateName} title={novelMetadata.title || ""} />
<InstantAffiliate title={novelMetadata.title} />

<style lang="scss">
</style>
