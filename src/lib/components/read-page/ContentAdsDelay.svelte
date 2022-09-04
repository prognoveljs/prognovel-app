<script lang="ts">
  import { isMobileScreen } from "$lib/utils/mobile";
  import { isPWABannerActive, showPWAPrompt } from "$lib/utils/pwa";

  import { SITE_TITLE } from "$lib/_setting";

  import { onMount, onDestroy } from "svelte";
  import { DownloadIcon } from "svelte-feather-icons";

  let duration = 5;
  let timer = setInterval(() => {
    duration--;
    if (!duration) clearInterval(timer);
  }, 1000);

  $: isTimerDone = duration <= 0;

  onDestroy(() => {
    if (timer) clearInterval(timer);
  });
</script>

<section>
  <div class="ads-container">
    <span class="square">Ads</span>
  </div>
  <div class="pwa-promotion">
    <h2>Install {SITE_TITLE} app to disable this ads</h2>
    {#if isMobileScreen()}
      Tap Install App on browser's menu.
    {:else}
      Click install button on the right side of your browser's address bar to install {SITE_TITLE} to
      your desktop.
    {/if}
  </div>
</section>

<div class="cta">
  <button class="cta-button secondary" disabled={!$isPWABannerActive} on:click={showPWAPrompt}
    >Install app <DownloadIcon /></button
  >
  <button class="cta-button" on:click disabled={!isTimerDone}
    >Skip ads{duration ? ` (${duration})` : ""}</button
  >
</div>

<style lang="scss">
  section {
    margin-top: 48px;
    display: flex;
    gap: 48px;
    .ads-container {
      width: 30%;
      min-width: 250px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 0.5em;
      flex-shrink: 0;
      .square {
        position: relative;
        width: 250px;
        height: 250px;
        background: #fff2;
        color: #000a;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .pwa-promotion {
      font-size: 15px;
      max-width: 35em;
      line-height: 1.2;

      h2 {
        font-size: 2em;
        margin-top: 0;
        font-weight: 700;
        color: var(--primary-color-lighten-2);
        max-width: 16em;
      }
    }

    @include screen("mobile") {
      padding: 12px;
      flex-direction: column;

      .ads-container {
        width: 100%;
      }
    }
  }

  .cta {
    margin: 5em auto 2em;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 0.5em;
  }
</style>
