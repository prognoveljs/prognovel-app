<script lang="ts">
  import SkeletonShell from "$lib/components/SkeletonShell.svelte";

  export let horizontalLine = true;
</script>

<section>
  <SkeletonShell width="100%" height="64" primaryColor="#EBECEFAA" secondaryColor="#F5F5F7EE">
    <rect width="70%" height="1.3em" x="0" y="0" rx="4" ry="4" />
    <circle r="16" cx="16" cy="3em" />
    <rect width="40%" height="1em" x="38" y="2.5em" rx="4" ry="4" />
    <rect width="20%" height="0.8em" x="80%" y="2.66em" rx="4" ry="4" />
  </SkeletonShell>
  {#if horizontalLine}
    <div class="horizontal-line" />
  {/if}
</section>

<style lang="scss">
  @import "shared";
  $color: #fff5;

  section {
    // padding: 8px;
    // width: 100%;
    position: relative;
    padding: 0.75em $news-bleed-padding 0.5em;
    margin: 0 #{$news-bleed-padding * -1} 0 #{$news-bleed-padding * -1};
  }
</style>
