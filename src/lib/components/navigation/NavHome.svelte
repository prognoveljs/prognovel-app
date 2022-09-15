<script lang="ts">
  import { SITE_TITLE } from "$lib/_setting";
  import { path } from "$lib/store/states";

  export let nolabel: boolean = false;

  $: cleanedPath = $path.replace(/\//, "");
  $: pageHeaderTitle = cleanedPath
    ? cleanedPath.slice(0, 1).toUpperCase() + cleanedPath.slice(1)
    : SITE_TITLE;
</script>

<section>
  <a href="/">
    <img src="/logo-64.png" srcset="/logo-64.png 1x, /logo-128.png 2x" alt={SITE_TITLE} />
  </a>
  {#if !nolabel}
    <strong>
      {pageHeaderTitle}
    </strong>
  {/if}
</section>

<style lang="scss">
  section {
    display: flex;
    // position: absolute;
    // bottom: 0;
    // left: 0;
    height: var(--header-height);
    align-items: center;
    user-select: none;

    * {
      -webkit-user-drag: none;
    }

    img {
      width: auto;
      height: var(--header-height);
      margin: 0 1em;
      padding: 0.5em;
    }
    strong {
      font-size: 1.4em;
    }
  }
</style>
