<script lang="ts">
  import { NOVEL_COVER_HEIGHT } from "$lib/_setting";
  import IconSvg from "$lib/components/IconSVG.svelte";
  import DisplayGrid from "./novel-list/DisplayGrid.svelte";
  import iconGrid from "$lib/assets/feather-icons/grid.svg?raw";
  import iconList from "$lib/assets/feather-icons/menu.svg?raw";

  export let grid;
  type DisplayMode = "grid" | "list";
  let mode: DisplayMode = "grid";

  const SELECTED_COLOR = "var(--primary-color-lighten-2)";

  function selectMode(m: DisplayMode) {
    mode = m;
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
        --color={mode === "grid" ? SELECTED_COLOR : "currentColor"}
        data={iconGrid}
      />
      <IconSvg
        on:click={() => selectMode("list")}
        --color={mode === "list" ? SELECTED_COLOR : "currentColor"}
        data={iconList}
      />
    </div>
  </div>
  <DisplayGrid />
</div>

<style lang="scss">
  .container {
    margin-top: 5em;
    padding-top: 3em;
    // background-color: #0002;
    position: relative;
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
