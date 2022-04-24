<script lang="ts">
  import { siteMetadata } from "$lib/store/states";
  import { fly, fade } from "svelte/transition";
  import { getCoverURLPath } from "$lib/utils/images";
  import { stringSearch } from "$lib/utils/string";
  import IconSvg from "$lib/components/IconSVG.svelte";
  import searchIcon from "$lib/assets/feather-icons/search.svg?raw";

  import { frameTick } from "$lib/utils/animation";
  import NavSearchResult from "./NavSearchResult.svelte";

  export let isMobile: boolean = false;
  let search: string;
  let input: HTMLInputElement;

  function onBlur() {
    setTimeout(() => {
      const activeEl = document.activeElement;
      if (
        activeEl.classList.contains("search-result-item") ||
        activeEl.classList.contains("search-result-overlay") ||
        activeEl === input
      )
        return;
      search = "";
    }, 100);
  }

  function onClickItem() {
    search = "";
  }
</script>

<svelte:window
  on:keyup={(e) => {
    if (e.key === "/") input.focus();
  }}
/>

<section class="input" class:isMobile>
  <div class="side-overlay" />
  <input
    on:blur={onBlur}
    bind:this={input}
    placeholder={isMobile ? "Search novels" : "Press / to search novels"}
    bind:value={search}
    type="text"
  />
  <span class="icon">
    <IconSvg --color="#0006" data={searchIcon} />
  </span>
  {#if search}
    <NavSearchResult on:click={onClickItem} on:blur={onBlur} {search} {input} />
  {/if}
</section>

<style lang="scss">
  $coverSize: 2em;
  .input {
    height: var(--header-height);
    display: flex;
    align-items: center;
    position: relative;

    .icon {
      font-size: 1.7em;
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);

      :global(span) {
        display: flex;
        align-items: center;
      }
    }

    input {
      height: 60%;
      width: 400px;
      border-radius: 4px;
      padding: 0.5em;
      padding-left: 2em;
      font-size: 1.4em;
      margin-right: 1em;
      box-sizing: border-box;
      font-family: "Courier New", Courier, monospace;
      // transform: translateX(150px);
      // transition: all 0.3s ease-in-out;
      border: 2px solid transparent;
      box-shadow: 0 2px gray;

      @include screen("tablet") {
        width: 270px;
      }

      &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 19;
        display: block;
      }

      &:focus,
      &:active {
        outline: none;
        border-color: var(--primary-color);
      }
    }

    &:focus :global(path) {
      color: var(--primary-color) !important;
    }

    .side-overlay {
      position: absolute;
      left: 0;
      bottom: 0;
      // z-index: 10;
      display: block;
      width: 25px;
      height: var(--header-height);
      transform: translateX(-100%);
      background: linear-gradient(to left, var(--header-color), var(--header-color-alpha));
    }

    &.isMobile {
      input {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        border-radius: 1em;
        box-shadow: none;
      }
    }
  }
</style>
