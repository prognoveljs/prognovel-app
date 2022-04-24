<script lang="ts">
  import { browser } from "$app/env";
  import { siteMetadata } from "$lib/store/states";
  import { frameTick } from "$lib/utils/animation";
  import { stringSearch } from "$lib/utils/string";
  import { fade, fly } from "svelte/transition";
  import arrowDownIcon from "$lib/assets/feather-icons/arrow-down.svg?raw";
  import alertIcon from "$lib/assets/feather-icons/alert-octagon.svg?raw";
  import { cubicIn, cubicOut } from "svelte/easing";
  import IconSvg from "../IconSVG.svelte";
  import { getCoverURLPath } from "$lib/utils/images";

  export let search = "";
  export let input;

  $: novelsGroup = $siteMetadata?.novelsMetadata || [];
  const RESULT_WIDTH = 510;
  let SEARCH_ROW_ITEMS = 3;
  let selectedNovel: number = -1;
  $: searchedNovels = !search
    ? []
    : import.meta.env.IS_DEMO
    ? Array(11).fill({
        id: "yashura-legacy",
        title: "Yashura Legacy: The Demo Novel of ProgNovel",
      })
    : novelsGroup.filter((novelMetadata) => {
        return stringSearch((novelMetadata?.title || "").toLowerCase(), search.toLowerCase()) > 0;
      });
  $: if (search === null || selectedNovel < -1) selectedNovel = -1;
  $: if (selectedNovel > -1 && browser) {
    const sel = document.querySelectorAll(".result a")?.[selectedNovel] as HTMLAnchorElement;
    if (sel) sel.focus();
  }

  export function searchPressKey(e) {
    switch (e.key) {
      case "Escape":
        search = "";
        input.blur();
        e.preventDefault();
        break;
      case "ArrowLeft":
        if (!searchedNovels.length || document.activeElement === input) break;
        selectedNovel--;
        if (selectedNovel < 0) input.focus();
        e.preventDefault();
        break;
      case "ArrowRight":
        if (!searchedNovels.length || document.activeElement === input) break;
        if (selectedNovel < searchedNovels.length) selectedNovel++;
        e.preventDefault();
        break;
      case "ArrowUp":
        if (!searchedNovels.length) break;
        selectedNovel -= SEARCH_ROW_ITEMS;
        if (selectedNovel < 0) input.focus();
        e.preventDefault();

        break;
      case "ArrowDown":
        if (!searchedNovels.length) break;
        if (document.activeElement === input) {
          selectedNovel = 0;
        } else {
          if (selectedNovel + SEARCH_ROW_ITEMS < searchedNovels.length) {
            selectedNovel += SEARCH_ROW_ITEMS;
          } else {
            selectedNovel = searchedNovels.length - 1;
          }
        }
        e.preventDefault();
        break;
    }
  }
  function resultWrapper(el: HTMLDivElement) {
    if (!browser) return;
    const style = getComputedStyle(el);
    SEARCH_ROW_ITEMS = style.gridTemplateColumns.split(" ").length;
  }

  function resultItem(el: HTMLAnchorElement) {
    el.onfocus = async () => {
      const elWrapper: HTMLDivElement = el.querySelector(".content-wrapper");
      const elTitle: HTMLDivElement = el.querySelector(".title");

      await frameTick();

      elWrapper.style.height = `calc(var(--item-height) + ${elTitle.clientHeight}px - 18px)`;
    };
    el.onblur = async () => {
      const elWrapper: HTMLDivElement = el.querySelector(".content-wrapper");
      elWrapper.style.height = `calc(100%)`;
    };
  }
</script>

<svelte:window on:keydown={searchPressKey} />

<section class="result" style="--result-width: {RESULT_WIDTH}px;">
  <div in:fade={{ duration: 100 }} out:fade={{ duration: 100 }}>
    <em
      ><IconSvg --color="#fff7" style="margin-right: 6px;" size="1.1em" data={arrowDownIcon} />use
      arrow keys to navigate</em
    >
    {#if import.meta.env.IS_DEMO}
      <em
        ><IconSvg --color="#fff7" style="margin-right: 6px;" size="1.1em" data={alertIcon} />lots
        results being added for demo purpose</em
      >
    {/if}
  </div>
  <div class="item-wrapper" use:resultWrapper>
    {#each searchedNovels as novel, index}
      <a
        sveltekit:prefetch
        in:fly={{ duration: 125, y: 12, delay: 50 * index }}
        out:fly={{ duration: 80, y: -20, delay: 30 * index }}
        id="search-{novel.id}"
        class="search-result-item"
        href="/novel/{novel.id}"
        style="z-index:{900 - index}"
        use:resultItem
        on:click
        on:blur
        on:mouseover={() => (selectedNovel = index)}
        on:focus
      >
        <div class="content-wrapper">
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
          <div class="title">
            {novel.title}
          </div>
        </div>
      </a>
    {/each}
  </div>
  {#if search && !searchedNovels.length}
    <div class="no-match">no match found...</div>
  {/if}
  <div
    class:active={search}
    in:fly={{ duration: 225, x: RESULT_WIDTH, easing: cubicOut }}
    out:fly={{ duration: 300, x: RESULT_WIDTH, easing: cubicIn }}
    class="search-result-overlay"
    tabindex="0"
  />
</section>

<style lang="scss">
  $resultWidth: var(--result-width);
  $overlay-index: 400;
  .result {
    position: fixed;
    top: var(--header-height);
    right: 0;
    padding: 1em;
    width: $resultWidth;
    max-width: 100%;

    em {
      display: flex;
      position: relative;
      z-index: $overlay-index + 1;
      margin: 0.3em 0 0.3em 0;
      padding: 0 4px;
      color: var(--primary-color-lighten-4);
      background-color: #0006;
      width: fit-content;

      &:last-child {
        margin-bottom: 0.7em;
      }
    }

    .item-wrapper {
      --item-height: 160px;
      display: grid;
      align-items: start;
      justify-content: start;
      grid-template-columns: repeat(auto-fill, 136px);
      // flex-direction: row-reverse;
      gap: 1em;

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

        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }
        .content-wrapper {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
          padding-top: 4px;

          // &:hover:not(:focus),
          picture {
            border-radius: 2px;
            margin-bottom: 8px;
            width: 100%;
            height: auto;
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
    }

    .no-match {
      position: absolute;
      top: 0;
      right: 0;
      z-index: $overlay-index + 1;
    }

    .search-result-overlay {
      width: $resultWidth;
      height: 100vh;
      // width: 100%;
      position: fixed;
      top: var(--header-height);
      right: 0;
      transition: all 0.3s ease-in-out;
      z-index: $overlay-index;
      background: #fff4;
      backdrop-filter: blur(10px);
      box-shadow: -4px 0 8px #0001, -4px 0 20px #0001;
      // background: linear-gradient(to left, #0007 30%, #0002, #0000);
      // transform: translateX(#{$resultWidth});
      // &.active {
      //   transform: translateX(0);
      // }
    }
  }
</style>
