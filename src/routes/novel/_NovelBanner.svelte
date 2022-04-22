<script lang="ts">
  import { updateBannerImage } from "$lib/utils/images";
  import { NOVEL_BANNER_HEIGHT } from "$lib/_setting";
  import { getContext } from "svelte";
  import type { NovelMetadata } from "$typings";

  export let novelMetadata: NovelMetadata = getContext("novelMetadata");
  export let id: string = getContext("id");
  const IS_STATIC = import.meta.env.STATIC_BANNER_IMAGES;
  let banner;
  let img;
  let hide = !IS_STATIC;

  $: if (
    !IS_STATIC &&
    banner &&
    id &&
    banner.querySelector(`img[data-banner=${id}]`) !== undefined
  ) {
    updateBannerImage(id);
    if (hide && (img?.src || "").length < 1024 * 10) hide = false;
  }
</script>

<div class="banner" style="height: {NOVEL_BANNER_HEIGHT}px;" bind:this={banner} class:hide>
  {#if IS_STATIC}
    <picture>
      <source
        type="image/avif"
        srcset={`/publish/${id}/banner-480.avif 480w,
/publish/${id}/banner-480.avif 480w,
/publish/${id}/banner-800.avif 800w,
/publish/${id}/banner-1000.avif 1000w,
/publish/${id}/banner-1400.avif 1400w,
/publish/${id}/banner-1900.avif 1900w,
    `}
        sizes={`(max-width:500px) 480w,
(max-width:1000px) 800w,
(max-width:1300px) 1000w,
(max-width:1700px) 1400w,
1900w`}
      />
      <source
        type="image/webp"
        srcset={`/publish/${id}/banner-480.webp 480w,
/publish/${id}/banner-480.webp 480w,
/publish/${id}/banner-800.webp 800w,
/publish/${id}/banner-1000.webp 1000w,
/publish/${id}/banner-1400.webp 1400w,
/publish/${id}/banner-1900.webp 1900w,
    `}
        sizes={`(max-width:500px) 480w,
(max-width:1000px) 800w,
(max-width:1300px) 1000w,
(max-width:1700px) 1400w,
1900w`}
      />
      <img
        bind:this={img}
        crossorigin="anonymous"
        alt={novelMetadata ? novelMetadata.title + " cover." : ""}
        src={`/publish/${id}/banner-1400.jpeg`}
      />
    </picture>
  {:else}
    <img
      bind:this={img}
      crossorigin="anonymous"
      data-banner={id}
      alt={novelMetadata ? novelMetadata.title + " cover." : ""}
    />
  {/if}
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
      height: 100%;
      object-fit: cover;
      height: auto;
      transform-origin: bottom center;
      animation: 1s linear forwards progress;
      animation-timeline: banner-scroll;
      will-change: filter;
      transform-origin: bottom;

      @include screen("mobile") {
        height: 100%;
        object-fit: cover;
      }
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
          filter: blur(0);
        }

        to {
          transform: scale(1);
          opacity: 0;
          filter: blur(20px);
        }
      }

      @scroll-timeline banner-scroll {
        source: auto;
        orientation: vertical;
        scroll-offsets: 0%, 200px;
        time-range: 1s;
      }
    }
  }
</style>
