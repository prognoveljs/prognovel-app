<script>
  import { asyncTextRendering } from "store/read-page";
  import SectionHeader from "./body/SectionHeader.svelte";
  import SettingsLayout from "./layout/SettingsLayout.svelte";
  import { Slider } from "carbon-components-svelte";
  import AdjustFont from "./settings/AdjustFont.svelte";
</script>

<!-- Fonts -->
<AdjustFont />

<!-- Layout -->
<SectionHeader>Layout and themes</SectionHeader>
<div style="pointer-events: none; position: relative;">
  <div style="opacity: 0.35; filter: blur(2.5px);">
    <SettingsLayout />
    <Slider labelText="Adjust contrast" min={75} max={200} value={100} step={5} />
    <Slider labelText="Adjust background hue" min={0} max={360} value={14} step={1} />
  </div>
  <span
    style="height: 100%; font-weight: 500; width: 100%; top: 35%; font-size: 1.325em;position: absolute; text-align: center;"
  >
    🚧 under construction 🚧
  </span>
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
</style>
