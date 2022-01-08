<script lang="ts">
  import DashboardEmpty from "./body/DashboardEmpty.svelte";

  let workingDirectory: FileSystemDirectoryReader | null = null;
</script>

<section>
  {#if workingDirectory}
    ...
  {:else}
    <DashboardEmpty />
  {/if}
</section>

<style lang="scss">
  section {
    padding: 2em;
  }
</style>
