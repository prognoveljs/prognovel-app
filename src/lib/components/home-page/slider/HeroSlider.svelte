<script lang="ts">
  import { novelsData, siteMetadata } from "$lib/store/states";
  import { getCoverURLPath } from "$lib/utils/images";
  import { getNovelCoverSubtitle, getNovelTitle } from "$lib/utils/novel-page";
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";

  export let highlight = ["yashura-legacy", "yashura-legacy"];
  const AUTO_NAVIGATE_DELAY = 5000;
  let cursor = 0;
  let container;
  let timer;
  $: data = $novelsData[highlight[cursor]];

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
    cursor = highlight.length - 1 !== cursor ? cursor + 1 : 0;
  }

  function mouseEnter() {
    clearInterval(timer);
  }
  function mouseLeave() {
    timer = setInterval(autoNavigate, AUTO_NAVIGATE_DELAY);
  }
</script>

<section bind:this={container} on:mouseleave={mouseLeave} on:mouseenter={mouseEnter}>
  <a href="/novel/{highlight[cursor]}" on:click={removeOverflow}>
    {#key cursor}
      <div
        class="wrapper"
        out:scale={{
          start: 1.4,
          duration: 125,
        }}
        in:scale={{
          start: 1.2,
          opacity: 0,
          duration: 200,
          // delay: 150,
        }}
      >
        <img
          class="bg-image"
          src={getCoverURLPath(highlight[cursor], {
            width: 64,
            height: 64,
          })}
          alt={getNovelTitle(highlight[cursor])}
        />
        <div class="content-wrapper">
          <div class="left">
            <img
              class="novel-cover"
              src={getCoverURLPath(highlight[cursor], {
                width: 256,
                height: 256,
              })}
              alt={getNovelTitle(highlight[cursor])}
            />
            <span>{getNovelCoverSubtitle(highlight[cursor])}</span>
          </div>
          <div class="right">
            <h2>{data?.title || ""}</h2>
            <div class="blurb">
              {@html data?.synopsis || ""}
            </div>
          </div>
        </div>
      </div>
    {/key}
  </a>
  <div class="navigate-buttons">
    {#each highlight as novel, i}
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
      filter: blur(16px);
      position: absolute;
      transform: scale(1.6);
      z-index: 1;
      opacity: 0.6;
      user-select: none;
      pointer-events: none;
    }

    .content-wrapper {
      display: flex;
      padding: 0 10%;
      flex-direction: row;
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
