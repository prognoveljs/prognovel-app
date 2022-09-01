<script lang="ts">
  import { delay } from "$lib/utils/misc";
  import { renderContentReady } from "$lib/utils/read-page";
  import { createEventDispatcher, onMount } from "svelte";
  import Observer from "svelte-intersection-observer";

  export let novel: string = "";
  export let book: string = "";
  export let chapter: string = "";
  $: isRendering = $renderContentReady?.[`${novel}/${book}/${chapter}`];
  const dispatch = createEventDispatcher();
  let nextObserver: HTMLElement;

  let enableOserver = false;
  async function runTimer() {
    await delay(2000);
    enableOserver = true;
  }

  onMount(async () => {
    runTimer();
  });
</script>

{#if enableOserver}
  {#await isRendering ?? new Promise(() => {}) then value}
    <Observer element={nextObserver} once on:intersect={() => dispatch("chapterendviewed")}>
      <div bind:this={nextObserver} />
    </Observer>
  {/await}
{/if}
