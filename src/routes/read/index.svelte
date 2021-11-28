<script context="module">
  let load;

  export async function preload(page) {
    const { query } = page;

    load = query.load;
  }
</script>

<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";
  import { getLoadingPlaceholder } from "utils/read-page";

  export let load;

  onMount(async () => {
    if (load) {
      goto("/read/" + load);
      return;
    }

    const redirect = document.head.querySelector('meta[name="redirect"]');
    if (redirect) goto(redirect.content);
  });
</script>

<div class="body">
  <div class="content">
    <article>
      {@html getLoadingPlaceholder().html}
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
