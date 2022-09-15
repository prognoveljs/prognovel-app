<script lang="ts">
  import { NOVEL_COVER_HEIGHT } from "$lib/_setting";
  import IconSvg from "$lib/components/IconSVG.svelte";
  import DisplayGrid from "./novel-list/DisplayGrid.svelte";
  import iconGrid from "$lib/assets/feather-icons/grid.svg?raw";
  import iconList from "$lib/assets/feather-icons/menu.svg?raw";
  import DisplayList from "./novel-list/DisplayList.svelte";
  import { browser } from "$app/environment";
  import { set } from "idb-keyval";
  import { onMount } from "svelte";
  import SkeletonShell from "../SkeletonShell.svelte";

  export let grid;
  type DisplayMode = "grid" | "list";
  const DEFAULT_MODE = "list";
  let displayMode: DisplayMode | "" = browser
    ? ((document.querySelector('meta[name="novel-list-display"]') as HTMLMetaElement)
        ?.content as DisplayMode) || DEFAULT_MODE
    : "";

  const SELECTED_COLOR = "var(--primary-color-lighten-2)";

  function selectMode(mode: DisplayMode) {
    displayMode = mode;
    set("novel-list-display", mode);
  }
</script>

<section
  class="container contain"
  style="grid-area: {grid}; min-height: {NOVEL_COVER_HEIGHT + 50}px;"
>
  <div class="horizontal-line" />
  <div class="flex">
    <h2>
      <div>🌟</div>
      Browse<br /> our novels
    </h2>
    <div class="options">
      <IconSvg
        on:click={() => selectMode("grid")}
        --color={displayMode === "grid" ? SELECTED_COLOR : "currentColor"}
        data={iconGrid}
      />
      <IconSvg
        on:click={() => selectMode("list")}
        --color={displayMode === "list" ? SELECTED_COLOR : "currentColor"}
        data={iconList}
      />
    </div>
  </div>
  <section class="list">
    {#if displayMode === "grid"}
      <DisplayGrid />
    {:else if displayMode === "list"}
      <DisplayList />
    {:else}
      <SkeletonShell>
        <!-- skeleton shell -->
        {#each Array(4).fill("") as item, i}
          <rect width="20%" height="80px" x="100%" y="{84 * (i + 1)}px" rx="4" ry="4" />
        {/each}
      </SkeletonShell>
    {/if}
  </section>
</section>

<style lang="scss">
  .container {
    margin-top: 5em;
    padding-top: 3em;
    // background-color: #0002;
    position: relative;

    .list {
      position: relative;
    }

    &::before {
      content: "";
      position: absolute;
      width: 500%;
      min-height: 500px;
      height: 100%;
      background-color: var(--background-color);
      top: 2px;
      left: -200%;
      opacity: 0.6;
    }
    &::after {
      content: "";
      position: absolute;
      width: 500%;
      height: 100px;
      background: linear-gradient(to bottom, #0002 20%, #0000);
      top: 2px;
      left: -200%;
      opacity: 0.6;
    }
    .horizontal-line {
      $thickness: 2.5px;
      position: absolute;
      width: 180%;
      left: -40%;
      top: 0;
      height: $thickness;
      background: linear-gradient(to right, #fff0, #fff5, #fff0);
      border-radius: math.div($thickness, 2);
    }
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      line-height: 0.9;
      padding-bottom: 0.5em;
      margin-bottom: 0.8em;
      opacity: 0.7;

      div {
        margin-bottom: 0.4em;
      }

      position: relative;
      z-index: 2;

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 2em;
        height: 4px;
        background-color: var(--primary-color);
        opacity: 0.7;
      }

      :global {
        html.light & {
          font-weight: 700;
        }
      }
    }

    .options {
      position: relative;
      z-index: 2;

      :global(span) {
        margin-left: 4px;
        cursor: pointer;
        user-select: none;
      }
    }
  }
</style>
