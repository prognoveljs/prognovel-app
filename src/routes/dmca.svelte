<script>
  import ComingSoon from "$lib/components/ComingSoon.svelte";
  import { SITE_TITLE } from "$lib/_setting";
  // import { onMount } from "svelte";

  // let ActionBottom;

  // onMount(async () => {
  //   if (import.meta.env.TEST_INTERLEDGER === true) {
  //     ActionBottom = (await import(/* webpackChunkName: interledger-plugins */"components/read-page/ActionBottom.svelte")).default;
  //   }
  // });
  // import ActionBottom from "$lib/components/read-page/ActionBottom.svelte";
</script>

<svelte:head>
  <title>DMCA Notice | {SITE_TITLE}</title>
</svelte:head>

<div class="container-center">
  <h1>DMCA notice.</h1>
  <ComingSoon marginTop={48} />
  <!-- {#if ActionBottom}
    <svelte:component this={ActionBottom} />
  {/if} -->
</div>
