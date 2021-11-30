<script lang="ts">
  import { bannerImages, updateBannerImage } from "utils/images";
  import { NOVEL_BANNER_HEIGHT } from "settings";
  import { getContext } from "svelte";
  import type { NovelMetadata } from "typings";

  export let novelMetadata: NovelMetadata = getContext("novelMetadata");
  export let id: string = getContext("id");
  let banner;
  let img;
  let hide = true;
  $: if (banner && id && banner.querySelector(`img[data-banner=${id}]`) !== undefined) {
    updateBannerImage(id);
    if (hide && (img?.src || "").length < 1024 * 10) hide = false;
  }
</script>

<div class="banner" style="height: {NOVEL_BANNER_HEIGHT}px;" bind:this={banner} class:hide>
  <img
    bind:this={img}
    crossorigin
    data-banner={id}
    alt={novelMetadata ? novelMetadata.title + " cover." : ""}
  />
  <div class="gradient" />
</div>

<style lang="scss">
  .banner {
    width: 100%;
    max-width: 100vw;
    /* background-color: hsla(var(--primary-color-h), 58%, 75%, 0.3); */
    position: relative;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #0006;
    }

    img {
      width: 100%;
      height: auto;
      transform-origin: bottom center;
      animation: 1s linear both banner-scroll;
      animation-timeline: banner-scroll;
    }

    &.hide {
      img {
        visibility: hidden;
      }
    }

    .gradient {
      position: absolute;
      width: 100%;
      height: 50%;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(to top, #000c 10%, #0006, transparent);
    }

    @supports (animation-timeline: works) {
      @keyframes progress {
        from {
          transform: scale(1.1);
          opacity: 1;
        }

        to {
          transform: scale(1);
          opacity: 0;
        }
      }

      @scroll-timeline banner-scroll {
        source: auto;
        orientation: vertical;
        scroll-offsets: 0%, 100%;
        time-range: 1s;
      }
    }
  }
</style>
