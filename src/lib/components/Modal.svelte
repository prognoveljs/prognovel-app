<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import { windowLock, windowUnlock } from "$lib/utils/window/lock";
  import { scale, fade } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { browser } from "$app/environment";

  export let showModal: boolean;
  export let header: string = "";
  export let padding: string = "24px 24px 64px";
  export let width: number = 500;
  export let top: string = "20%";
  export let opacity: number = 0.35;
  export let borderTop: boolean = false;
  export let style: string = "";

  const dispatch = createEventDispatcher();

  $: if (showModal === true && browser) {
    windowLock();
  }
  $: if (showModal === false && browser) {
    windowUnlock();
  }

  function handlePressKey(e) {
    if (!showModal) return;

    if (e.key === "Escape") close();
  }

  const close = () => dispatch("close");
</script>

<svelte:window on:keyup={handlePressKey} />
{#if showModal}
  <div
    in:fade={{ duration: 125, easing: cubicOut }}
    out:fade={{ duration: 450, easing: cubicIn }}
    class="overlay"
    style="opacity: {opacity};"
    on:click={() => close()}
  />

  <article
    class="modal"
    class:borderTop
    in:scale={{ duration: 225, start: 0.8, opacity: 0, easing: cubicOut }}
    out:scale={{ duration: 325, start: 0.9, opacity: 0, easing: cubicIn }}
    style="padding: {padding}; --modalWidth: {width}px; --modalTop: {top}; {style}"
  >
    {#if header}
      <h1>{header}</h1>
    {/if}
    <slot />
    <section class="footer">
      <slot name="footer" />
    </section>
  </article>
{/if}

<style lang="scss">
  $zIndex: 999999;
  article {
    --borderRadius: 4px;
    width: var(--modalWidth, 500px);
    position: fixed;
    top: var(--modalTop, 20%);
    min-height: 250px;
    left: calc(50% - (var(--modalWidth) / 2));
    background-color: var(--foreground-color);
    z-index: $zIndex;
    border-radius: var(--borderRadius);
    overflow: hidden;

    h1 {
      margin: 0;
      margin-bottom: 0.6em;
      line-height: 1;
    }

    .footer {
      position: absolute;
      bottom: 12px;
      right: 12px;

      :global(button) {
        padding: 8px 16px;
        font-weight: 500;
        user-select: none;
        cursor: pointer;
        border: none;
      }

      :global(button.secondary) {
        color: var(--text-header-color);
        background: none;

        &:hover {
          background: #0002;
        }
      }
    }

    &.borderTop {
      border-top: 2px solid var(--primary-color);
      border-radius: 0 0 var(--borderRadius) var(--borderRadius);
    }
  }

  @media screen and (max-width: 768px) {
    article {
      --modalWidth: 95vw !important;
    }
  }

  .overlay {
    z-index: $zIndex - 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
  }
</style>
