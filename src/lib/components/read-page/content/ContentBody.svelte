<script lang="ts">
  import Header from "./ContentHeader.svelte";
  import Footer from "./ContentFooter.svelte";
  import ErrorPlaceholder from "$lib/components/read-page/body/ReadBodyErrorPlaceholder.svelte";
  import AdsDelay from "$lib/components/read-page/ContentAdsDelay.svelte";
  import {
    currentContent,
    currentChapterIndex,
    toc,
    chaptersLoaded,
    currentBook,
    currentChapter,
  } from "$lib/store/read-page/vars";
  import { FONT_SIZE, LINE_HEIGHT, ChapterState } from "$lib/utils/read-page/vars";
  import { onMount, tick } from "svelte";
  import { readPageSettingsInit } from "$lib/utils/fonts";
  import {
    enablePremiumContent,
    isCurrentChapterLocked,
    isCurrentChapterMonetized,
  } from "$lib/utils/web-monetization";
  import { pannable } from "$lib/utils/actions";
  import HasReadLotsOfContents from "$lib/components/misc/promotion/HasReadLotsOfContents.svelte";
  import ChapterLock from "$lib/components/read-page/ChapterLock.svelte";
  import { colorizedBackground } from "$lib/utils/fonts/background-hue";
  import ReadPageSkeletonShell from "$lib/components/read-page/ReadPageSkeletonShell.svelte";
  import { onDestroy } from "svelte";
  import InfiniteReadingBound from "../InfiniteReadingBound.svelte";
  import Observer from "svelte-intersection-observer";
  import { chapterTitles, showTOC } from "$lib/store/read-page/state";
  import { infiniteLoading } from "$lib/store/read-page/navigation";
  import { getChapterStoreKey } from "$lib/utils/read-page/navigation";
  import { setNovelRecentHistory } from "$lib/utils/read-page/history";
  import {
    contentRenderer,
    createContentDelay,
    renderContentReady,
  } from "$lib/utils/read-page/render-content";

  export let bookAndChapterIndex: string = "";
  export let novel: string = "";
  let body: HTMLElement;
  // core
  // $: renderHTML($currentContent);
  $: [book, chapter] = bookAndChapterIndex.split("/");
  $: loadedContent = $chaptersLoaded?.[getChapterStoreKey(novel, book, chapter)];
  $: chapterStatus = loadedContent?.meta?.status;
  // ===================================================== \\
  // if valid content loaded, update global store          \\
  // for current content                                   \\
  $: if (loadedContent && !$infiniteLoading) {
    $currentContent = loadedContent;
    $isCurrentChapterMonetized = Boolean(loadedContent.monetization);
  }
  // ===================================================== \\
  $: isValidChapterLoaded =
    chapterStatus === ChapterState.Success && $toc.includes($currentChapterIndex);
  $: chapterTitle =
    $chapterTitles?.[novel]?.[book]?.[chapter] ||
    (loadedContent?.title ? loadedContent.title : "Loading...");

  // options
  // $: textRendering = $asyncTextRendering ? "auto" : "visible";
  function onChapterViewed() {
    if (!$infiniteLoading) return;
    console.log("👀 vieweing", book, chapter);
    $currentContent = loadedContent;
    $isCurrentChapterMonetized = Boolean(loadedContent.monetization);
    $currentBook = book;
    $currentChapter = chapter;
    setNovelRecentHistory(novel, `${book}/${chapter}`);
    history.pushState(null, null, `/read/${novel}/${book}/${chapter}/`);
  }

  $: contentDelay = isValidChapterLoaded
    ? tick().then(() => createContentDelay(novel, $currentChapterIndex))
    : Promise.resolve();
  onMount(readPageSettingsInit);

  $: locked = !$enablePremiumContent && $isCurrentChapterMonetized;

  onDestroy(() => {
    renderContentReady.update((pool) => {
      delete pool[`${novel}/${book}/${chapter}`];
      return pool;
    });
  });
</script>

<article
  id="chapter"
  class:colorizedbackground={$colorizedBackground}
  style="--fontSizeBase: {FONT_SIZE}px; --lineHeight: {LINE_HEIGHT};"
>
  <Header {book} {chapter} title={chapterTitle} on:toc={() => ($showTOC = true)} />

  <section class:monetized={locked}>
    <div bind:this={body} class="body">
      {#if isValidChapterLoaded}
        {#key $currentChapterIndex}
          {#await contentDelay}
            <AdsDelay on:click={() => (contentDelay = Promise.resolve())} />
          {:then}
            <Observer rootMargin="-60% 0px -40% 0px" element={body} on:intersect={onChapterViewed}>
              <div
                bind:this={body}
                id="chapter-state-success-{bookAndChapterIndex}"
                class="chapter-state-success"
                use:pannable={{ restrictY: true }}
                use:contentRenderer={{ novel, book, chapter, content: loadedContent }}
              />
            </Observer>
            {#if $infiniteLoading}
              <InfiniteReadingBound
                timer={200}
                once={true}
                {novel}
                {book}
                {chapter}
                on:chapterendviewed
              />
            {/if}
          {/await}
        {/key}
      {:else if chapterStatus === ChapterState.Error}
        <ErrorPlaceholder />
      {:else}
        <ReadPageSkeletonShell />
      {/if}
    </div>
    {#if locked}
      <ChapterLock />
    {/if}
  </section>

  <!-- <HasReadLotsOfContents /> -->
  <Footer on:toc={() => ($showTOC = true)} />
</article>

<style lang="scss">
  @import "../../../../routes/read/vars";

  #chapter {
    --fontResponsiveRatio: #{$fontResponsiveRatio};
    --fontCustomRatio: var(--readPageFontCustomRatio, #{$fontCustomRatio});
    --fontWeight: var(--readPageFontWeight, #{$fontWeight});
    --fontSize: #{$fontSize};
    --textWidth: #{$textWidth};
    --contentMaxWidth: #{$contentMaxWidth};
    --contentPadding: #{$contentPadding};
    --fontFamily: Garamond;
    background-color: var(--background-color);
    filter: contrast(var(--readPageColorContrast, 1));
    padding-bottom: 3em;

    &.colorizedbackground {
      background-color: hsl(var(--readPageColorHue, 15), 25%, 15%);
    }

    section {
      position: relative;
    }

    @include screen("mobile") {
      --contentPadding: #{$contentPaddingMobile};
    }

    @include screen("desktop") {
      --fontResponsiveRatio: 1.15;
    }

    @include screen("large-desktop") {
      --fontResponsiveRatio: 1.3;
    }
  }

  .body {
    $minHeightMinus: 500px;
    contain: content;
    overflow: hidden;
    min-height: calc(100vh - #{$minHeightMinus});

    :global(section),
    :global(p) {
      max-width: var(--contentMaxWidth);
      margin-right: auto;
      margin-left: auto;
      padding: var(--contentPadding, 0);
    }

    :global(.chapter-state-success > p) {
      font-family: var(--fontFamily);
      font-size: calc(var(--fontSize));
      font-weight: calc(400 * var(--fontWeight));
    }

    :global(h1) {
      font-weight: calc(600 * var(--fontWeight));
    }

    :global(hr) {
      width: 125px;
      margin: 48px auto 76px;
    }
  }

  .monetized {
    --locked-height: 500px;
    overflow: hidden;

    .body {
      max-height: var(--locked-height);
      overflow: hidden;
    }
  }
</style>
