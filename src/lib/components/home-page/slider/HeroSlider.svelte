<script lang="ts">
  import { isBrowser, novelsData } from "$lib/store/states";
  import { novelList, novelSynopsises } from "$lib/utils/novel-page";

  import { onMount } from "svelte";
  import HeroSliderItem from "./HeroSliderItem.svelte";

  const AUTO_NAVIGATE_DELAY = 5000;
  let cursor = 0;
  let hasSlide = false;
  let container;
  let timer;
  $: highlightNovels = novelList;
  // $: highlightNovels = ["yashura-legacy", "yashura-legacy"];
  $: novelDataWithSynopsis = $novelsData?.[highlightNovels[cursor]] ? $novelsData : novelSynopsises;

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

<section bind:this={container} on:mouseleave={mouseLeave} on:mouseenter={mouseEnter}>
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
