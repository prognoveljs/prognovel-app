<script lang="ts">
  import Icon from "$lib/components/Icon.svelte";
  import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
  import { novelTitles } from "$lib/utils/novel-page";
  import {
    getBreadcrumbSegments,
    getBreadcrumbParentLabel,
    getPreviousBreadcrumbLink,
    getPreviousPageOnMobile,
  } from "$lib/utils/navigation";
  import { tick } from "svelte";
  import { currentNovel, siteMetadata } from "$lib/store/states";
  import {
    customBreadcrubChildren,
    customBreadcrumbTitle,
  } from "$lib/utils/navigation/custom-title";
  import { path } from "$lib/store/states";
  import { browser } from "$app/environment";
  import { chaptersAppended } from "$lib/store/read-page/state";
  import { currentChapter, currentChapterTitle } from "$lib/store/read-page/vars";

  $: isAtReadPage = $path && $path.startsWith("/read");
  $: segments = $path ? getBreadcrumbSegments($path) : [];

  let backButtonHref = "/"; // period means current relative url on sapper.
  $: if ($path && browser) {
    tick().then((r) => {
      getPreviousBreadcrumbLink().then((href) => (backButtonHref = href));
    });
  }

  function getPrevSegmentLink(prev: string, index: number) {
    return (
      $customBreadcrubChildren?.[prev]?.href ||
      `/${segments.filter((s) => segments.indexOf(s) <= index).join("/")}/`
    );
  }
</script>

{#key $siteMetadata}
  <section id="breadcrumb">
    <a
      id="back-button"
      href={backButtonHref}
      aria-label="back to home"
      on:click={getPreviousPageOnMobile}
    >
      <Icon icon={faChevronLeft} size={"1.5em"} />
    </a>

    {#each segments as segment, i}
      <!-- on general pages -->
      {#if !isAtReadPage}
        {#if i + 1 < segments.length}
          <a href={getPrevSegmentLink(segment, i)} sveltekit:prefetch
            >{getBreadcrumbParentLabel(segment)}</a
          >
        {:else if segments[0] === "/novel" && i !== 0}
          <span class:single={segments.length === 1}>{novelTitles[segment]}</span>
        {:else}
          <span class:single={segments.length === 1}
            >{$customBreadcrumbTitle || getBreadcrumbParentLabel(segment)}</span
          >
        {/if}
      {/if}

      {#if isAtReadPage}
        <!-- on read page -->
        {#if i === 0}
          <a href={"/novel/" + $currentNovel} sveltekit:prefetch>{novelTitles[$currentNovel]}</a>
        {:else if i === segments.length - 1}
          <span class:single={segments.length === 1}>
            Chapter
            {$currentChapter.slice(8).replace("-", ".") || "..."}
          </span>
          {#if $currentChapterTitle}
            <!-- TODO make this sync with chapter title in the read page -->
            {#key $chaptersAppended}<span class="chapter-title">{$currentChapterTitle}</span>{/key}
          {/if}
        {/if}
      {/if}
    {/each}
  </section>
{/key}

<style lang="scss">
  $segmentPadding: 0 12px;

  #breadcrumb {
    display: flex;
    align-items: center;
    // position: absolute;
    // bottom: 0;
    // left: 0;
    height: var(--header-height);
    user-select: none;
    overflow: hidden;
    -webkit-app-region: no-drag;
    app-region: no-drag;

    * {
      white-space: nowrap;
    }

    a {
      margin: 0;
      padding: 0;
      height: var(--header-height);
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      opacity: 0.85;

      // left arrow go back button
      &:first-of-type {
        position: absolute;
        bottom: 1px;
        left: -8px;
        width: var(--sidebar-width);
        min-width: 64px;
      }

      // start of breadcrumb
      &:nth-of-type(2) {
        margin-left: var(--header-height);
      }

      &:not(:first-of-type) {
        padding: $segmentPadding;
      }

      &:hover {
        opacity: 1;
      }
    }

    span {
      padding: $segmentPadding;
      color: var(--primary-color);
      font-weight: 700;

      &.single {
        margin-left: var(--header-height);
      }

      &.chapter-title {
        display: block;
        font-weight: 300;
        padding: 24px;
        border-left: 1px solid #0004;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 50%;

        filter: contrast(70%);
      }
    }
  }

  @include screen("mobile") {
    #breadcrumb {
      span {
        display: none;
      }
      a {
        display: none;

        &:first-of-type {
          display: flex;
          left: 0;
          height: var(--header-height);
          width: var(--header-height);
        }
      }
    }
  }
</style>
