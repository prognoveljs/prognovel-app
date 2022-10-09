<script lang="ts">
  import { tick } from "svelte";
  import { ChapterState } from "$lib/utils/read-page/vars";
  import { path } from "$lib/store/states";
  import { browser } from "$app/environment";
  import { currentContent } from "$lib/store/read-page/vars";

  export let isNavigatingBetweenPages: any = false;

  async function startLoading() {
    const loading: HTMLElement = document.createElement("div");
    loading.className = "topbar-loading-animation";
    document.body.appendChild(loading);
  }

  async function stopLoading() {
    if (!browser) return;
    const loadings: NodeListOf<HTMLElement> = document.body.querySelectorAll(
      ".topbar-loading-animation",
    );
    loadings.forEach((loading) => {
      loading.style.opacity = "0%";
      loading.style.animationDuration = "0.125s";
      loading.addEventListener(
        "animationend",
        (e) => {
          setTimeout(() => {
            loading.remove();
          }, 1000);
        },
        {
          once: true,
        },
      );
    });
  }
  $: onReadPage = $path.startsWith("/read");
  $: isLoading =
    ($currentContent?.meta?.status === ChapterState.Loading && onReadPage) ||
    (isNavigatingBetweenPages && !onReadPage);
  $: if (isLoading && browser) {
    startLoading();
  } else {
    tick().then(stopLoading);
  }
</script>

{#if isLoading}
  <div class="topbar-loading-bg" />
{/if}

<style lang="scss">
  $a: 1;
  $color: hsla(#{$h}, #{$s}, #{$l}, #{$a});
  $height: 2.5px;
  $zIndex: 99999999999999999;

  :global(.topbar-loading-animation) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $height;
    background-color: $color;
    z-index: $zIndex;
    // transform: translateX(-100%);
    animation-duration: 12s;
    animation-fill-mode: both;
    transition: opacity 0.75s 0.15s ease-out;
  }

  .topbar-loading-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $height;
    background-color: #666;
    z-index: $zIndex - 1;

    :global(html.light) & {
      background-color: #d8d8d8;
    }
  }
</style>
