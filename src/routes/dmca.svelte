<script>
  import ComingSoon from "../components/ComingSoon.svelte";
  // import { onMount } from "svelte";

  // let ActionBottom;

  // onMount(async () => {
  //   if (process.env.TEST_INTERLEDGER === true) {
  //     ActionBottom = (await import(/* webpackChunkName: interledger-plugins */"components/read-page/ActionBottom.svelte")).default;
  //   }
  // });
  // import ActionBottom from "components/read-page/ActionBottom.svelte";
</script>

<svelte:head>
  <title>DMCA Notice</title>
</svelte:head>

<div class="container-center">
  <h1>DMCA notice.</h1>
  <ComingSoon marginTop={48} />
  <!-- {#if ActionBottom}
    <svelte:component this={ActionBottom} />
  {/if} -->
</div>
