<script lang="ts">
  import Stats from "$lib/components/read-page/options/OptionStats.svelte";
  import Community from "$lib/components/read-page/options/OptionCommunity.svelte";
  import Settings from "$lib/components/read-page/options/OptionSettings.svelte";
  import { faCogs, faChartArea, faGlobe, faUsersCog } from "@fortawesome/free-solid-svg-icons";
  import Icon from "$lib/components/Icon.svelte";
  import { Panel } from "$lib/utils/read-page/vars";
  import { fly, fade } from "svelte/transition";
  import { onDestroy, tick } from "svelte";
  import { showStatsAndOptions } from "$lib/store/read-page/state";
  import { windowLock, windowUnlock } from "$lib/utils/window/lock";
  import AdjustFont from "$lib/components/read-page/options/settings/AdjustFont.svelte";
  import { browser } from "$app/environment";

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
    if (!browser) return;
    if (show) {
      windowLock(body);
    } else {
      windowUnlock();
    }
  });

  onDestroy(() => {
    $showStatsAndOptions = false;
  });

  function draglayout(node: HTMLElement) {
    const MIN_WIDTH_BEFORE_HIDE = 300;
    const parentEl = node.parentElement;
    let x: number, y: number, lastX: number, lastY: number;
    let width: number = parseInt(
      getComputedStyle(parentEl).getPropertyValue("--sidebarOptionWidth"),
    );
    node.addEventListener("drag", dragging);
    node.addEventListener("dragstart", dragStart);
    node.addEventListener("dragend", dragEnd);

    function dragging(e) {
      const x1 = x;
      const x2 = parseInt(e.pageX);
      lastX = x2;
      // el. = y;
      const moveX = x1 - x2;
      const MAX_MOVE_X = window.innerWidth * 0.08;
      const MIN_MOVE_X = window.innerWidth * -0.1;
      if (moveX > MAX_MOVE_X || moveX < MIN_MOVE_X || !x1 || !x2) return;

      const parentStyle = node.parentElement.parentElement.style;
      parentStyle.setProperty("--sidebarOptionOffset", `${moveX}px`);
      // if (parentEl.clientWidth < MIN_WIDTH_BEFORE_HIDE) {
      //   parentEl.style.opacity = ".5";
      // } else {
      //   parentEl.style.opacity = "1";
      // }
      // if ()
    }
    function dragStart(e) {
      x = parseInt(lastX || e.pageX);
    }
    function dragEnd(e) {
      x = parseInt(lastX || e.pageX);
      lastX = x;
    }

    return {
      destroy() {
        node.removeEventListener("drag", dragging);
        node.removeEventListener("dragstart", dragStart);
        node.removeEventListener("dragover", dragEnd);
      },
    };
  }
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
      <section in:fly|local={Animation.In()} out:fly|local={Animation.Out()}>
        <Stats />
      </section>
    {:else if panel === Panel.Community}
      <section in:fly|local={Animation.In()} out:fly|local={Animation.Out()}>
        <Community />
      </section>
    {:else if panel === Panel.Settings}
      <section in:fly|local={Animation.In()} out:fly|local={Animation.Out()}>
        <Settings />
      </section>
    {/if}
  </div>
  <div use:draglayout draggable="true" class="layout-drag" />
</article>

<AdjustFont standalone={true} />

<style lang="scss">
  @import "options";

  article {
    box-shadow: 0 -4px 18px #0002;
    position: fixed;
    top: var(--header-height);
    right: 0;
    width: calc(var(--sidebarOptionWidth) + var(--sidebarOptionOffset, 0px));
    height: calc(100vh - var(--header-height));
    display: grid;
    grid-template-rows: auto 1fr;
    padding-top: 2em;
    z-index: 447;

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

  .layout-drag {
    --width: 3px;
    width: var(--width);
    height: 100%;
    position: absolute;
    left: calc(var(--width) / -2);
    cursor: col-resize;
    z-index: 10;
    background-color: var(--primary-color);
    opacity: 0;
    // transition: all 0.125s ease-in;

    // &:hover {
    //   opacity: 0.8;
    // }

    @include screen("tablet") {
      display: none;
    }
  }
</style>
