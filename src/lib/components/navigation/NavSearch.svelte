<script lang="ts">
  import IconSvg from "$lib/components/IconSVG.svelte";
  import searchIcon from "$lib/assets/feather-icons/search.svg?raw";

  import NavSearchResult from "./NavSearchResult.svelte";
  import { SITE_TITLE } from "$lib/_setting";
  import { XCircleIcon } from "svelte-feather-icons";

  export let isMobile: boolean = false;
  let search: string;
  let input: HTMLInputElement;

  function onBlur() {
    setTimeout(() => {
      const activeEl = document.activeElement;
      if (
        activeEl.classList.contains("search-result-item") ||
        activeEl.classList.contains("result-body") ||
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
    if (e.key === "/" && (document.activeElement === document.body || !document.activeElement))
      input.focus();
    if (e.key === "Escape" && document.activeElement === input) input.blur();
  }}
/>

<section class:isMobile>
  <div class="side-overlay" />
  <div class="input-wrap">
    <input
      on:blur={onBlur}
      bind:this={input}
      bind:value={search}
      class:active={search}
      placeholder="Search novels in {SITE_TITLE}..."
      type="text"
    />
    <span class="placeholder">
      {#if isMobile}
        Search novels
      {:else}
        Press <kbd>/</kbd> to search novels
      {/if}
    </span>
    {#if search}
      <span on:click={() => (search = "")}>
        <XCircleIcon class="close-icon" />
      </span>
    {/if}
  </div>
  <span class="icon">
    <IconSvg --color="#0006" data={searchIcon} />
  </span>
  {#if search}
    <NavSearchResult
      on:click={onClickItem}
      on:escape={() => (search = "")}
      on:blur={onBlur}
      {search}
      {input}
    />
  {/if}
</section>

<style lang="scss">
  $coverSize: 2em;
  section {
    height: var(--header-height);
    display: flex;
    align-items: center;
    position: relative;
    -webkit-app-region: no-drag;
    app-region: no-drag;

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

    .input-wrap {
      display: flex;
      position: relative;

      :global {
        .close-icon {
          position: absolute;
          right: 28px;
          top: 50%;
          color: var(--header-color);
          opacity: 0.6;
          transform: translateY(-50%);
          cursor: pointer;

          &:hover {
            opacity: 0.75;
            color: darkred;
          }
        }
      }

      input {
        height: 60%;
        border-radius: 4px;
        padding: 0.25em;
        padding-left: 2em;
        padding-right: 1.825em;
        font-size: 1.2em;
        margin-right: 0.5em;
        box-sizing: border-box;
        // font-family: "Courier New", Courier, monospace;
        // transform: translateX(150px);
        // transition: all 0.3s ease-in-out;
        border: 2px solid transparent;
        box-shadow: 0 2px gray;
        transform: translateZ(0);
        width: 300px;
        transition: width 0.175s ease-out;
        contain: content;

        &::placeholder {
          opacity: 0;
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

        &.active,
        &:focus,
        &:active {
          & ~ .placeholder {
            display: none;
          }

          &::placeholder {
            opacity: 1;
          }

          @include screen("tablet") {
            @media only screen and (min-width: 768px) {
              width: 340px;
            }
          }

          @include screen("desktop") {
            width: 400px;
          }
        }

        @include screen("tablet") {
          width: 290px;
        }
        @include screen("mobile") {
          width: 70vw;
        }
      }

      .placeholder {
        position: absolute;
        top: 52%;
        left: 2.175em;
        font-size: 1.2em;
        transform: translateY(-50%);
        color: #000a;
        pointer-events: none;

        kbd {
          padding: 0 8px;
          border-radius: 4px;
          border: 1px solid #000a;
          background-color: #0002;
          box-shadow: 2px 2px #0003;
        }
      }

      @include screen("mobile") {
        input {
          padding-left: 2.25em;
        }

        .placeholder {
          left: 2.25em;
        }
      }
      @include screen("small-mobile") {
        input {
          padding-left: 2.6em;
        }

        .placeholder {
          left: 2.6em;
        }
      }
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
