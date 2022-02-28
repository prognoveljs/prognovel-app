<script lang="ts">
  import { getCoverURLPath } from "$lib/utils/images";
  import { getNovelCoverSubtitle, getNovelTitle } from "$lib/utils/novel-page";
  import { scale } from "svelte/transition";

  export let highlight = ["yashura-legacy", "yashura-legacy"];
  let cursor = 0;
</script>

<section>
  {#key cursor}
    <div
      class="wrapper"
      out:scale={{
        start: 1.4,
        opacity: 0,
        duration: 400,
      }}
      in:scale={{
        start: 1.2,
        opacity: 0,
        duration: 600,
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
      <div class="flex">
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
      </div>
    </div>
  {/key}
  <div class="navigate-buttons">
    {#each highlight as novel, i}
      <span on:click={() => (cursor = i)} />
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
    background-color: #000;

    .wrapper {
      position: absolute;
      width: 100%;
    }

    .bg-image {
      width: 100%;
      filter: blur(8px);
      position: absolute;
      transform: scale(1.2);
      z-index: 1;
      opacity: 0.6;
      user-select: none;
      pointer-events: none;
    }

    .flex {
      .left {
        display: flex;
        width: 225px;
        flex-direction: column;
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
    }

    .navigate-buttons {
      position: absolute;
      display: flex;
      bottom: 12px;
      width: 100%;
      justify-content: center;
      z-index: 5;

      span {
        $size: 6px;
        background-color: #fffd;
        opacity: 0.7;
        cursor: pointer;
        width: $size;
        height: $size;
        border-radius: 50%;

        &:not(:last-child) {
          margin-right: 8px;
        }

        &:hover {
          opacity: 1;
        }
      }
    }
  }
</style>
