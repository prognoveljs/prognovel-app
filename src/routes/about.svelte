<script lang="ts">
  import ComingSoon from "$lib/components/ComingSoon.svelte";
  import { SITE_TITLE } from "$lib/_setting";
</script>

<svelte:head>
  <title>Offline Mode | {SITE_TITLE}</title>
</svelte:head>

<div class="container-center">
  <h1>About</h1>
  <ComingSoon marginTop={78} />
</div>
