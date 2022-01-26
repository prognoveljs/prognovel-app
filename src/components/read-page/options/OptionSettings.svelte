<script>
  import { asyncTextRendering } from "store/read-page";
  import SectionHeader from "./body/SectionHeader.svelte";
  import SettingsLayout from "./layout/SettingsLayout.svelte";
  import { Slider } from "carbon-components-svelte";
  import AdjustFont from "./settings/AdjustFont.svelte";
  import { colorContrast } from "utils/fonts/background-contrast";
  import { colorHue, colorizedBackground } from "utils/fonts/background-hue";
</script>

<!-- Fonts -->
<AdjustFont />

<!-- Layout -->
<SectionHeader>Layout and themes</SectionHeader>
<div style="position:relative;">
  <div style="opacity: 0.35; filter: blur(2.5px);">
    <SettingsLayout />
  </div>
  <span
    style="height: 100%; font-weight: 500; width: 100%; top: 35%; font-size: 1.25em;position: absolute; text-align: center;"
    >🚧 some features under construction 🚧
  </span>
</div>
<Slider labelText="Adjust contrast" bind:value={$colorContrast} min={75} max={150} step={5} />
<div class="use-colorized-background option__checkbox">
  <label for="colorized-background">Colorized background</label>
  <input type="checkbox" id="colorized-background" bind:checked={$colorizedBackground} />
</div>
<div class="option__desc colorized-background-desc">
  Experimental feature: render chapter text chunk by chunk, reducing performance bottleneck
  rendering long chapters on slower devices.
</div>
<div class="disabled" class:enabled={$colorizedBackground}>
  <Slider labelText="Adjust background hue" min={0} max={360} bind:value={$colorHue} step={1} />
</div>

<!-- Performance -->
<SectionHeader>Tweak performance</SectionHeader>
<div class="async-text-perf option__checkbox">
  <label for="async-render">Asynchronous Text Rendering</label>
  <input type="checkbox" id="async-render" bind:checked={$asyncTextRendering} />
</div>
<div class="option__desc">
  Experimental feature: render chapter text chunk by chunk, reducing performance bottleneck
  rendering long chapters on slower devices.
</div>

<style lang="scss">
  @import "option-body.scss";

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
    filter: blur(2px);
  }
  .enabled {
    pointer-events: all;
    opacity: 1;
    filter: none;
  }
</style>
