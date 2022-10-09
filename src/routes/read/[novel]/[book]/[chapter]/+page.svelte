<script lang="ts">
  import { onMount, tick, onDestroy } from "svelte";
  import { page } from "$app/stores";
  import Content from "$lib/components/read-page/content/ContentBody.svelte";
  import Options from "../../../_Options.svelte";
  import { currentNovel, novelsData } from "$lib/store/states";
  import // currentChapter,
  // currentBook,
  // currentContent,
  // toc,
  // chaptersAppended,
  "$lib/store/read-page";
  import { SITE_TITLE } from "$lib/_setting";
  import NativePlugins from "$lib/components/plugins/_NativePlugins.svelte";
  import TOC from "$lib/components/read-page/ReadTableOfContent.svelte";
  import InfiniteReadingEnd from "$lib/components/read-page/InfiniteReadingEnd.svelte";
  import InfiniteReadingNavigation from "$lib/components/read-page/InfiniteReadingNavigation.svelte";
  import {
    chaptersLoaded,
    currentBook,
    currentChapter,
    currentContent,
    toc,
  } from "$lib/store/read-page/vars";
  import { chaptersAppended, showTOC } from "$lib/store/read-page/state";
  import { infiniteLoading } from "$lib/store/read-page/navigation";
  import { enterPage, leavePage } from "$lib/utils/read-page/page";
  import {
    getChapterStoreKey,
    getNextChapter,
    setChapterCursor,
  } from "$lib/utils/read-page/navigation";
  import { prefetchChapter, prefetchNextChapter } from "$lib/utils/read-page/fetch-content";
  import { replacePageTitleBookAndChapter } from "$lib/utils/read-page/history";
  // import { prefetchNextChapter } from "$lib/utils/read-page/fetch-content";

  $: ({ novel, book, chapter } = $page.params);
  $: bookAndChapter = `${book}/${chapter}`;
  $: if ($novelsData[novel] && book && chapter) mountPage($page);
  $: activeChapter = [bookAndChapter];
  $: if (!$infiniteLoading) {
    activeChapter = [`${$currentBook}/${$currentChapter}`];
  }
  let infiniteReadingEnd = false;

  $: if (novel) $chaptersAppended = [];

  async function onChapterEndViewed(bookAndChapter: string) {
    if ($infiniteLoading) {
      const cursor = $toc.indexOf(bookAndChapter);
      if (cursor < $toc.length - 1) {
        const next = getNextChapter(cursor);
        const [nextBook, nextChapter] = next.split("/");
        if (!activeChapter.includes(next)) {
          activeChapter = [...activeChapter, next];
          prefetchChapter(novel, nextBook, nextChapter);
          // if (!$chaptersAppended[`${book}/${chapter}`]) {
          //   console.log("Fetch infinite loading chapter", book, chapter);
          // }
        }
      } else {
        infiniteReadingEnd = true;
      }
    }
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
  {#if infiniteReadingEnd}
    <InfiniteReadingEnd />
  {/if}
  <Options />
  <NativePlugins />
  {#if $infiniteLoading}
    <InfiniteReadingNavigation />
  {/if}
  {#if $showTOC}
    <TOC on:close={() => ($showTOC = false)} />
  {/if}
</div>

<style lang="scss">
  @import "../../../slug";
</style>
