<script lang="ts">
  import { chapterTitles } from "$lib/store/read-page/state";
  import { fly } from "svelte/transition";
  import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
  import Icon from "$lib/components/Icon.svelte";
  // import {
  //   disableNextChapter,
  //   disablePrevChapter,
  //   nextChapterLink,
  //   prevChapterLink,
  // } from "$lib/store/read-page";
  import { currentNovel } from "$lib/store/states";
  import { replacePageTitleBookAndChapter } from "$lib/utils/read-page/history";
  import {
    disableNextChapter,
    disablePrevChapter,
    nextChapterLink,
    prevChapterLink,
  } from "$lib/store/read-page/navigation";

  $: nextBookAndChapter = $nextChapterLink.split($currentNovel + "/")[1];
  $: nextBook = nextBookAndChapter.split("/")[0];
  $: nextChapter = nextBookAndChapter.split("/")[1];
  $: nextChapterTitle = $chapterTitles?.[$currentNovel]?.[nextBook]?.[nextChapter] || "Loading...";
</script>

<section class="navigation">
  <div in:fly={{ y: 50, duration: 600 }} out:fly={{ y: 50, duration: 300 }} class="overlay" />
  <div class="link-wrapper">
    <a
      class:disabled={$disablePrevChapter}
      href={$prevChapterLink}
      in:fly={{
        x: -8,
        duration: 425,
      }}
      out:fly={{
        x: -8,
        duration: 200,
      }}
      class="prev"
    >
      <Icon color="#fffe" icon={faChevronLeft} size="2.5em" />
    </a>
    <a
      class:disabled={$disableNextChapter}
      href={$nextChapterLink}
      in:fly={{
        x: 24,
        duration: 425,
      }}
      out:fly={{
        x: 24,
        duration: 200,
      }}
      class="next"
    >
      <strong>
        <Icon color="#fffe" paddingBottom="4px" icon={faChevronRight} size="1.4em" />
        {$disableNextChapter ? "LAST CHAPTER REACHED..." : "NEXT CHAPTER"}
      </strong>
      <em
        >({replacePageTitleBookAndChapter(nextBook, true) || "--"}, {replacePageTitleBookAndChapter(
          nextChapter,
          true,
        ) || "--"}) {nextChapterTitle}</em
      >
    </a>
  </div>
</section>

<style lang="scss">
  .navigation {
    position: fixed;
    left: 0;
    bottom: calc(var(--mobile-menu-height) + 0px);
    width: 100%;

    .link-wrapper {
      display: flex;
      gap: 5vw;
      align-items: center;
      max-width: 23em;
      margin: 0 auto;
      // background-color: red;
      a {
        z-index: 99999;
        text-decoration: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

        &.disabled {
          opacity: 0.8;
          pointer-events: none;
          filter: saturate(10%) grayscale(10%);

          em {
            filter: blur(1px);
          }
        }
      }

      .prev {
        padding: 12px;
        flex: 1;
      }

      .next {
        flex: 6;
        // max-width: 15em;

        strong {
          color: var(--primary-color);
          display: block;
        }

        em {
          font-weight: 300;
          opacity: 0.8;
          width: max-content;
        }
      }
    }

    .overlay {
      z-index: 0;
      position: absolute;
      width: 100%;
      height: 200px;
      left: 0;
      bottom: 0;
      background: linear-gradient(to top, #000a 20%, #0005, transparent);
    }
  }
</style>
