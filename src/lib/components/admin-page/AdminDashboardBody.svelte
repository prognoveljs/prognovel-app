<script lang="ts">
  import DashboardEmpty from "./body/DashboardEmpty.svelte";

  let workingDirectory: FileSystemDirectoryReader | null = null;
</script>

<section>
  <h1>Welcome</h1>
</section>

<style lang="scss">
  section {
    padding: 2em;
  }
</style>
