<script lang="ts">
  import { novelsData } from "$lib/store/states";
  import { getCoverURLPath } from "$lib/utils/images";
  import { getNovelCoverSubtitle, getNovelTitle } from "$lib/utils/novel-page";
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";
  import { goto } from "$app/navigation";

  const AUTO_NAVIGATE_DELAY = 5000;
  let cursor = 0;
  let container;
  let timer;
  let cachedSynopsis = {};
  $: highlightNovels = import.meta.env.NOVEL_LIST as string;
  $: novel_data = $novelsData?.[highlightNovels[cursor]]
    ? $novelsData
    : import.meta.env.NOVELS_METADATA;
  $: highlightData = novel_data[highlightNovels[cursor]];
  $: console.log(import.meta.env.NOVEL_LIST);

  $: if (highlightData?.synopsis && !cachedSynopsis[highlightNovels[cursor]]) {
    cachedSynopsis[cursor] = highlightData.synopsis;
  }

  onMount(() => {
    timer = setInterval(autoNavigate, AUTO_NAVIGATE_DELAY);
    return () => {
      clearInterval(timer);
    };
  });

  function removeOverflow() {
    // container.style.overflow = "auto";
  }

  function navigate(cr: number) {
    cursor = cr;
    clearInterval(timer);
    timer = setInterval(autoNavigate, AUTO_NAVIGATE_DELAY);
  }
  function autoNavigate() {
    cursor = highlightNovels.length - 1 !== cursor ? cursor + 1 : 0;
  }

  function mouseEnter() {
    clearInterval(timer);
  }
  function mouseLeave() {
    if (timer) clearInterval(timer);
    timer = setInterval(autoNavigate, AUTO_NAVIGATE_DELAY);
  }
</script>

<section
  bind:this={container}
  on:click={() => goto("/novel/{highlightNovels[cursor]}")}
  on:mouseleave={mouseLeave}
  on:mouseenter={mouseEnter}
>
  <!-- {JSON.stringify(data)} -->
  {#key cursor}
    <div
      class="wrapper"
      out:scale={{
        start: 0.9,
        duration: 200,
        opacity: 1,
      }}
      in:scale={{
        start: 1.1,
        opacity: 0,
        duration: 425,
        // delay: 65,
      }}
    >
      <img
        class="bg-image"
        src={getCoverURLPath(highlightNovels[cursor], {
          width: 64,
          height: 64,
        })}
        alt={getNovelTitle(highlightNovels[cursor])}
      />
      <div class="content-wrapper">
        <div class="left">
          <img
            class="novel-cover"
            src={getCoverURLPath(highlightNovels[cursor], {
              width: 256,
              height: 256,
            })}
            alt={getNovelTitle(highlightNovels[cursor])}
          />
          <span>{getNovelCoverSubtitle(highlightNovels[cursor])}</span>
        </div>
        <div class="right">
          <h2>{highlightData?.title}</h2>
          <div class="blurb">
            {@html highlightData?.synopsis ||
              import.meta.env.NOVELS_METADATA[highlightNovels[cursor]].synopsis}
          </div>
        </div>
      </div>
    </div>
  {/key}
  <div class="navigate-buttons">
    {#each highlightNovels as novel, i}
      <span on:click={() => navigate(i)} class:selected={cursor === i} />
      <!-- content here -->
    {/each}
  </div>
</section>

<style lang="scss">
  section {
    border-radius: 4px;
    height: 400px;
    width: 100%;
    overflow: hidden;
    position: relative;
    background-color: hsla(var(--primary-color-h), var(--primary-color-s), 0.32, 0.9);

    .wrapper {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .bg-image {
      width: 100%;
      position: absolute;
      transform: scale(1.2);
      z-index: 1;
      // opacity: 0.6;
      user-select: none;
      pointer-events: none;
      filter: brightness(70%) blur(16px);
    }

    .content-wrapper {
      display: flex;
      padding: 0 10%;
      flex-direction: row;
      z-index: 2;
      position: relative;
      .left {
        display: flex;
        width: 225px;
        flex-direction: column;
        width: max-content;
        margin-right: 2em;
        margin-top: 10%;
        .novel-cover {
          z-index: 2;
          position: relative;
          width: 100%;
          height: auto;
          border-radius: 2px;
          padding: 12px;
        }

        span {
          text-align: center;
        }
      }
      .right {
        width: fit-content;
        margin-top: 5%;

        h2 {
          font-weight: 700;
        }

        .blurb {
          max-height: 200px;
          overflow: hidden;
        }

        :global(p) {
          margin-top: 0;
          margin-bottom: 1.4em;
        }
      }
    }

    .navigate-buttons {
      position: absolute;
      display: flex;
      bottom: 12px;
      width: 100%;
      justify-content: center;
      z-index: 5;
      pointer-events: none;

      span {
        pointer-events: all;
        $size: 8px;
        background-color: #fffd;
        opacity: 0.5;
        cursor: pointer;
        width: $size;
        height: $size;
        border-radius: 50%;

        &.selected {
          background-color: var(--primary-color);
        }

        &:not(:last-child) {
          margin-right: 8px;
        }

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
</style>
