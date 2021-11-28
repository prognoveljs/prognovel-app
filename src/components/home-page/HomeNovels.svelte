<script lang="ts">
  import { siteMetadata } from "store/states";
  import { getNovelCoverSubtitle, loadNovelTitles } from "utils/novel-page";
  import { NOVEL_COVER_WIDTH, NOVEL_COVER_HEIGHT } from "settings";
  import Cover from "components/BookCover.svelte";
  import type { NovelsMetadata } from "typings";

  export let grid;

  export let novelList: string[];
  export let novelsMetadata: NovelsMetadata;
  export let titles = {};

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
  <div class="demo-novels">demo novels 👇</div>
  <div
    class="grid"
    style="grid-template-columns: repeat(auto-fill, {NOVEL_COVER_WIDTH}px); grid-template-rows: {NOVEL_COVER_HEIGHT}px;"
  >
    {#each novelList as novel}
      <a
        data-cy="yashura"
        rel="prefetch"
        href="/novel/{novel}"
        class="novel"
        aria-label={novelsMetadata[novel] ? novelsMetadata[novel].title : novel}
        on:mouseover={onHover}
      >
        <Cover
          showTitle={true}
          showSub={true}
          sub={getNovelCoverSubtitle(novel, { novelsMetadata })}
          title={titles ? titles[novel] : novel}
          {novel}
        />
      </a>
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    margin-top: 72px;
  }
  .grid {
    display: grid;
    grid-gap: 32px 25px;

    @include screen("tablet") {
      justify-content: space-around;
    }

    @include screen("small-tablet") {
      grid-gap: 24px 16px;
    }
    @include screen("mobile") {
      grid-gap: 18px 12px;
    }
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

  .demo-novels {
    margin: 0;
    color: #fffd;
    margin-bottom: 8px;
    font-weight: 300;

    @include screen("tablet") {
      text-align: center;
    }
  }
</style>
