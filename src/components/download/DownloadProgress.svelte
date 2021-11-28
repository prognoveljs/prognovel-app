<script>
  import { fly } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { downloadProgress, downloadCount, downloadNovel, clearDownload } from "utils/offline-reading/store";

  let pool;
  let downloaded;
  let title;
  $: downloading = ((downloaded / pool) * 100).toFixed(2);
  $: if ($downloadProgress !== undefined) {
    downloaded = $downloadProgress;
  }
  $: if ($downloadCount !== undefined) {
    pool = $downloadCount;
  }
  $: if ($downloadNovel !== undefined) {
    title = $downloadNovel;
  }

  function clear() {
    pool = undefined;
    downloaded = undefined;
    title = "";
    clearDownload();
  }
</script>

{#if pool !== undefined}
  <div transition:fly={{ duration: 300, y: 4, easing: cubicIn }} class="download-downloaded">
    {#if downloading >= 99.99}
      <h3 class="head">Download complete.</h3>
      <button class="btn-clear" on:click={clear}>Close</button>
    {:else if downloaded > 0}
      <h3 class="head">Downloading... {downloading || 0}%</h3>
    {:else}
      <h3 class="head">Connecting...</h3>
    {/if}
    <h5 class="novel-title">{title}</h5>
  </div>
{/if}

<style>
  .download-downloaded {
    --margin: 16px;
    --padding: 16px;
    position: fixed;
    bottom: var(--margin);
    right: var(--margin);
    width: 300px;
    min-height: 95px;
    padding: var(--padding);
    border-radius: 4px;
    z-index: 99999999999999999999;
    border: 1.65px solid hsla(var(--primary-color-h), var(--primary-color-s), var(--primary-color-l), 0.33);
    background-color: var(--foreground-color);
    box-shadow: 0 4px 12px #0003, 0 6px 24px 12px #0001;
  }

  .head {
    margin-top: 0;
    margin-bottom: 4px;
  }
  .novel-title {
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 300;
    opacity: 0.8;
  }

  .btn-clear {
    position: absolute;
    bottom: 8px;
    right: 8px;
    padding: 4px 12px;
  }
</style>
