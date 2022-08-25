<script context="module" lang="ts">
  import { checkTableOfContentExists, getNextChapter, prefetchChapter } from "$lib/utils/read-page";
  export const prerender = false;

  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params }) {
    const { novel, book, chapter } = params;
    if (isBrowser) {
      checkTableOfContentExists(novel);
      prefetchChapter(novel, book, chapter).then((_) => {
        prefetchNextChapter();
        // prefetch((document.querySelector("a.next-link") as HTMLAnchorElement).href);
      });
    }

    return {};
  }
</script>

<script lang="ts">
  import { onMount, tick, onDestroy } from "svelte";
  import { page } from "$app/stores";
  import {
    leavePage,
    enterPage,
    setChapterCursor,
    prefetchNextChapter,
  } from "$lib/utils/read-page";
  import Content from "$lib/components/read-page/content/ContentBody.svelte";
  import Options from "../../_Options.svelte";
  import { currentNovel, novelsData, isBrowser } from "$lib/store/states";
  import { currentChapter, currentBook, currentContent, toc } from "$lib/store/read-page";
  import { replacePageTitleBookAndChapter } from "$lib/utils/read-page";
  import { SITE_TITLE } from "$lib/_setting";
  import NativePlugins from "$lib/components/plugins/_NativePlugins.svelte";
  import { showTOC, infiniteLoading } from "$lib/store/read-page";
  import TOC from "$lib/components/read-page/ReadTableOfContent.svelte";
  // import { prefetchNextChapter } from "$lib/utils/read-page/fetch-content";

  $: novel = $page.params.novel;
  $: book = $page.params.book;
  $: chapter = $page.params.chapter;
  $: bookAndChapter = `${book}/${chapter}`;
  $: activeChapter = [bookAndChapter];
  $: if ($novelsData[novel] && book && chapter) mountPage($page);

  function onChapterEndViewed(bookAndChapter: string) {
    if ($infiniteLoading) {
      const cursor = $toc.indexOf(bookAndChapter);
      const next = getNextChapter(cursor);
      console.log("Next chapter is", next);
    }

    console.log("Chapter end viewed");
  }

  let currentPage;
  function mountPage(page, soft = false) {
    if (currentPage === JSON.stringify(page)) return;
    currentPage = JSON.stringify(page);

    if (!page.url.pathname.startsWith("/read/")) return tick().then(() => mountPage(page));
    if (!novel || !book || !chapter) return tick().then(() => mountPage(page));
    // [novel, chapter] = parseSlug(page.params.slug);
    const slug = page.params;
    $currentNovel = novel = slug.novel;
    $currentBook = book = slug.book;
    $currentChapter = chapter = slug.chapter;
    setChapterCursor(novel, book, chapter);

    tick().then(() => {
      tick()
        .then(_afterPageMount)
        .catch((err) => {
          console.error("Error after mounting", novel, "chapter", chapter + ".");
          console.error(err);
        });
    });

    function _afterPageMount() {
      prefetchNextChapter();
    }
  }

  onMount(async () => {
    enterPage();
  });

  onDestroy(leavePage);

  function keyboardPressNavigation(e) {
    switch (e.key) {
      case "ArrowRight":
        document.getElementById("next-chapter").click();
        break;
      case "ArrowLeft":
        document.getElementById("prev-chapter").click();
        break;
      default:
        break;
    }
  }
</script>

<svelte:window on:keyup={keyboardPressNavigation} />

<svelte:head>
  <title>
    {$novelsData[novel]
      ? `${$novelsData[novel].title} ${replacePageTitleBookAndChapter(
          $currentBook,
        )}: chapter ${$currentChapter.slice(8).replace("-", ".")} - ${
          $currentContent.title
        } | ${SITE_TITLE}`
      : "Loading... | " + SITE_TITLE}
  </title>
</svelte:head>

<div class="body">
  {#each activeChapter as bookAndChapterIndex}
    <!-- content here -->
    <div class="content">
      <Content
        {novel}
        {bookAndChapterIndex}
        on:chapterendviewed={() => onChapterEndViewed(bookAndChapterIndex)}
      />
    </div>
  {/each}
  <!-- <div class="content">
    <Content {novel} book="volume-1" chapter="chapter-2" />
  </div> -->
  <Options />
  <NativePlugins />
  <!-- <Comments /> -->
  {#if $showTOC}
    <TOC on:close={() => ($showTOC = false)} />
  {/if}
</div>

<style lang="scss">
  @import "../../slug";
</style>
