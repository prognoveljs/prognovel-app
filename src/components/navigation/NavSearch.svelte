<script lang="ts">
  import { siteMetadata } from "src/store/states";
  import { tick } from "svelte";
  import { fly } from "svelte/transition";
  import { getCoverURLPath } from "utils/images";
  import { stringSearch } from "utils/string";

  export let isMobile: boolean = false;
  let search: string;
  let input: HTMLInputElement;
  $: novelsGroup = $siteMetadata?.novelsMetadata || [];
  $: searchedNovels = !search
    ? []
    : novelsGroup.filter((novelMetadata) => {
        return stringSearch((novelMetadata?.title || "").toLowerCase(), search.toLowerCase()) > 0;
      });

  function pressKey(e) {
    switch (e.key) {
      case "/":
        input.focus();
        break;
      case "Escape":
        input.blur();
        break;
    }
  }

  function onBlur() {
    setTimeout(() => {
      search = "";
    }, 100);
  }

  function onClickItem() {
    search = "";
  }
</script>

<svelte:window on:keyup={pressKey} />

<section class="input" class:isMobile>
  <div class="side-overlay" />
  <input
    on:blur={onBlur}
    bind:this={input}
    placeholder={isMobile ? "Search novels" : "Press / to search novels"}
    bind:value={search}
    type="text"
  />
  <span class="icon">🔍</span>
  <section class="result">
    {#each searchedNovels as novel, index}
      <a
        sapper:prefetch
        in:fly={{ duration: 125, y: 12, delay: 50 * index }}
        out:fly={{ duration: 80, y: -20, delay: 30 * index }}
        href="novel/{novel.id}"
        on:click={onClickItem}
      >
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
        {novel.title}
      </a>
    {/each}
    <div class:active={searchedNovels && searchedNovels.length} class="overlay" />
  </section>
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
      top: 10px;
      left: 12px;
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
        content: "🔍 ";
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
        // transform: translateX(0);
        & + .icon {
          transform: scale(1.3);
        }
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

  $resultWidth: 400px;
  .result {
    position: fixed;
    top: var(--header-height);
    right: 0;
    margin: 1em;
    display: flex;
    width: $resultWidth;
    align-items: start;
    justify-content: end;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    gap: 1em;

    a {
      display: flex;
      flex-direction: column;
      flex: 0;
      text-align: center;
      justify-content: center;
      align-items: center;
      border-radius: 2px;
      padding: 0.25em;
      line-height: 1.1;
      z-index: 900;
      position: relative;

      &:hover {
        background-color: #fff4;
        box-shadow: 0 2px 8px #0002;
      }

      picture {
        border-radius: 2px;
        margin-bottom: 8px;
        height: 128px;
      }
    }

    .overlay {
      width: $resultWidth;
      height: 100vh;
      transform: translateX(#{$resultWidth});
      background: linear-gradient(to left, #0007, transparent);
      position: fixed;
      top: var(--header-height);
      right: 0;
      transition: all 0.3s ease-in-out;
      z-index: 899;
      &.active {
        transform: translateX(0);
      }
    }
  }
</style>
