<script lang="ts">
  import Header from "./_ReadContentHeader.svelte";
  import Footer from "./_ReadContentFooter.svelte";
  import TOC from "$lib/components/read-page/ReadTableOfContent.svelte";
  import ErrorPlaceholder from "$lib/components/read-page/body/ReadBodyErrorPlaceholder.svelte";
  import NativePlugins from "./_NativePlugins.svelte";
  import AdsDelay from "$lib/components/read-page/ContentAdsDelay.svelte";
  import {
    currentContent,
    currentChapterIndex,
    toc,
    chaptersLoaded,
    chapterTitles,
  } from "$lib/store/read-page";
  import { FONT_SIZE, LINE_HEIGHT, ChapterState } from "$lib/utils/read-page/vars";
  import { getChapterStoreKey, getLoadingPlaceholder } from "$lib/utils/read-page";
  import { onMount, tick } from "svelte";
  import { readPageSettingsInit } from "$lib/utils/fonts";
  import {
    enablePremiumContent,
    isCurrentChapterLocked,
    isCurrentChapterMonetized,
  } from "$lib/utils/web-monetization";
  import { contentRenderer, createContentDelay } from "$lib/utils/read-page";
  import { pannable } from "$lib/utils/actions";
  import HasReadLotsOfContents from "$lib/components/misc/promotion/HasReadLotsOfContents.svelte";
  import ChapterLock from "$lib/components/read-page/ChapterLock.svelte";
  import { showTOC } from "$lib/store/read-page/read-page-state";
  import { colorizedBackground } from "$lib/utils/fonts/background-hue";
  import ReadPageSkeletonShell from "$lib/components/read-page/ReadPageSkeletonShell.svelte";
  export let novel: string;
  export let book: string;
  export let chapter: string;
  let body;
  // core
  // $: renderHTML($currentContent);
  $: loadedContent = $chaptersLoaded[getChapterStoreKey(novel, book, chapter)];
  $: chapterStatus = loadedContent?.meta?.status;
  // ===================================================== \\
  // if valid content loaded, update global store          \\
  // for current content                                   \\
  $: if (loadedContent) {
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

  $: contentDelay = isValidChapterLoaded
    ? tick().then(() => createContentDelay(novel, $currentChapterIndex))
    : Promise.resolve();
  onMount(readPageSettingsInit);

  $: locked = !$enablePremiumContent && $isCurrentChapterMonetized;
</script>

<article
  id="chapter"
  class:colorizedbackground={$colorizedBackground}
  style="--fontSizeBase: {FONT_SIZE}px; --lineHeight: {LINE_HEIGHT};"
>
  <Header title={chapterTitle} on:toc={() => ($showTOC = true)} />

  <section class:monetized={locked}>
    <div bind:this={body} class="body">
      {#if isValidChapterLoaded}
        {#key $currentChapterIndex}
          {#await contentDelay}
            <AdsDelay on:click={() => (contentDelay = Promise.resolve())} />
          {:then}
            <div id="chapter-placeholder-previous" />
            <div
              id="chapter-state-success"
              use:pannable={{ restrictY: true }}
              use:contentRenderer={{ novel, book, chapter, content: loadedContent }}
            />
            <div id="chapter-placeholder-next" />
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

<NativePlugins />

{#if $showTOC}
  <TOC on:close={() => ($showTOC = false)} />
{/if}

<style lang="scss">
  @import "vars";

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

    :global(#chapter-state-success > p) {
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
