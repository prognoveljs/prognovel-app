<script lang="ts">
  import SkeletonShell from "$lib/components/SkeletonShell.svelte";
</script>

<section class="contain">
  <SkeletonShell primaryColor="#3f3f3f" secondaryColor="#5a5a5a" width="100%" height="750">
    <rect width="100%" height="284" x="0" y="0" rx="6" ry="6" />
    <rect width="100%" height="400" x="0" y="350" rx="6" ry="6" />
  </SkeletonShell>
</section>

<style lang="scss">
  section {
    position: relative;
    z-index: 2;
    padding-bottom: 5em;
    padding-top: 24px;
  }
</style>
