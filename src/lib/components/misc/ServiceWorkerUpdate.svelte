<script lang="ts">
  import { browser, dev } from "$app/environment";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import IconSVG from "$lib/components/IconSVG.svelte";
  import reloadIcon from "$lib/assets/feather-icons/refresh-cw.svg?raw";

  let show;
  let count;
  let progress = 0;
  let reloadLabelElement: HTMLElement;
  const MOBILE_BANNER_HEIGHT = "24px";

  let hasFired = false;
  $: if (show && !hasFired) {
    hasFired = true;
    if (browser) {
      document
        .querySelector("body")
        .style.setProperty("--mobile-menu-offset-y", MOBILE_BANNER_HEIGHT);
      document
        .querySelector("body")
        .style.setProperty("--mobile-menu-sw-transition", "transform .425s ease-in");
    }
  }

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

    if (dev) {
      // show = "install";
      // await new Promise((resolve) => setTimeout(resolve, 2 * 1000));
      // show = "activate";
    }
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

  function tapLabel() {
    return browser ? getComputedStyle(reloadLabelElement).getPropertyValue("--tap") : "click";
  }
</script>

<div class="label" bind:this={reloadLabelElement} />

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
      <IconSVG size="1.25em" style="margin-right: 8px" data={reloadIcon} />
      update available - {tapLabel()} to reload
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
    contain: layout;

    &.reload {
      background: hsla(#{$hsl}, 0.4);
      backdrop-filter: blur(14px);
      cursor: pointer;
    }

    @include screen("small-tablet") {
      transition: var(--mobile-menu-sw-transition, none);
      transform: translateY(calc(var(--mobile-menu-offset-y, 0) * -1));
      bottom: calc(var(--mobile-menu-offset-y, 0) * -1);
      height: var(--mobile-menu-offset-y);

      &.reload {
        height: calc(var(--mobile-menu-offset-y) + var(--mobile-menu-height));
      }
    }
  }

  .label {
    --tap: click;

    @include screen("small-tablet") {
      --tap: tap;
    }
  }
</style>
