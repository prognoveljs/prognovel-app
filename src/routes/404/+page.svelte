<script lang="ts">
  import { SITE_TITLE } from "$lib/_setting";
</script>

<svelte:head>
  <title>404 - Not Found | {SITE_TITLE}</title>
</svelte:head>

<div class="container-center">
  <h1>404 - Not found</h1>
  <p>Looks like the page you're looking for doesn't exist... maybe look again from homepage?</p>
  <a href="/" data-sveltekit-preload-data>Go back home</a>
</div>

<style>
  h1 {
    margin-top: 72px;
  }

  a {
    font-weight: 700;
    color: hsl(var(--primary-color-h), 100%, 60%);
  }
</style>
