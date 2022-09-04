<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import ReadPageSkeletonShell from "$lib/components/read-page/ReadPageSkeletonShell.svelte";

  export let data;
  $: load = data.load;

  onMount(async () => {
    console.log("🚀 redirecting to", load);
    goto("/read/" + load);
  });
</script>

<div class="body">
  <div class="content">
    <article>
      <ReadPageSkeletonShell />
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
