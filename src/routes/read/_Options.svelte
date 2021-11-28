<script lang="ts">
  import Stats from "components/read-page/options/OptionStats.svelte";
  import Community from "components/read-page/options/OptionCommunity.svelte";
  import Settings from "components/read-page/options/OptionSettings.svelte";
  import { faCogs, faChartArea, faGlobe, faUsersCog } from "@fortawesome/free-solid-svg-icons";
  import Icon from "components/Icon.svelte";
  import { Panel } from "utils/read-page/vars";
  import { fly, fade } from "svelte/transition";
  import { onDestroy, tick } from "svelte";
  import { showStatsAndOptions } from "store/read-page/read-page-state";
  import { windowLock, windowUnlock } from "utils/window/lock";
  import AdjustFont from "components/read-page/options/settings/AdjustFont.svelte";

  let body;
  let panel = Panel.Stats;
  let previousPanel = 0;
  $: if (panel) {
    tick().then(() => {
      previousPanel = panel;
    });
  }

  const Animation = {
    In() {
      const isLeft = panel < previousPanel;
      return {
        x: isLeft ? 12 : -12,
        duration: 275,
        // easing: cubicIn,
      };
    },
    Out() {
      const isLeft = panel < previousPanel;
      return {
        x: isLeft ? -6 : 6,
        duration: 125,
        // easing: cubicOut,
      };
    },
  };

  showStatsAndOptions.subscribe((show: boolean) => {
    if (!(process as any).browser) return;
    if (show) {
      windowLock(body);
    } else {
      windowUnlock();
    }
  });

  onDestroy(() => {
    $showStatsAndOptions = false;
  });
</script>

<div
  style="display:none"
  tabindex="0"
  on:click={() => ($showStatsAndOptions = true)}
  class="focus-btn"
>
  <Icon icon={faCogs} color="#fffd" size="1.7em" />
</div>
{#if $showStatsAndOptions}
  <div
    in:fade={{ duration: 400 }}
    out:fade={{ duration: 150 }}
    class="overlay"
    on:click={() => ($showStatsAndOptions = false)}
  />
{/if}
<article bind:this={body} class:show={$showStatsAndOptions} class="options">
  <div class="header">
    <button class:selected={panel === Panel.Stats} on:click={() => (panel = Panel.Stats)}>
      <Icon marginRight="8px" color="#fffd" icon={faChartArea} size="1.25em" />
      Stats
    </button>
    <button class:selected={panel === Panel.Community} on:click={() => (panel = Panel.Community)}>
      <Icon marginRight="8px" color="#fffd" icon={faGlobe} size="1.5em" />
      Community
    </button>
    <button class:selected={panel === Panel.Settings} on:click={() => (panel = Panel.Settings)}>
      <Icon marginRight="8px" color="#fffd" icon={faUsersCog} size="1.5em" />
      Settings
    </button>
  </div>
  <div class="body">
    {#if panel === Panel.Stats}
      <section in:fly={Animation.In()} out:fly={Animation.Out()}>
        <Stats />
      </section>
    {:else if panel === Panel.Community}
      <section in:fly={Animation.In()} out:fly={Animation.Out()}>
        <Community />
      </section>
    {:else if panel === Panel.Settings}
      <section in:fly={Animation.In()} out:fly={Animation.Out()}>
        <Settings />
      </section>
    {/if}
  </div>
</article>

<AdjustFont standalone={true} />

<style lang="scss">
  @import "options";

  article {
    box-shadow: 0 -4px 18px #0002;
    position: fixed;
    top: var(--header-height);
    right: 0;
    width: var(--sidebarOptionWidth);
    height: calc(100vh - var(--header-height));
    display: grid;
    grid-template-rows: auto 1fr;
    padding-top: 2em;

    .header {
      position: relative;
      display: grid;
      gap: 0.2em;
      grid-template-columns: repeat(3, minmax(0, 8em));

      &::after {
        --height: 30px;
        z-index: 4;
        content: "";
        position: absolute;
        bottom: calc(var(--height) * -1);
        left: 0;
        width: 100%;
        height: var(--height);
        background: linear-gradient(to top, transparent, #{$background-color} 80%);
      }

      button {
        --border-alpha: 0.4;
        --icon-alpha: 0.6;
        --bg-alpha: 0;
        --text-alpha: 0.75;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;
        border: none;
        outline: none;
        border-bottom: 2px solid hsla(#{$hsl}, var(--border-alpha));
        color: hsla(#{$hsl}, var(--text-alpha));
        padding: 12px 24px;
        background: hsla(#{$hsl}, var(--bg-alpha));
        font-weight: 700;
        -webkit-tap-highlight-color: #0000;
        // width: 5em;

        &:hover {
          --bg-alpha: 0.4;
        }

        &.selected {
          --text-alpha: 1;
          --border-alpha: 1;
          --icon-alpha: 1;
        }

        :global(path) {
          opacity: var(--icon-alpha);
        }
      }
    }

    &.show {
      transform: translateX(0) translateY(0);
    }

    @include screen("tablet") {
      transform: translateX(var(--sidebarOptionWidth));
      transition: transform 0.25s ease-in-out;
    }

    @include screen("mobile") {
      $rad: 12px;
      $top: 14vh;
      top: 0;
      transform: translateY(100vh) translateZ(0);
      transition: transform 0.4s ease-in;
      border-radius: $rad $rad 0 0;
      width: 100%;
      height: calc(100vh - #{$top});
      z-index: 498;
      will-change: transform;

      &.show {
        transform: translateY($top) translateZ(0);
      }
    }
  }

  .body {
    position: relative;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }

    section {
      position: absolute;
      top: 0;
      left: $margin-side;
      width: calc(100% - #{$margin-side * 2});
      height: 100%;
      padding: 18px 0 calc(1em + var(--mobile-menu-height));
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }

      @media screen and (max-width: 768px) {
        & {
          position: relative;
        }
      }
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0005;
    z-index: 447;
  }

  @include screen("tablet") {
    .focus-btn {
      display: block !important;
      position: fixed;
      top: calc(var(--header-height) + 16px);
      right: 16px;
      padding: 8px;
      border-radius: 50%;
      background: var(--primary-color);
      box-shadow: 0 4px 8px #0005;
    }
  }
  @include screen("mobile") {
    .focus-btn {
      display: none !important;
    }
  }
</style>
