<script lang="ts">
  import SectionHeader from "../body/SectionHeader.svelte";
  import { Slider } from "carbon-components-svelte";
  import { fontWeight, fontSize } from "$lib/utils/fonts";
  import { showAdjustFont } from "$lib/store/read-page/state";
  import { MenuState, menuState } from "$lib/components/mobile/menu/_store";

  export let standalone: boolean = false;

  function onBlur() {
    if ($showAdjustFont) $showAdjustFont = false;
  }
  menuState.subscribe((state) => {
    if (state !== MenuState.Shown) $showAdjustFont = false;
  });
</script>

<section on:blur={onBlur} class:standalone class:show={$showAdjustFont}>
  <SectionHeader>Adjust font</SectionHeader>
  <Slider labelText="Font size (in %)" min={75} max={150} bind:value={$fontSize} step={5} />
  <Slider labelText="Font thickness (in %)" min={75} max={150} bind:value={$fontWeight} step={5} />
</section>

<style lang="scss">
  .standalone {
    display: none;
    $rad: 12px;
    position: fixed;
    bottom: var(--mobile-menu-height);
    right: 0;
    padding: 1em 0.75em;
    background-color: var(--foreground-color);
    border-radius: $rad $rad 0 0;
    z-index: 498;
    width: 100%;
    box-shadow: 0 -4px 12px #0004;
    transition: transform 0.2s ease-in;
    transform: translateY(calc(100% + var(--mobile-menu-height))) translateZ(0);

    @include screen("mobile") {
      display: block;
    }
  }

  .show {
    transform: translateY(0) translateZ(0);
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
