<script>
  import ComingSoon from "$lib/components/ComingSoon.svelte";
  import { SITE_TITLE } from "$lib/_setting";
</script>

<svelte:head>
  <title>Offline Mode | {SITE_TITLE}</title>
</svelte:head>

<div class="container-center">
  <h1>
    Downloaded novels will be shown here, with options to delete or select which novels to fetched
    in the background automatically.
  </h1>
  <ComingSoon marginTop={48} />
</div>
