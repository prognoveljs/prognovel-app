<script lang="ts">
  import { scale } from "svelte/transition";
  import { goto } from "$app/navigation";
  import { getCoverURLPath } from "$lib/utils/images";
  import {
    novelCoverPlaceholders,
    novelCoverSubtitle,
    novelSynopsises,
    novelTitles,
  } from "$lib/utils/novel-page";
  import { onMount } from "svelte";
  import BookCover from "$lib/components/BookCover.svelte";

  export let novel: string;
  export let index: number;
  export let sliderIndex: number;
  export let data: any;
  let node;

  onMount(async () => {});
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
  <img class="bg-image" src={novelCoverPlaceholders[novel]} alt={novelTitles[novel]} />
  <div class="content-wrapper">
    <div class="left">
      <BookCover {novel} width="100%" />
      <span>{$novelCoverSubtitle[novel]}</span>
    </div>
    <div class="right">
      <h2>{novelTitles[novel]}</h2>
      <div class="blurb">
        {@html data?.synopsis || novelSynopsises[novel]}
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
      }

      :global(p) {
        margin-top: 0;
        margin-bottom: 1.4em;
        font-size: 1em;
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
