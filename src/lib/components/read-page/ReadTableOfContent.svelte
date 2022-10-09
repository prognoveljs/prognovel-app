<script lang="ts">
  import { onMount, onDestroy, tick, createEventDispatcher } from "svelte";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { fly, fade } from "svelte/transition";
  import { currentNovel, novelsData } from "$lib/store/states";
  import { windowLock, windowUnlock } from "$lib/utils/window/lock";
  import { isMobileScreen } from "$lib/utils/mobile";
  import { getCoverURLPath } from "$lib/utils/images";
  import { chaptersWithSpoiler, chapterTitles, showTOC } from "$lib/store/read-page/state";
  import { chaptersLoaded, toc } from "$lib/store/read-page/vars";
  import { getChapterStoreKey } from "$lib/utils/read-page/navigation";

  let width = 400;
  let body;
  // export let page;
  const dispatch = createEventDispatcher();

  // TODO - force max width on mobile screen when setting transition {{ x }}
  const transition = {
    In: () => {
      const duration = 625 * (isMobileScreen() ? 0.7 : 1);
      const x = width * (isMobileScreen() ? -1 : 1);
      console.log(duration, x);
      return {
        duration,
        opacity: 1,
        x,
        easing: cubicOut,
      };
    },
    Out: () => {
      const duration = 325 * (isMobileScreen() ? 0.7 : 1);
      const x = width * (isMobileScreen() ? -1 : 1);
      console.log(duration, x);
      return {
        duration,
        opacity: 1,
        x,
        easing: cubicIn,
      };
    },
  };

  $: title = $novelsData[$currentNovel] ? $novelsData[$currentNovel].title : "";
  $: author = $novelsData[$currentNovel] ? $novelsData[$currentNovel].author : "";

  const close = () => {
    dispatch("close");
  };

  onMount(async () => {
    windowLock();

    await tick();
  });
  onDestroy(windowUnlock);

  function isSpoiler(volumeAndChapter: string) {
    const [book, chapter] = volumeAndChapter.split("/");
    return (
      Boolean($chaptersLoaded?.[getChapterStoreKey($currentNovel, book, chapter)]?.spoiler) ||
      chaptersWithSpoiler.has(`${$currentNovel}/${volumeAndChapter}`)
    );
  }
</script>

<div
  class="overlay"
  in:fade={{ duration: 455, easing: cubicOut }}
  out:fade={{ duration: 425, easing: cubicIn }}
  on:click={close}
/>

<article
  bind:this={body}
  in:fly={transition.In()}
  out:fly={transition.Out()}
  style="width: {width}px"
>
  <section class="header">
    <img
      width="64"
      height="64"
      src={getCoverURLPath($currentNovel, { width: 64, height: 64 })}
      alt={title}
    />
    <div class="meta">
      <strong>{title}</strong>
      <em>a novel by {author}</em>
    </div>
  </section>
  <section class="body">
    {#each $toc as chapter}
      <a
        on:click={() => ($showTOC = false)}
        href={`/read/${$currentNovel}/${chapter}`}
        id={chapter.replace("/", "-")}
      >
        <div>
          Chapter
          {chapter.split("/")[1].slice(8).replace("-", ".")}
          {#if $chapterTitles && $chapterTitles[$currentNovel]}
            <span class:spoiler={isSpoiler(chapter)}
              >{$chapterTitles[$currentNovel][chapter.split("/")[0]][chapter.split("/")[1]]}</span
            >
          {:else}<span>Loading...</span>{/if}
        </div>
      </a>
    {/each}
  </section>
</article>

<style lang="scss">
  $zIndex: 498;
  $a: 0.44;

  article {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
    grid-template-areas: "head" "body";
    background: #333;
    position: fixed;
    top: var(--header-height);
    height: calc(100vh - var(--header-height));
    width: var(--sidebar-width, 400px);
    right: 0;
    border-left: 2px solid hsla($h, $s, $l, $a);
    z-index: $zIndex;
    max-width: 80vw;
    // position: relative;

    .header {
      position: relative;
      grid-area: head;
      display: flex;
      gap: 1em;
      box-shadow: 0 4px 12px #0005;

      .meta {
        display: flex;
        justify-content: center;
        flex-direction: column;
        strong {
          font-size: 1.25em;
          color: var(--primary-color);
          display: block;
          line-height: 1.2;
        }

        em {
          line-height: 1.2;
        }
      }
    }

    .body {
      position: relative;
      overflow-y: scroll;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
      height: 100%;
      grid-area: body;

      &::-webkit-scrollbar {
        display: none;
      }
    }

    a {
      width: 100%;
      padding: 12px;
      background-color: #0002;
      cursor: pointer;
      user-select: none;
      font-weight: 500;
      position: relative;
      display: block;
      text-decoration: none;

      div {
        transition: transform 0.125s ease-in-out;
      }

      &::after {
        --size: 12px;
        content: "";
        position: absolute;
        top: calc(50% - (var(--size) / 2));
        left: calc(var(--size) / -2);
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        background-color: hsla($h, $s, $l, 1);
        transform: scale(0);
        transition: transform 0.175s ease-in-out;
      }

      &:hover {
        background-color: #0004;
        color: hsla($h, $s, $l, 0.82);

        div {
          transform: translateX(4px);
        }

        span {
          font-style: italic;
        }

        &::after {
          transform: scale(1);
        }
      }

      span {
        display: block;
        position: relative;
        font-weight: 300;
        color: var(--text-body-color) !important;
        width: fit-content;
        overflow: hidden;

        &.spoiler {
          &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            transition: all 0.2s ease-in-out;
            inset: 0;
            background-color: #fff2;
            backdrop-filter: blur(4px);
          }

          &:hover {
            &::after {
              transform: translateX(-100%);
            }
          }
        }
      }

      &:visited {
        opacity: 0.7;
      }
    }
    @include screen("mobile") {
      border-left: none;
      border-right: 2px solid hsla($h, $s, $l, $a);
      top: 0;
      left: 0;
      right: none;
      height: calc(100vh - var(--mobile-menu-height));
    }
  }

  .overlay {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-color: #000a;
    z-index: $zIndex - 1;
    top: 0;
    left: 0;
  }
</style>
