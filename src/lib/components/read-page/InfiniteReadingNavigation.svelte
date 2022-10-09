<script lang="ts">
  import { showTOC } from "$lib/store/read-page/state";
  import { ListIcon } from "svelte-feather-icons";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  let show = true;
  let timeout = startTimer();
  const HIDE_DELAY = 2500;

  function startTimer() {
    return setTimeout(() => {
      show = false;
      mouseX = null;
      mouseY = null;
    }, HIDE_DELAY);
  }

  let mouseX: number;
  let mouseY: number;
  let X_THRESHOLD = 200;
  let Y_THRESHOLD = 120;
  function onMouseMove(e) {
    if (!mouseX) mouseX = e.x;
    if (!mouseY) mouseY = e.y;
    if (mouseX - e.x > X_THRESHOLD || mouseX - e.x < -1 * X_THRESHOLD) reset_timer();
    if (mouseY - e.x > Y_THRESHOLD || mouseY - e.y < -1 * Y_THRESHOLD) reset_timer();

    function reset_timer() {
      show = true;
      clearTimeout(timeout);
      timeout = startTimer();
    }
  }
</script>

<svelte:window on:mouseover={onMouseMove} />

{#if show}
  <section
    in:fly={{ duration: 200, easing: cubicOut, y: 16 }}
    out:fly={{ duration: 420, easing: cubicIn, y: 8 }}
  >
    <div on:click={() => ($showTOC = true)} class="toc"><ListIcon size="22" /> Chapter list</div>
  </section>
{/if}

<style lang="scss">
  section {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.25em 1.1em;
    border: 4px;
    background-color: #0004;
    backdrop-filter: blur(8px);
    border: 2px solid hsla(#{$hsl}, 0.1);
    border-radius: 8px;

    div {
      padding: 8px 16px;
      background-color: var(--primary-color-darken-1);
      display: flex;
      align-items: center;
      gap: 0.5em;
      filter: contrast(82%);
      border-radius: 4px;
      cursor: pointer;
      user-select: none;

      &:hover {
        filter: contrast(100%);
      }

      :global(svg) {
        padding-bottom: 2px;
      }
    }
  }
</style>
