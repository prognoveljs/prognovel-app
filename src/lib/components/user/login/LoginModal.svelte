<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import PasswordLogin from "./PasswordLogin.svelte";
  import { createEventDispatcher } from "svelte";
  import OauthLogin from "./OauthLogin.svelte";

  const dispatch = createEventDispatcher();
  export let isModal = false;
</script>

{#if isModal}
  <div
    in:fade={{ duration: 425, easing: cubicOut }}
    out:fade={{ duration: 600, easing: cubicIn }}
    class="overlay"
    on:click={() => dispatch("close")}
  />
{/if}

<article
  class:isModal
  in:fly={{ y: -14, duration: 225, easing: cubicOut }}
  out:fly={{ y: 27, duration: 425, easing: cubicIn }}
>
  <h1>👋 Welcome!</h1>
  <PasswordLogin />
  <div class="separator"><em>or</em></div>
  <OauthLogin />
</article>

<style lang="scss">
  $zIndex: 9999999999;
  article {
    width: 450px;
    max-width: 100vw;
    padding: 24px;
    padding-bottom: 32px;
    top: 14%;
    margin: 0 auto;
    background-color: var(--foreground-color);
    z-index: $zIndex;
    position: relative;
    border-top: 2px solid var(--primary-color-darken-1);
    isolation: isolate;
    overflow: hidden;

    &.isModal {
      position: fixed;
      left: calc(50% - 225px);
    }

    :global {
      h1 {
        font-weight: 700;
      }
    }

    .separator {
      $width: 42%;
      $offset: 2.5%;
      margin: 1.5em auto 2em;
      text-align: center;
      position: relative;

      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        width: $width;
        left: $offset;
        height: 1px;
        background-color: #fff8;
      }

      &::after {
        left: auto;
        right: $offset;
      }
    }
  }

  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #0006;
    backdrop-filter: blur(10px);
    z-index: $zIndex;
  }
</style>
