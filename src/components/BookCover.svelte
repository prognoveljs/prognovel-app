<script lang="ts">
  import { placeholders } from "cache/novel-placeholders";
  import { getCoverURLPath } from "utils/images";

  export let novel: string;
  export let title: string;
  export let sub: string = "#webnovel";
  export let showTitle: boolean = false;
  export let showSub: boolean = false;
  export let isNovelPageCover: boolean = false;
  export let size: "medium" | "small" | "" = "";

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
</script>

<div class="image {size}" class:isNovelPageCover>
  <div class="preload" style="background: url('{placeholders[novel]}');" />
  ​
  <picture>
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
    />
  </picture>

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
  {#if showTitle || showSub}
    <div class="overlay" />
  {/if}
</div>

<style lang="scss">
  @import "style/scss/global.scss";
  $zIndex: 10;

  .image {
    position: relative;
    background-color: var(--foreground-color);
    box-shadow: 0 4px 12px #0003;
    width: $cover-width;
    height: $cover-height;
    margin: 0 auto;
    contain: content;
    overflow: hidden;

    .preload {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: $zIndex - 1;
      background-size: 100% 100% !important;
      background-repeat: no-repeat !important;
      filter: blur(5px);
    }

    picture {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: $zIndex;
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
