<script lang="ts">
  import { scale } from "svelte/transition";
  import { goto, prefetch } from "$app/navigation";
  import { novelCoverSubtitle, tagColorizer } from "$lib/utils/novel-page";
  import { onMount } from "svelte";
  import BookCover from "$lib/components/BookCover.svelte";
  import { novelsData } from "$lib/store/states";
  import { BLANK_IMAGE } from "$lib/utils/images";

  export let novel: string;
  export let index: number;
  export let sliderIndex: number;
  let data = $novelsData?.[novel];
  let novelTitle: string = data?.title || "";
  let synopsis: string = data?.synopsis;
  let placeholder = data?.cover?.placeholder ?? BLANK_IMAGE;
  let node;

  onMount(async () => {
    if (novel) prefetch("/novel/" + novel);
  });
</script>

<div
  in:scale={{
    duration: 325,
    opacity: 0,
    start: 1.1,
  }}
  out:scale|local={{
    duration: 600,
    opacity: 0,
    start: 0.9,
  }}
  bind:this={node}
  on:click={() => goto("/novel/" + novel)}
  class="wrapper"
>
  <img class="bg-image" src={placeholder} alt={novelTitle} />
  <div class="content-wrapper">
    <div class="left">
      <BookCover {novel} width="100%" />
      <div class="subtitle">
        {#each ($novelCoverSubtitle?.[novel] || "").split(" ") as tag, tagIndex}
          <span style="--delay: {tagIndex}; color:{tagColorizer(tag)};">
            {tag || ""}
          </span>
        {/each}
      </div>
    </div>
    <div class="right">
      <h2>{novelTitle}</h2>
      <div class="blurb">
        {@html synopsis || ""}
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.33s ease-in;
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
    display: grid;
    padding: 0 10%;
    grid-template-columns: 200px 1fr;
    z-index: 2;
    position: relative;
    @include screen("mobile") {
      grid-template-columns: 1fr;
      grid-template-rows: 150px 1fr;
      padding: 0 2%;

      :global(.book-cover) {
        max-width: 150px;
        --padding-top: 150px !important;
      }
    }
    .left {
      display: flex;
      width: 100%;
      flex-direction: column;
      margin-top: 25%;
      position: relative;

      @include screen("mobile") {
        margin-top: 5%;
      }

      .subtitle {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 8px;
      }

      span {
        text-align: center;
        font-weight: 300;
      }
    }
    .right {
      width: fit-content;
      margin: {
        top: 5%;
        left: 1em;
        right: 1em;
      }

      h2 {
        font-weight: 700;
        font-size: 2em;
      }

      .blurb {
        max-height: 200px;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        overflow: hidden;

        :global(.anchor) {
          display: none;
        }
      }

      :global {
        p {
          margin-top: 0;
          margin-bottom: 1.4em;
          font-size: 1em;
        }
        html.light & {
          color: #fffc;

          h2 {
            color: #fffe;
          }
        }
      }

      @include screen("mobile") {
        text-align: center;
        font-size: 14px;

        h2 {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
