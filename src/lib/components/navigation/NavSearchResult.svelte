<script lang="ts">
  import { browser } from "$app/env";
  import { siteMetadata } from "$lib/store/states";
  import { stringSearch } from "$lib/utils/string";
  import { fade, fly } from "svelte/transition";
  import arrowDownIcon from "$lib/assets/feather-icons/arrow-down.svg?raw";
  import alertIcon from "$lib/assets/feather-icons/alert-octagon.svg?raw";
  import { cubicIn, cubicOut } from "svelte/easing";
  import IconSvg from "../IconSVG.svelte";
  import NavSearchResultItem from "./NavSearchResultItem.svelte";
  import { createEventDispatcher } from "svelte";

  export let search = "";
  export let input;
  const dispath = createEventDispatcher();

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
        dispath("escape");
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

  function onMouseOverItem(index: number) {
    if (!hasMouseMove) return;
    selectedNovel = index;
  }

  let hasMouseMove = false;
  let mouseX;
  let mouseY;
  function onMouseMove(e: MouseEvent) {
    if (!mouseX) mouseX = e.x;
    if (!mouseY) mouseY = e.y;
    if (mouseX - e.x > 50 || mouseX - e.x < -50) hasMouseMove = true;
    if (mouseY - e.x > 30 || mouseY - e.y < -30) hasMouseMove = true;
  }
</script>

<svelte:window on:keydown={searchPressKey} />

<section
  on:focus
  on:mouseover={onMouseMove}
  class="result"
  style="--result-width: {RESULT_WIDTH}px;"
>
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
      <NavSearchResultItem
        {novel}
        {index}
        on:blur
        on:click
        on:focus
        on:mouseover={() => onMouseOverItem(index)}
      />
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
  @import "shared";
  .result {
    position: fixed;
    top: var(--header-height);
    right: 0;
    padding: 1em;
    width: $resultWidth;
    max-width: 100%;
    // contain: content;

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
