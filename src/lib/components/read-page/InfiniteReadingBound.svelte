<script lang="ts">
  import { delay } from "$lib/utils/misc";
  import { renderContentReady } from "$lib/utils/read-page";
  import { createEventDispatcher, onMount } from "svelte";
  import Observer from "svelte-intersection-observer";

  export let novel: string = "";
  export let book: string = "";
  export let chapter: string = "";
  export let timer: number = 0;
  export let rootMargin: string = "";
  $: isRendering = $renderContentReady?.[`${novel}/${book}/${chapter}`];
  const dispatch = createEventDispatcher();
  let nextObserver: HTMLElement;

  let enableOserver = false;
  async function runTimer() {
    await delay(timer);
    enableOserver = true;
  }

  const trigger = () => {
    dispatch("chapterendviewed");
    dispatch("viewed");
  };

  onMount(async () => {
    runTimer();
  });
</script>

{#if enableOserver}
  {#await isRendering ?? new Promise(() => {}) then value}
    <Observer {rootMargin} element={nextObserver} once on:intersect={trigger}>
      <div bind:this={nextObserver} />
    </Observer>
  {/await}
{/if}
