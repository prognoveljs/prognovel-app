<script context="module">
  import { checkTableOfContentExists, prefetchChapter } from "utils/read-page";
  export async function preload({ params }) {
    const { novel, book, chapter } = params;
    checkTableOfContentExists(novel);
    prefetchChapter(novel, book, chapter);
  }
</script>

<script lang="ts">
  import { onMount, tick, onDestroy } from "svelte";
  import { stores } from "@sapper/app";
  import { leavePage, enterPage, setChapterCursor, prefetchNextChapter } from "utils/read-page";
  import Content from "../../_ReadContent.svelte";
  import Options from "../../_Options.svelte";
  import { currentNovel, novelsData } from "store/states";
  import { fetchNovelMetadata } from "utils/fetch-metadata";
  import { currentChapter, currentBook, currentContent } from "src/store/read-page";
  import { replacePageTitleBookAndChapter } from "utils/read-page/history";
  // import { prefetchNextChapter } from "utils/read-page/fetch-content";

  let { page } = stores() as any;
  let { novel, book, chapter } = $page.params;
  $: if ($novelsData[novel] && book && chapter) mountPage($page);

  let currentPage;
  function mountPage(page) {
    if (currentPage === JSON.stringify(page)) return;
    currentPage = JSON.stringify(page);

    if (!page.path.startsWith("/read/")) return tick().then(() => mountPage(page));
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
</script>

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
  @import "../../_slug.scss";
</style>
