<script lang="ts">
  import SectionHeader from "../body/SectionHeader.svelte";
  import { Slider } from "carbon-components-svelte";
  import SettingsLayout from "$lib/components/read-page/options/layout/SettingsLayout.svelte";
  import { colorContrast } from "$lib/utils/fonts/background-contrast";
  import { colorHue, colorizedBackground } from "$lib/utils/fonts/background-hue";
  import { ImageIcon } from "svelte-feather-icons";
</script>

<SectionHeader Icon={ImageIcon}>Layout and themes</SectionHeader>
<div style="position:relative;">
  <div style="opacity: 0.35; filter: blur(2.5px);">
    <SettingsLayout />
  </div>
  <span
    style="height: 100%; font-weight: 500; width: 100%; top: 35%; font-size: 1em;position: absolute; text-align: center;"
    >🚧 some features under construction 🚧
  </span>
</div>
<Slider labelText="Adjust contrast" bind:value={$colorContrast} min={75} max={150} step={5} />

<div class="checkbox">
  <div class="use-colorized-background option__checkbox">
    <label for="colorized-background">Colorized background</label>
    <input type="checkbox" id="colorized-background" bind:checked={$colorizedBackground} />
  </div>
  <div class="option__desc colorized-background-desc">
    Add color to reading page body. Affected when adjusting contrast and background hue slider.
  </div>
</div>
<div class="disabled" class:enabled={$colorizedBackground}>
  <Slider labelText="Adjust background hue" min={0} max={360} bind:value={$colorHue} step={1} />
</div>

<style lang="scss">
  @import "../option-body.scss";
  .use-colorized-background {
    margin: {
      top: 1em;
    }
  }
  .colorized-background-desc {
    margin-bottom: 0.6em;
  }

  .disabled {
    pointer-events: none;
    opacity: 0.6;
    filter: blur(1px);
  }
  .enabled {
    pointer-events: all;
    opacity: 1;
    filter: none;
  }
</style>
