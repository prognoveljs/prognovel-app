<script lang="ts">
  import { isMobileScreen } from "$lib/utils/mobile";

  import { SITE_TITLE } from "$lib/_setting";

  import { onMount, onDestroy } from "svelte";

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
    <button on:click disabled={!isTimerDone}>Skip ads{duration ? ` (${duration})` : ""}</button>
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

      button {
        padding: 8px 16px;
        margin: 8px auto;
        display: block;
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
</style>
