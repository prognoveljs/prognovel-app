<script context="module" lang="ts">
  import { getLocalNovelMetadataCache, fetchNovelMetadata } from "$lib/utils/fetch-metadata";
  import { getCoverURLPath, prefetchBannerImage } from "$lib/utils/images";
  import { isBrowser } from "$lib/store/states";

  export const prerender = true;

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params, fetch }) {
    const { novel } = params;
    let novelMetadata: any = {};
    let status = 200;
    let message = "";
    try {
      const res = await fetch(`/novel/${novel}.json`);
      novelMetadata = await res.json();
    } catch (error) {
      status = 500;
      message = "Error when reading " + novel + " metadata from build cache.";
      console.error(error);
    }

    if (browser) {
      prefetchBannerImage(novel);
      novelMetadata = await getLocalNovelMetadataCache(novel);

      if (!novelMetadata) {
        novelMetadata = await fetchNovelMetadata(novel);
      }
    }

    if (status === 200) {
      return { status, props: { novelMetadata, novel } };
    }

    return {
      error: message,
      status,
    };
  }
</script>

<script lang="ts">
  import { setContext } from "svelte";
  import InstantAffiliate from "$lib/components/web-monetization/InstantAffiliate.svelte";
  import Banner from "./_NovelBanner.svelte";
  import Book from "./_NovelBook.svelte";
  import Affiliate from "$lib/components/novel-page/Affiliate.svelte";
  import RevenueSharingStats from "$lib/components/novel-page/RevenueSharingStats.svelte";
  import { toc, chaptersLoaded } from "$lib/store/read-page";
  import { getChapterStoreKey, prefetchChapter } from "$lib/utils/read-page";
  import type { NovelMetadata } from "$typings";
  import { browser } from "$app/env";
  import { novelDemographics, novelGenres } from "$lib/utils/novel-page";
  import { SITE_TITLE } from "$lib/_setting";
  // import { isBrowser } from "$lib/store/states";

  export let novel;
  export let novelMetadata: NovelMetadata;
  let affiliate = isBrowser ? new URL(location.href).searchParams.get("affiliate") || "" : "";
  let affiliateName = isBrowser
    ? new URL(location.href).searchParams.get("affiliateName") || ""
    : "";

  setContext("id", novel);
  setContext("novelMetadata", novelMetadata);

  toc.subscribe((chapterList) => {
    // TODO - use recent novel history
    const destinationChapter = chapterList[0];
    if (typeof destinationChapter === "string") {
      const [book, chapter] = destinationChapter.split("/");
      const key = getChapterStoreKey(novel, book, chapter);

      if ($chaptersLoaded[key]) return;
      prefetchChapter(novel, book, chapter);
    }
  });

  function getSiteURL(): string {
    if (this && this.location) return new URL(this.location).origin;
    return import.meta.env.URL || import.meta.env.VERCEL_URL || "";
  }

  const bottomBackground = `background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,0)'/><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'  stroke-width='1' stroke='none' fill='hsla(258.5,59.4%,59.4%,1)'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")`;
  const { primaryColorHue, primaryColorSaturate, primaryColorLight } = import.meta.env
    .CSS_VARIABLES;
  $: bgColor = `hsl(${primaryColorHue},${primaryColorSaturate},${primaryColorLight})`;
  $: console.log("Background color", bgColor);
</script>

<svelte:head>
  <title
    >{novelMetadata
      ? `${novelMetadata.title} | ${SITE_TITLE}`
      : "Loading... | " + SITE_TITLE}</title
  >
  <meta property="og:title" content={novelMetadata.title} />
  <meta property="og:type" content="book" />
  <meta property="og:book:author" content={novelMetadata.author} />
  <meta
    property="og:book:tag"
    content={[novelDemographics[novel], ...novelGenres[novel]].join(", ")}
  />
  <meta
    property="og:image"
    content={getSiteURL() + getCoverURLPath(novel, { height: 256, width: 256 }, "jpeg")}
  />
</svelte:head>

<Banner />
<Book />

<RevenueSharingStats />
<Affiliate {affiliate} {affiliateName} title={novelMetadata.title || ""} />
<InstantAffiliate title={novelMetadata.title} />

<div class="bg_bottom" style={bottomBackground.replace("hsla(258.5,59.4%,59.4%,1)", bgColor)} />

<style lang="scss">
  .bg_bottom {
    width: 100%;
    height: 750px;
    position: absolute;
    bottom: 0;
    z-index: -1;
    opacity: 0.2;

    &::after {
      content: "";
      background-image: linear-gradient(
        to bottom,
        var(--background-color),
        var(--background-color-alpha)
      );
      width: 100%;
      height: 70%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
