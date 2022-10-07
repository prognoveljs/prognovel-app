<script lang="ts">
  import { novelsData } from "$lib/store/states";
  import { novelList, novelSynopsises } from "$lib/utils/novel-page";

  import { onMount } from "svelte";
  import HeroSliderItem from "./HeroSliderItem.svelte";

  const AUTO_NAVIGATE_DELAY = 5000;
  let cursor = 0;
  let timer;
  $: highlightNovels = novelList as string;
  // $: highlightNovels = ["yashura-legacy", "yashura-legacy"];
  $: novelDataWithSynopsis = $novelsData?.[highlightNovels[cursor]] ? $novelsData : novelSynopsises;

  onMount(() => {
    timer = setInterval(autoNavigate, AUTO_NAVIGATE_DELAY);
    return () => {
      clearInterval(timer);
    };
  });

  function navigate(cr: number) {
    cursor = cr;
    clearInterval(timer);
    timer = setInterval(autoNavigate, AUTO_NAVIGATE_DELAY);
    sliderIndex++;
  }
  function autoNavigate() {
    cursor = highlightNovels.length - 1 !== cursor ? cursor + 1 : 0;
    sliderIndex++;
  }

  function mouseEnter() {
    clearInterval(timer);
  }
  function mouseLeave() {
    if (timer) clearInterval(timer);
    timer = setInterval(autoNavigate, AUTO_NAVIGATE_DELAY);
  }

  let sliderIndex = 0;
  $: sliderGroup = Array(sliderIndex ? 2 : 1)
    .fill(0)
    .map((slider, index) => {
      return index + sliderIndex;
    });
</script>

<section on:mouseleave={mouseLeave} on:mouseenter={mouseEnter}>
  <!-- {JSON.stringify(data)} -->
  <div>
    {#key cursor}
      <HeroSliderItem
        novel={highlightNovels[cursor]}
        {sliderIndex}
        index={sliderIndex}
        data={novelDataWithSynopsis[highlightNovels[cursor]]}
      />
    {/key}
  </div>
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
    cursor: pointer;
    user-select: none;

    .navigate-buttons {
      $bottom: 12px;
      position: absolute;
      display: flex;
      bottom: $bottom;
      width: 100%;
      justify-content: center;
      z-index: 5;
      pointer-events: none;

      @include screen("mobile") {
        &::before {
          content: "";
          position: absolute;
          bottom: $bottom * -1;
          left: 0;
          width: 100%;
          height: 100px;
          background: linear-gradient(to top, #000, #0005, #0000);
          pointer-events: none;
          opacity: 0.7;
        }
      }

      span {
        pointer-events: all;
        --size: 8px;
        background-color: #fffd;
        opacity: 0.5;
        cursor: pointer;
        width: var(--size);
        height: var(--size);
        border-radius: 50%;

        @include screen("mobile") {
          --size: 16px;
          opacity: 0.8;
        }

        &.selected {
          background-color: var(--primary-color);
        }

        &:not(:last-child) {
          margin-right: var(--size);
        }

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
</style>
