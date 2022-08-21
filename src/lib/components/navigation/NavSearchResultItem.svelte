<script lang="ts">
  import { novelCoverPlaceholders } from "$lib/utils/novel-page";
  import { frameTick } from "$lib/utils/animation";
  import { getCoverURLPath } from "$lib/utils/images";
  import { prefetch, prefetchRoutes } from "$app/navigation";
  import { fade, fly } from "svelte/transition";
  import { isMobileScreen } from "$lib/utils/mobile";

  export let index = 0;
  export let novel = { id: "", title: "" };
  let el;

  let clicked = false;
  function resultItem(el: HTMLAnchorElement) {
    el.onfocus = async () => {
      const elWrapper: HTMLDivElement = el.querySelector(".content-wrapper");
      const elTitle: HTMLDivElement = el.querySelector(".title");

      await frameTick();
      prefetch(el.href);

      elWrapper.style.height = `calc(var(--item-height) + ${elTitle.clientHeight}px - 18px)`;
      clicked = true;
    };

    el.onblur = async () => {
      const elWrapper: HTMLDivElement = el.querySelector(".content-wrapper");
      elWrapper.style.height = `calc(100%)`;
      clicked = false;
    };
  }

  function onClick(e: MouseEvent) {
    if (isMobileScreen()) {
      if (!clicked) {
        e.preventDefault();
      }
    }
  }
</script>

<a
  bind:this={el}
  sveltekit:prefetch
  in:fly={{ duration: 125, y: 12, delay: 50 * index }}
  out:fly={{ duration: 80, y: -20, delay: 30 * index }}
  id="search-{novel.id}"
  class="search-result-item"
  href="/novel/{novel.id}"
  style="z-index:{900 - index}"
  use:resultItem
  on:click={onClick}
  on:blur
  on:mouseover
  on:focus
>
  <div class="content-wrapper">
    <div class="cover" style="--cover-size: 128px;">
      <img src={novelCoverPlaceholders[novel.id]} alt="" aria-hidden="true" class="placeholder" />
      <picture>
        <source
          srcset={getCoverURLPath(novel.id, { width: 128, height: 128 }, "webp")}
          type="image/webp"
        />
        <source
          srcset={getCoverURLPath(novel.id, { width: 128, height: 128 }, "jpeg")}
          type="image/jpeg"
        />
        <img
          src={getCoverURLPath(novel.id, { width: 128, height: 128 }, "jpeg")}
          alt={novel.title}
        />
      </picture>
    </div>
    <div class="title">
      {novel.title}
    </div>
  </div>
</a>

<style lang="scss">
  @import "shared";

  a {
    display: flex;
    position: relative;
    flex-direction: column;
    flex: 0;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    padding: 0.25em;
    line-height: 1.1;
    z-index: $overlay-index + 1;
    position: relative;
    color: var(--primary-color-darken-4);
    font-weight: 700;
    min-height: var(--item-height);
    pointer-events: all;

    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
      margin-top: 0.3em;
    }
    .content-wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 100%;
      padding-top: 4px;

      .cover {
        width: var(--cover-size, 128px);
        height: var(--cover-size, 128px);
        background-size: var(--cover-size, 128px) !important;
        background-repeat: no-repeat;
        margin: 0 auto;
        overflow: hidden;
        position: relative;

        .placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: auto;
          transform: scale(1.1);
          filter: blur(8px);
        }

        // &:hover:not(:focus),
        picture {
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 2px;
          margin-bottom: 8px;
          width: 100%;
          height: auto;
        }
      }
    }

    &:focus,
    &:active {
      outline: none;
      .content-wrapper {
        background-color: #fffa;
        box-shadow: 0 2px 8px #0002;
        color: var(--primary-color-darken-2);
        height: 100%;
      }
      .title {
        white-space: normal;
        width: 100%;
      }
    }
  }
</style>
