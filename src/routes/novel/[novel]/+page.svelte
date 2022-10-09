<script lang="ts">
  import { setContext } from "svelte";
  import InstantAffiliate from "$lib/components/web-monetization/InstantAffiliate.svelte";
  import Banner from "../_NovelBanner.svelte";
  import Book from "../_NovelBook.svelte";
  import Affiliate from "$lib/components/novel-page/Affiliate.svelte";
  import RevenueSharingStats from "$lib/components/novel-page/RevenueSharingStats.svelte";
  import type { NovelMetadata } from "$typings";
  import { browser } from "$app/environment";
  import { novelDemographics, novelGenres } from "$lib/utils/novel-page";
  import { SITE_TITLE } from "$lib/_setting";
  import BackgroundPattern from "$lib/components/misc/BackgroundPattern.svelte";
  import { getCoverURLPath } from "$lib/utils/images";
  import { chaptersLoaded, toc } from "$lib/store/read-page/vars";
  import { getChapterStoreKey } from "$lib/utils/read-page/navigation";
  import { prefetchChapter } from "$lib/utils/read-page/fetch-content";

  export let data;

  $: novel = data.novel;
  $: novelMetadata = data.novelMetadata as NovelMetadata;
  let affiliate = browser ? new URL(location.href).searchParams.get("affiliate") || "" : "";
  let affiliateName = browser ? new URL(location.href).searchParams.get("affiliateName") || "" : "";

  $: if (novel) setContext("id", novel);
  $: if (novelMetadata) setContext("novelMetadata", novelMetadata);

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
<BackgroundPattern />

<style lang="scss">
</style>
