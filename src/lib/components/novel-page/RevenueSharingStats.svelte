<script lang="ts">
  import { revShareUsersLite } from "$lib/utils/web-monetization";
  import RevShareUser from "$lib/components/web-monetization/RevShareUser.svelte";
  import RevShareUserDetails from "$lib/components/web-monetization/RevShareUserDetails.svelte";
  import { showRevshareStats } from "$lib/store/novel-page";
  import { windowLock, windowUnlock } from "$lib/utils/window/lock";
  import { fade } from "svelte/transition";
  import { browser } from "$app/environment";

  let body;

  showRevshareStats.subscribe((show: boolean) => {
    if (!browser) return;
    if (show) {
      windowLock(body);
    } else {
      windowUnlock();
    }
  });
</script>

{#if $showRevshareStats}
  <div
    in:fade={{ duration: 400 }}
    out:fade={{ duration: 150 }}
    class="overlay"
    on:click={() => ($showRevshareStats = false)}
  />
{/if}

<article bind:this={body} class:show={$showRevshareStats} class="container-center">
  <h2>
    <span class="money">💸💸💸 </span>
    <br />Revenue from subscribing readers will be split to...
  </h2>
  <section class="grid">
    {#each $revShareUsersLite.length ? $revShareUsersLite : Array(3).fill( { paymentPointer: "" }, ) as user}
      <RevShareUser {...user} />
    {/each}
    <RevShareUserDetails />
  </section>
</article>

<style lang="scss">
  article {
    --animation-speed: 0.325s;
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, 132px);
      gap: 8px;
      font-size: calc(var(--screenRatio, 1) * 1em);

      @include screen("tablet") {
        justify-content: space-around;
        --screen-ratio: 0.6;
      }

      @include screen("mobile") {
        --screen-ratio: 0.4;
      }
    }

    .money {
      letter-spacing: 0.25em;
      font-size: 1.6em;
    }

    @include screen("mobile") {
      @include mobile-modal();
      .grid {
        max-height: 50vh;
        overflow-y: scroll;
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
</style>
