<script>
  import { isWebMonetizationActive } from "$lib/utils/web-monetization";

  export let width = "100%";
  export let height = "190px";
  export let grid = "";

  let adsenseClient = "";
  export let adSlot = "";
</script>

<div class="ads" style="width: {width}; height: {height}; grid-area: {grid}">
  {#if adsenseClient && $isWebMonetizationActive !== undefined}
    <div class="ads-widget-container">
      <ins
        class="adsbygoogle"
        style="display:block"
        data-ad-client={adsenseClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  {:else}
    <span>Ads</span>
  {/if}
</div>

<style lang="scss">
  .ads {
    display: flex;
    background: #666a;
    margin: var(--margin, auto);
    position: relative;

    &::after {
      content: "promoted";
      position: absolute;
      top: -1.6em;
      right: 0;
      // font-style: italic;
      opacity: 0.7;
    }
  }

  span {
    margin: auto;
    font-size: 24px;
    font-weight: 700;
  }
</style>
