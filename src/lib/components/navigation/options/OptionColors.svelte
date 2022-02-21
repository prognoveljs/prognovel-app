<script>
  import { onMount } from "svelte";
  import { get } from "idb-keyval";
  import { activeColor } from "./color";
  import ColorsButton from "./OptionColorsButton.svelte";

  let colors = {};
  const size = "32px";

  onMount(async () => {
    await initColors();
  });

  async function initColors() {
    const res = await fetch("/style/color-themes.json");
    $activeColor = (await get("theme-active-color")) || "basic";

    let obj;
    let tempColors = [];

    try {
      obj = await res.json();
      for (const key in obj) {
        obj[key].name = key;
        obj[key].size = size;
        tempColors = [...tempColors, obj[key]];
      }
      colors = tempColors;
    } catch (err) {
      throw "Error setting colors object.";
    }
  }
</script>

<h5 aria-roledescription="label">Color themes</h5>
<div style="grid-template-columns: repeat(auto-fill, {size}); grid-template-rows: repeat(auto-fill, {size});">
  {#if colors.length}
    {#each colors as color}
      <ColorsButton {...color} />
    {/each}
  {/if}
</div>

<style>
  div {
    display: grid;
    grid-gap: 8px;
    padding: 0 12px;
    widows: 100%;
    min-height: 72px;
  }
</style>
