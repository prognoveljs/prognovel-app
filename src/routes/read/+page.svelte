<script context="module">
  import { isBrowser } from "$lib/store/states";
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({}) {
    return {
      props: { load: isBrowser ? new URL(location.href).searchParams.get("load") : "" },
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  // import { getLoadingPlaceholder } from "$lib/utils/read-page";

  export let load;

  onMount(async () => {
    console.log("🚀 redirecting to", load);
    goto("/read/" + load);
  });
</script>

<div class="body">
  <div class="content">
    <article>
      <!-- {@html getLoadingPlaceholder().html} -->
    </article>
    <div class="options dummy" />
  </div>
</div>

<style lang="scss">
  @import "vars";
  @import "slug";
  @import "options";

  article {
    --fontSizeBase: #{$fontSizeBase};
    --fontResponsiveRatio: #{$fontResponsiveRatio};
    --textWidth: #{$textWidth};
    --contentMaxWidth: #{$contentMaxWidth};
    margin: 0 auto;
    margin-top: 280px;
    width: 100%;
    max-width: var(--contentMaxWidth);
    padding: $contentPadding;
  }

  .dummy {
    position: relative;
    z-index: 10;
  }
</style>
