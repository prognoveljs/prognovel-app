<script lang="ts">
  import { siteMetadata } from "$lib/store/states";
  import { novelCoverSubtitle, novelList, novelTitles } from "$lib/utils/novel-page";
  import { NOVEL_COVER_WIDTH, NOVEL_COVER_HEIGHT } from "$lib/_setting";
  import Cover from "$lib/components/BookCover.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

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
      aria-label={novelTitles[novel]}
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

<style lang="scss">
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

      &:active {
        outline: none;
        transform: translateY(0);
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
  }
</style>
