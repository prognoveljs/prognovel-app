<script lang="ts">
  import { NOVEL_COVER_HEIGHT } from "$lib/_setting";
  import IconSvg from "$lib/components/IconSVG.svelte";
  import DisplayGrid from "./novel-list/DisplayGrid.svelte";
  import iconGrid from "$lib/assets/feather-icons/grid.svg?raw";
  import iconList from "$lib/assets/feather-icons/menu.svg?raw";
  import DisplayList from "./novel-list/DisplayList.svelte";

  export let grid;
  type DisplayMode = "grid" | "list";
  let displayMode: DisplayMode = "grid";

  const SELECTED_COLOR = "var(--primary-color-lighten-2)";

  function selectMode(mode: DisplayMode) {
    displayMode = mode;
  }
</script>

<div class="container" style="grid-area: {grid}; min-height: {NOVEL_COVER_HEIGHT + 50}px;">
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
    {/if}
  </section>
</div>

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
      border-radius: $thickness / 2;
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
