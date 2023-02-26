<script lang="ts">
  import { NOVEL_COVER_HEIGHT } from "$lib/_setting";
  import IconSvg from "$lib/components/IconSVG.svelte";
  import DisplayGrid from "./novel-list/DisplayGrid.svelte";
  import iconGrid from "$lib/assets/feather-icons/grid.svg?raw";
  import iconList from "$lib/assets/feather-icons/menu.svg?raw";
  import DisplayList from "./novel-list/DisplayList.svelte";
  import { browser } from "$app/environment";
  import { set as setIDB } from "idb-keyval";
  import { onMount } from "svelte";
  import SkeletonShell from "../SkeletonShell.svelte";
  import SectionHeaderLabel from "./misc/SectionHeaderLabel.svelte";

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
    setIDB("novel-list-display", mode);
  }
</script>

<section
  class="container contain"
  style="grid-area: {grid}; min-height: {NOVEL_COVER_HEIGHT + 50}px;"
>
  <SectionHeaderLabel label="New updates" emoji="🌟">
    <!-- <div class="options">
      <IconSvg
        on:click={() => selectMode("list")}
        --color={displayMode === "list" ? SELECTED_COLOR : "currentColor"}
        data={iconList}
      />
      <IconSvg
        on:click={() => selectMode("grid")}
        --color={displayMode === "grid" ? SELECTED_COLOR : "currentColor"}
        data={iconGrid}
      />
    </div> -->
  </SectionHeaderLabel>

  <section class="list">
    <DisplayList />
  </section>
</section>

<style lang="scss">
  .container {
    // margin-top: 5em;
    padding-top: 3em;
    // background-color: #0002;
    position: relative;
    margin-bottom: 7em;

    .list {
      position: relative;
    }

    // &::after {
    //   content: "";
    //   position: absolute;
    //   width: 500%;
    //   height: 100px;
    //   background: linear-gradient(to bottom, #0002 20%, #0000);
    //   top: 2px;
    //   left: -200%;
    //   opacity: 0.6;
    // }

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
