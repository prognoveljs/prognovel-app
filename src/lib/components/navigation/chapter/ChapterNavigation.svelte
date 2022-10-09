<script lang="ts">
  import { ArrowRightIcon, CornerUpLeftIcon, ListIcon, RefreshCwIcon } from "svelte-feather-icons";
  // import { chaptersLoaded, chaptersWithSpoiler, chapterTitles } from "$lib/store/read-page";
  import { fly } from "svelte/transition";
  import { replacePageTitleBookAndChapter } from "$lib/utils/read-page/history";
  import { cubicOut } from "svelte/easing";
  import { currentNovel } from "$lib/store/states";
  import { createEventDispatcher } from "svelte";
  import { chaptersLoaded } from "$lib/store/read-page/vars";
  import { chaptersWithSpoiler, chapterTitles } from "$lib/store/read-page/state";
  import { getChapterStoreKey } from "$lib/utils/read-page/navigation";

  export let backChapter = "";
  export let nextChapter = "";
  export let backButtonLabel = "Previous chapter";
  export let nextButtonLabel = "Begin reading";
  export let disabledNext = false;
  export let disabledBack = false;
  export let nextChapterLabel = "";
  export let hasLoading = false;
  export let nextButtonDisabledLabel = "Fetching info...";
  export let backButtonDisabledLabel = "Previous chapter";
  // export let spoiler = false;
  export let showChapterList = false;

  $: [volumeNext, chapterNext] = (nextChapter || "")
    .split("/")
    .filter((s) => !!s)
    .slice(-2);
  $: [volumeBack, chapterBack] = (backChapter || "")
    .split("/")
    .filter((s) => !!s)
    .slice(-2);
  $: spoiler =
    Boolean(
      $chaptersLoaded?.[getChapterStoreKey($currentNovel, volumeNext, chapterNext)]?.spoiler,
    ) || chaptersWithSpoiler.has(`${$currentNovel}/${volumeNext}/${chapterNext}`);

  $: nextChapterTitle = $chapterTitles?.[$currentNovel]?.[volumeNext]?.[chapterNext];
  const dispatch = createEventDispatcher();
  function onListClick() {
    dispatch("onlistclick");
  }
</script>

<div class="read-button-flex">
  <div class="links">
    {#if showChapterList}
      <button
        class="secondary-button"
        href="#chapter-list"
        on:click|preventDefault
        on:click={onListClick}
      >
        Chapter list
        <ListIcon size="21" />
      </button>
    {/if}
    {#if backChapter}
      <a
        in:fly={{ duration: 600, easing: cubicOut, opacity: 1, x: 3 }}
        class="secondary-button"
        href="/read/{$currentNovel}/{volumeBack}/{chapterBack}"
        disabled={disabledBack}
        class:disabled={disabledBack}
        >{!disabledBack ? backButtonLabel : backButtonDisabledLabel}
        <CornerUpLeftIcon size="21" />
      </a>
    {/if}
    <a
      href={nextChapter ? `/read/${$currentNovel}/${volumeNext}/${chapterNext}` : "/"}
      disabled={disabledNext}
      class:disabled={disabledNext || !nextChapterTitle}
      class:loading={disabledNext && hasLoading}
      >{!disabledNext ? nextButtonLabel : nextButtonDisabledLabel}
      {#if disabledNext && hasLoading}
        <RefreshCwIcon size="18" class="spin" />
      {:else}
        <ArrowRightIcon size="21" />
      {/if}
    </a>
    {#if nextChapterTitle && !disabledNext}
      <sub>
        <div in:fly={{ y: -4, duration: 200 }}>
          {nextChapterLabel}
          {replacePageTitleBookAndChapter(`${volumeNext}`, true)}, Chapter {(
            (chapterNext || "").split("chapter-")[1] || ""
          ).replace("-", ".")}
        </div>
        <em class:spoiler in:fly={{ y: -4, duration: 200, delay: 125 }}>{nextChapterTitle}</em>
      </sub>
    {/if}
  </div>
</div>

<style lang="scss">
  .read-button-flex {
    text-align: right;
    margin-top: var(--margin-top, 20px);
    justify-content: end;
    position: relative;

    .links {
      display: flex;
      gap: 0.5em;
      justify-content: end;
    }

    a,
    button {
      --bg-alpha: 1;
      --bg: hsla(var(--primary-color-h), 80%, 40%, var(--bg-alpha));
      margin: 0;
      font-size: 1em;
      width: var(--width, 180px);
      display: inline-block;
      text-align: left;
      cursor: pointer;
      padding: 8px 32px 8px 12px;
      border-radius: 4px;
      color: #fffc;
      background-color: var(--bg);
      border: 2px solid var(--bg);
      text-decoration: none;
      font-weight: 600;
      letter-spacing: -0.0275em;
      font-family: "IBM Plex Sans", "Helvetica Neue", Arial, sans-serif;

      transition: all 0.085s ease-out;
      position: relative;

      &:hover {
        text-decoration: underline;
      }

      &.secondary-button {
        --bg-alpha: 0.2;
        width: max-content;
        padding-right: 2.85em;
        transition: all 0.065s ease-out;

        &:hover {
          --bg-alpha: 0.4;
        }
      }

      :global(svg) {
        position: absolute;
        top: 50%;
        right: 8px;
        transform: translateY(-50%);
        margin-left: 12px;
        transition: all 0.132s ease-in-out;
        opacity: 0.7;
        color: #fff !important;
      }
    }

    a {
      &:not(.loading):not(.secondary-button)::before {
        --height: 20px;
        $size: 32px;
        $rad: calc(#{$size} / 2);
        content: "";
        width: $size;
        height: var(--height);
        border-radius: 0 0 $rad $rad;
        background-color: var(--primary-color);
        opacity: 0.25;
        bottom: 0;
        right: 2em;
        position: absolute;
        z-index: -1;
        transition: all 0.4s ease-in-out;
      }

      &:hover:not(.secondary-button) {
        color: #fff;
        background-color: hsl(var(--primary-color-h), 85%, 46%);
        border-color: var(--primary-color-lighten-3);
        // color: #000e;

        :global(svg) {
          opacity: 1;
          transform: translateY(-50%) translateX(2px);
        }

        & + sub {
          transform: translateY(-2px) translateZ(0);
        }

        &::before {
          transform: translateY(var(--height)) translateZ(0);
        }
      }

      &.disabled {
        filter: saturate(0.4);
        pointer-events: none;
        cursor: default;

        &::before {
          display: none !important;
        }

        &.loading {
          :global(svg) {
            animation: spin 4s infinite linear;
          }
        }
      }
    }

    sub {
      display: block;
      margin-top: 8px;
      text-align: right;
      position: absolute;
      bottom: calc(-100% - 0.86em);
      right: 0;
      transition: all 0.35s ease-in-out;
      backface-visibility: hidden;
      transform: translateZ(0);

      em {
        display: inline-block;
        line-height: 1;
        color: var(--primary-color-lighten-4);
        position: relative;
        padding: 2px;
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
              transform: translateY(-100%);
            }
          }
        }
      }

      @include screen("tablet") {
        display: none;
      }
    }

    @include screen("mobile") {
      display: none;
    }
  }

  @keyframes spin {
    from {
      transform: translateY(-50%) rotate(0deg);
    }
    to {
      transform: translateY(-50%) rotate(360deg);
    }
  }
</style>
