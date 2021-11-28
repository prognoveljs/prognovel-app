<script lang="ts">
  import { faDownload } from "@fortawesome/free-solid-svg-icons/faDownload";
  import Icon from "components/Icon.svelte";
  import DownloadLoadingSVG from "./DownloadLoadingSVG.svelte";
  import { startDownload } from "utils/offline-reading/download";
  import { downloadProgress } from "utils/offline-reading/store";

  export let id = "";
  export let novelMetadata = {};
  export let mobileDisplay: "block" | "none" = "none";

  export let isDownloading = false;
  let iconSize = 24;

  const download = () => {
    if (!isDownloading) {
      startDownload(id, novelMetadata);
    }
  };
</script>

<div
  style="--mobile-display: {mobileDisplay};"
  tabindex="0"
  class="btn"
  class:disabled={isDownloading}
  on:click={download}
>
  {#if isDownloading}
    <DownloadLoadingSVG />
  {:else}
    <Icon size={iconSize + "px"} color={"#fffd"} paddingBottom={"3px"} icon={faDownload} />
  {/if}
  <span>Save Offline</span>
</div>

<style lang="scss">
  $button__transparent: 0.44;

  .btn {
    --bg-alpha: #{$button__transparent / 3};
    --border-alpha: #{$button__transparent};
    --bg-light: 56%;
    --border-light: 56%;
    border: 2px solid transparent;
    border-color: hsla(
      var(--primary-color-h),
      var(--primary-color-s),
      var(--border-light),
      var(--border-alpha)
    );
    background-color: hsla(
      var(--primary-color-h),
      var(--primary-color-s),
      var(--bg-light),
      var(--bg-alpha)
    );

    padding: 4px 16px;
    width: 100%;
    color: #fff;
    font-size: 1em;
    // letter-spacing: 0.01em;
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
    outline: none;
    border-radius: 2px;
    white-space: nowrap;
    // box-shadow: 0 4px 12px #0001, 0 2px 4px #0003;

    :global(svg) {
      color: #fffd !important;
      margin-right: 12px !important;
    }

    :global(html.light) & {
      --bg-light: 46%;
      --border-light: 40%;
      --bg-alpha: #{$button__transparent * 1.8};
      --border-alpha: #{$button__transparent * 2.1};
    }

    &:hover:not(.disabled) {
      --bg-alpha: #{$button__transparent};

      :global(html.light) & {
        --bg-alpha: var(--border-alpha);
      }
    }

    span {
      transition: all 0.325s ease-in-out;
    }

    @include screen("mobile") {
      display: var(--mobile-display) !important;
      // width: 100%;
      margin: 0 auto;
    }
  }

  .disabled {
    box-shadow: none;
    color: #fff8;
    filter: grayscale(40%) saturate(70%);
    cursor: auto;
    border-color: transparent;

    span {
      transform: translateX(4px);
    }
  }
</style>
