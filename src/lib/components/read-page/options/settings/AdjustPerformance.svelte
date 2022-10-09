<script lang="ts">
  import { asyncTextRendering } from "$lib/store/read-page/state";
  import { CpuIcon } from "svelte-feather-icons";
  import SectionHeader from "../body/SectionHeader.svelte";
</script>

<SectionHeader Icon={CpuIcon}>Tweak performance</SectionHeader>
<div class="checkbox">
  <div class="async-text-perf option__checkbox">
    <label for="async-render">Asynchronous Text Rendering</label>
    <input type="checkbox" id="async-render" bind:checked={$asyncTextRendering} />
  </div>
  <div class="option__desc">
    Experimental feature: render chapter text chunk by chunk, reducing performance bottleneck
    rendering long chapters on slower devices.
  </div>
</div>

<style lang="scss">
  @import "../option-body.scss";
</style>
