<script lang="ts">
  import { novelsData } from "$lib/store/states";
  import { getCoverURLPath } from "$lib/utils/images";
  import { NOVEL_COVER_ASPECT_RATIO, NOVEL_COVER_HEIGHT, NOVEL_COVER_WIDTH } from "$lib/_setting";
  import SkeletonShell from "./SkeletonShell.svelte";
  // import { novelCoverPlaceholders } from "$lib/utils/novel-page";

  let coverEl: HTMLElement;
  export let novel: string;
  export let title: string = "";
  export let sub: string = "#webnovel";
  export let showTitle: boolean = false;
  export let showSub: boolean = false;
  export let isNovelPageCover: boolean = false;
  export let size: "medium" | "small" | "" = "";
  export let width: number | string = NOVEL_COVER_WIDTH + "px";
  $: height =
    width === "100%"
      ? `${
          (coverEl?.clientWidth ?? 0) * NOVEL_COVER_ASPECT_RATIO + "px" ||
          100 / NOVEL_COVER_ASPECT_RATIO
        }`
      : NOVEL_COVER_HEIGHT + "px";

  export let style = "";

  let loading = true;

  $: sizeRatio = function () {
    switch (size) {
      case "small":
        return 0.5;
      default:
        return 1;
    }
  };

  export let titleColor = {
    hue: "var(--primary-color-h)",
    saturate: "90%",
    light: "52%",
  };

  function pictureElement(el: HTMLPictureElement) {
    try {
      el.querySelector("img").onload = () => {
        loading = false;
      };
    } catch (error) {}
  }
</script>

<!-- <div
  class="book-cover image {size}"
  class:isNovelPageCover
  style="--width: var(--wrapper-width, {width});--aspect-ratio: {NOVEL_COVER_ASPECT_RATIO}; {width ===
  '100%'
    ? '--padding-top:' + height + ';height:0;'
    : 'height: ' + height}"
> -->

<div
  class="book-cover image {size}"
  class:isNovelPageCover
  style="--width: var(--wrapper-width, {width});--height: var(--wrapper-height, {height});--aspect-ratio: {NOVEL_COVER_ASPECT_RATIO};{style}"
  bind:this={coverEl}
>
  {#if loading}
    <div class="preload">
      <SkeletonShell {width} {height} />
    </div>
  {/if}
  <picture use:pictureElement class:loading>
    <source
      srcset="{getCoverURLPath(
        novel,
        { width: sizeRatio() * 256, height: sizeRatio() * 256 },
        'avif',
      )} 1x, {getCoverURLPath(
        novel,
        { width: sizeRatio() * 512, height: sizeRatio() * 512 },
        'avif',
      )} 2x"
      type="image/avif"
    />
    <source
      srcset="{getCoverURLPath(
        novel,
        { width: sizeRatio() * 256, height: sizeRatio() * 256 },
        'webp',
      )} 1x, {getCoverURLPath(
        novel,
        { width: sizeRatio() * 512, height: sizeRatio() * 512 },
        'webp',
      )} 2x"
      type="image/webp"
    />
    <source
      srcset="{getCoverURLPath(
        novel,
        { width: sizeRatio() * 256, height: sizeRatio() * 256 },
        'jpeg',
      )} 1x, {getCoverURLPath(
        novel,
        { width: sizeRatio() * 512, height: sizeRatio() * 512 },
        'jpeg',
      )} 2x"
      type="image/jpeg"
    />
    <img
      src={getCoverURLPath(novel, { width: sizeRatio() * 256, height: sizeRatio() * 256 }, "jpeg")}
      alt={title}
      width="100%"
    />
  </picture>

  {#if showTitle || showSub}
    <div class="text">
      {#if showTitle}
        <div
          class="title"
          style="color: hsl({titleColor.hue}, {titleColor.saturate}, {titleColor.light});"
        >
          {title}
        </div>
      {/if}
      {#if showSub}<span class="sub">{sub}</span>{/if}
    </div>
    <div class="overlay" />
  {/if}
</div>
<slot el={coverEl} />

<style lang="scss">
  @import "style/scss/global.scss";
  $zIndex: 10;

  .image {
    position: relative;
    // background-color: var(--foreground-color);
    box-shadow: 0 4px 12px #0003;
    width: var(--width);
    height: var(--height);
    max-width: auto;
    margin: 0 auto;
    contain: content;
    overflow: hidden;
    padding-top: var(--padding-top);
    isolation: isolate;

    :global(svg) {
      display: block;
    }

    .preload {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      // width: 100%;
      // height: 100%;
      // aspect-ratio: var(--aspect-ratio);
      // background-size: 100% 100% !important;
      // background-repeat: no-repeat !important;
      // filter: blur(5px);
    }

    picture {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;

      &.loading {
        opacity: 0;
      }
    }

    .overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(to top, #000d 30%, #0008 60%, transparent);
      z-index: $zIndex + 2;
      transform: translateY(70%);
      transition: all 0.225s ease-in-out;
    }

    &:hover .overlay {
      transform: translateY(0);
      opacity: 0.6;
    }

    &:hover .title,
    &:hover .sub {
      opacity: 0;
    }
  }

  .text {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 12px;
    z-index: $zIndex + 3;

    .title {
      font-size: 1.8rem;
      text-shadow: 0 2px 6px #000a;
      font-weight: 700;
      line-height: 1.2;
      padding: 0 12px;
      transition: opacity 0.225s 0.18s ease-in;
    }

    .sub {
      font-size: 0.85rem;
      font-weight: 300;
      line-height: 1.125;
      word-spacing: 4px;
      padding: 0 18px;
      transition: opacity 0.4s ease-in-out;
      color: #fffe;
    }
  }

  .isNovelPageCover {
    display: block;
  }
</style>
