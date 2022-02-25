<script context="module">
  import { checkTableOfContentExists, prefetchChapter } from "$lib/utils/read-page";
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params }) {
    const { novel, book, chapter } = params;
    if (isBrowser) {
      checkTableOfContentExists(novel);
      prefetchChapter(novel, book, chapter);
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
  import Content from "../../_ReadContent.svelte";
  import Options from "../../_Options.svelte";
  import { currentNovel, novelsData, isBrowser } from "$lib/store/states";
  import { fetchNovelMetadata } from "$lib/utils/fetch-metadata";
  import { currentChapter, currentBook, currentContent } from "$lib/store/read-page";
  import { replacePageTitleBookAndChapter } from "$lib/utils/read-page/history";
  // import { prefetchNextChapter } from "$lib/utils/read-page/fetch-content";

  let { novel, book, chapter } = $page.params;
  $: if ($novelsData[novel] && book && chapter) mountPage($page);

  let currentPage;
  function mountPage(page) {
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
        )}: chapter ${$currentChapter.slice(8).replace("-", ".")} - ${$currentContent.title}`
      : "Loading..."}
  </title>
</svelte:head>

<div class="body">
  <div class="content">
    <Content {novel} {book} {chapter} />
    <Options />
  </div>
  <!-- <Comments /> -->
</div>

<style lang="scss">
  @import "../../slug";
</style>
