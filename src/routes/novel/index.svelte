<script lang="ts">
  import NavMobile from "$lib/components/NavMobile.svelte";
  import { SITE_TITLE } from "$lib/_setting";
  import IndexNovelBody from "./_IndexNovelBody.svelte";
  import IndexNovelHead from "./_IndexNovelHead.svelte";
</script>

<svelte:head>
  <title>Explore Novels | {SITE_TITLE}</title>
</svelte:head>
<NavMobile />
<div class="container-center body">
  <IndexNovelHead />
  <IndexNovelBody />
</div>

<style lang="scss">
  .body {
    max-width: 1024px !important;
  }
</style>
