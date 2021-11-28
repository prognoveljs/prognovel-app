<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  let show;
  let count;
  let progress = 0;

  onMount(async () => {
    const broadcast = new BroadcastChannel("service-worker");
    broadcast.onmessage = (ev) => {
      const { type, fileCount, fileDownloaded } = ev.data;
      if (type) show = type;
      if (fileCount) count = fileCount;
      if (fileDownloaded && fileDownloaded > progress) {
        progress = fileDownloaded;
        if (type !== "activate" && type !== "install") {
          show = "install";
        }
      }
    };

    await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
    if (!show) checkServiceWorkerUpdate();
  });

  function checkServiceWorkerUpdate() {
    setInterval(() => {
      navigator.serviceWorker.ready.then((sw) => sw.update());
    }, 5000);
  }

  function refresh() {
    if (show !== "activate") return;
    window.location.reload();
  }
</script>

{#if show}
  {#if show === "install"}
    <article
      class="installing"
      in:fly={{
        duration: 225,
        opacity: 1,
        y: 12,
      }}
      out:fly={{
        duration: 100,
        opacity: 1,
        y: 12,
      }}
      class:reload={show === "activate"}
    >
      downloading app update... {count ? `(${progress}/${count})` : ""}
    </article>
  {:else if show === "activate"}
    <article
      in:fly={{
        duration: 225,
        delay: 75,
        opacity: 1,
        y: 12,
      }}
      out:fly={{
        duration: 100,
        opacity: 1,
        y: 12,
      }}
      on:click={refresh}
      class="reload"
    >
      update available - please reload
    </article>
  {/if}
{/if}

<style lang="scss">
  article {
    $zIndex: 999999999999999;
    background: #333;
    position: fixed;
    z-index: $zIndex;

    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 8px;
    user-select: none;

    &.reload {
      background: var(--primary-color);
      cursor: $zIndex + 1;
    }
  }
</style>
