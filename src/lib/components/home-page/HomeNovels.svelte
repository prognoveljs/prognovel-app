<script lang="ts">
  import { siteMetadata } from "$lib/store/states";
  import { novelCoverSubtitle, novelList, novelTitles } from "$lib/utils/novel-page";
  import { NOVEL_COVER_WIDTH, NOVEL_COVER_HEIGHT } from "$lib/_setting";
  import Cover from "$lib/components/BookCover.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
  import type { NovelsMetadata } from "$typings";

  export let grid;

  export let novelsMetadata: NovelsMetadata;
  // export let novelList: string[];
  // export let titles = {};

  const MAX_NOVEL_LISTED = 6;

  const novelListMock = Array(10).fill("yashura-legacy");

  let willChange = "transform, box-shadow";

  function removeWillChange() {
    willChange = "auto";

    const novels = document.querySelectorAll("a.novel");
    novels.forEach((novel: HTMLElement) => {
      novel.style.willChange = willChange;
    });
  }

  const onHover = () => {
    if (willChange === "auto") removeWillChange();
  };
</script>

<div class="container" style="grid-area: {grid}; min-height: {NOVEL_COVER_HEIGHT + 50}px;">
  <div class="horizontal-line" />
  <h2>
    <div>🌟</div>
    Browse<br /> our novels
  </h2>
  <div
    class="grid"
    style="grid-template-columns: repeat(auto-fill, {NOVEL_COVER_WIDTH}px); grid-template-rows: {NOVEL_COVER_HEIGHT}px;"
  >
    {#each novelList.slice(0, MAX_NOVEL_LISTED) as novel}
      <a
        data-cy="yashura"
        sveltekit:prefetch
        href="/novel/{novel}"
        class="novel"
        aria-label={novelsMetadata[novel] ? novelsMetadata[novel].title : novel}
        on:mouseover={onHover}
        on:focus
      >
        <Cover
          showTitle={true}
          showSub={true}
          sub={$novelCoverSubtitle[novel]}
          title={novelTitles[novel]}
          {novel}
        />
      </a>
    {/each}
  </div>
  {#if novelList.length > MAX_NOVEL_LISTED}
    <div class="flex">
      <a class="see-all" href="/novel"
        >see all
        <Icon icon={faChevronRight} size="1.25em" paddingBottom="3px" marginLeft="4px" />
      </a>
    </div>
  {/if}
</div>

<style lang="scss">
  .container {
    margin-top: 5em;
    padding-top: 3em;
    // background-color: #0002;
    position: relative;

    h2 {
      line-height: 0.9;
      padding-bottom: 0.5em;
      margin-bottom: 0.8em;
      opacity: 0.7;

      div {
        margin-bottom: 0.4em;
      }

      position: relative;
      z-index: 2;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 2em;
        height: 4px;
        background-color: var(--primary-color);
        opacity: 0.7;
      }
    }

    .grid {
      display: grid;
      grid-gap: 32px 25px;
      justify-content: space-between;

      @include screen("tablet") {
        justify-content: space-around;
      }

      @include screen("small-tablet") {
        grid-gap: 24px 16px;
      }
      @include screen("mobile") {
        grid-gap: 18px 12px;
      }

      .novel {
        background-color: #fff1;
        border-radius: 4px;
        box-shadow: 0 2px 18px 4px #0001, 0 4px 12px #0002;
        cursor: pointer;
        overflow: hidden;
        contain: content;
        position: relative;

        will-change: box-shadow;
        border: 2px solid transparent;
        transition: box-shadow 0.225s ease-in-out;

        &:hover:not(span),
        &:focus {
          // transform: translateY(-2px);
          border-color: var(--primary-color);
          box-shadow: 0 4px 24px 8px #0002, 0 6px 16px #0003;
        }

        // &:focus {
        //   outline: none;
        // }

        &:active {
          outline: none;
          transform: translateY(0);
        }
      }
    }

    .flex {
      display: flex;
      justify-content: flex-end;
      .see-all {
        width: auto;
        display: inline-block;
        margin-top: 1em;
        background-color: #fff3;
        border-radius: calc(1em + 4px);
        padding: 4px 16px;
        padding-right: 12px;
        text-decoration-skip-ink: none;
        text-decoration-thickness: 4px;
        text-underline-offset: -4px;
        text-decoration-color: hsla(#{$h}, 79%, 73%, 0.6);

        :global(svg) {
          opacity: 0.8;
          transition: transform 0.125s ease-in-out;
        }

        &:hover {
          background-color: #fff5;
          :global(svg) {
            opacity: 1;
            transform: translateX(2px);
          }
        }
      }
    }

    &::before {
      content: "";
      position: absolute;
      width: 500%;
      height: 500px;
      background-color: var(--background-color);
      top: 2px;
      left: -200%;
      opacity: 0.6;
    }
    &::after {
      content: "";
      position: absolute;
      width: 500%;
      height: 100px;
      background: linear-gradient(to bottom, #0002 20%, #0000);
      top: 2px;
      left: -200%;
      opacity: 0.6;
    }
  }

  .horizontal-line {
    position: absolute;
    width: 180%;
    left: -40%;
    top: 0;
    height: 2px;
    background: linear-gradient(to right, #fff0, #fff7, #fff0);
  }
</style>
