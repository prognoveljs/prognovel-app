<script lang="ts">
  import DescriptionInfo from "$lib/components/novel-page/DescriptionInfo.svelte";
  import { currentNovel, isBrowser } from "$lib/store/states";
  import { getContext } from "svelte";
  import type { NovelMetadata } from "$typings";
  import { ArrowRightIcon, CornerUpLeftIcon, RefreshCwIcon } from "svelte-feather-icons";
  import { chapterTitles, toc } from "$lib/store/read-page";
  import { fly } from "svelte/transition";
  import { replacePageTitleBookAndChapter } from "$lib/utils/read-page/history";
  import { handleBeginReadingButton, ReadNowObject } from "$lib/utils/novel-page";
  import { cubicIn, cubicOut } from "svelte/easing";

  let novelMetadata: NovelMetadata = getContext("novelMetadata");
  let showMore = false;
  let readLink = "";
  let lastReadAt = null;
  $: [volume, chapter] = (readLink || "")
    .split("/")
    .filter((s) => !!s)
    .slice(-2);
  $: readNowData = (
    $toc?.length ? handleBeginReadingButton($currentNovel) : Promise.resolve("")
  ) as Promise<ReadNowObject>;
  $: readNowData.then((data) => {
    if (typeof data?.link === "string") readLink = data?.link;
    lastReadAt = data?.lastReadAt;
  });
  $: isLinkReady = readLink && volume && chapter;
  $: height = showMore ? "auto" : "270px";
  $: disableLink = Boolean(!isBrowser || !isLinkReady);
  $: beginReadingTitle = $chapterTitles?.[$currentNovel]?.[volume]?.[chapter];
</script>

<article>
  <div class="header-wrapper">
    <h1 id="novel-title">{novelMetadata ? novelMetadata.title : "Loading..."}</h1>
  </div>
  <DescriptionInfo {novelMetadata} />
  <div class="novel-description" style="height: {height};" class:hideMore={!showMore}>
    {@html novelMetadata ? novelMetadata.synopsis : ""}
    {#if !showMore}<span class="show-more" on:click={() => (showMore = true)}>show more</span>{/if}
  </div>
  <div class="read-button-flex">
    <div class="links">
      {#if lastReadAt}
        <a
          in:fly={{ duration: 600, easing: cubicOut, opacity: 1, x: 3 }}
          class="first-chapter"
          href="/read/{$currentNovel}/{$toc[0]}"
          disabled={disableLink}
          >Read from first chapter
          <CornerUpLeftIcon size="21" />
        </a>
      {/if}
      <a
        href={readLink || "/"}
        disabled={disableLink}
        class:loading={disableLink || !beginReadingTitle}
        >{!disableLink ? (!lastReadAt ? "Begin reading" : "Continue reading") : "Fetching info..."}
        {#if disableLink}
          <RefreshCwIcon size="18" class="spin" />
        {:else}
          <ArrowRightIcon size="21" />
        {/if}
      </a>
    </div>
    {#if beginReadingTitle}
      <sub>
        <div in:fly={{ y: -4, duration: 200 }}>
          {lastReadAt ? "last read at" : "from"}
          {replacePageTitleBookAndChapter(`${volume}`, true)}, Chapter {(
            (chapter || "").split("chapter-")[1] || ""
          ).replace("-", ".")}
        </div>
        <em in:fly={{ y: -4, duration: 200, delay: 125 }}>{beginReadingTitle}</em>
      </sub>
    {/if}
  </div>
</article>

<style lang="scss">
  article {
    position: relative;
    grid-area: description;

    animation: 1s linear forwards progress;
    animation-timeline: desc-roll;
    padding-top: 56px;

    @include screen("mobile") {
      margin: {
        right: calc(var(--padding) * -1);
        left: calc(var(--padding) * -1);
      }
      padding: var(--padding);

      @supports (animation-timeline: works) {
        background: var(--foreground-color);
        box-shadow: 0 -4px 12px #0002, 0 -2px 4px #0005;
        @keyframes progress {
          from {
            transform: translateY(-100px);
          }

          to {
            transform: translateY(0);
          }
        }

        @scroll-timeline desc-roll {
          source: auto;
          orientation: vertical;
          scroll-offsets: 0%, 200px;
          time-range: 1s;
        }
      }
    }
  }

  .header-wrapper {
    position: relative;
    h1 {
      margin-top: 0;
      font-weight: 700;
      color: #fff;
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;

      @include screen("mobile") {
        position: relative;
      }
    }
  }

  .read-button-flex {
    text-align: right;
    margin-top: 20px;
    justify-content: end;
    position: relative;

    .links {
      display: flex;
      gap: 0.5em;
      justify-content: end;
    }

    a {
      --bg-alpha: 1;
      --bg: hsla(var(--primary-color-h), 80%, 40%, var(--bg-alpha));
      margin: 0;
      width: 180px;
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

      &.first-chapter {
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

      &:not(.loading):not(.first-chapter)::before {
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

      &:hover:not(.first-chapter) {
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
          div {
            // font-weight: 700;
          }
        }

        &::before {
          transform: translateY(var(--height)) translateZ(0);
        }
      }

      &[disabled="true"] {
        filter: saturate(0.4);
        pointer-events: none;
        cursor: default;

        :global(svg) {
          animation: spin 4s infinite linear;
        }
      }
    }

    sub {
      display: block;
      margin-top: 8px;
      text-align: right;
      position: absolute;
      right: 0;
      transition: all 0.35s ease-in-out;
      backface-visibility: hidden;
      transform: translateZ(0);

      div {
        // font-weight: 700;
      }

      em {
        display: block;
        line-height: 1;
        color: var(--primary-color-lighten-4);
      }

      @include screen("tablet") {
        display: none;
      }
    }

    @include screen("mobile") {
      display: none;
    }
  }

  .novel-description {
    overflow-y: hidden;
    position: relative;

    .show-more {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      position: absolute;
      width: 100%;
      height: 48px;
      bottom: 0;
      left: 0;
      color: var(--primary-color);
      text-align: center;
      padding-bottom: 6px;
      z-index: 5;
      cursor: pointer;
      opacity: 0.66;
      text-shadow: 0 0 4px var(--foreground-color);

      &:hover {
        opacity: 1;
      }

      @include screen("mobile") {
        font-size: 16px;
        padding-bottom: 16px;
      }
    }
  }

  .hideMore {
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 160px;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(
        to top,
        var(--background-color),
        var(--background-color-alpha)
      );
      border-bottom: 1.5px solid hsla(var(--primary-color-h), 55%, 44%, 1);
      @include screen("mobile") {
        @supports (animation-timeline: works) {
          background-image: linear-gradient(
            to top,
            var(--foreground-color),
            var(--foreground-color-alpha)
          );
        }
      }
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
