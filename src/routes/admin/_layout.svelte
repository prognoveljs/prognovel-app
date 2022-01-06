<script lang="ts">
  import AdminSidebar from "components/admin-page/AdminSidebar.svelte";
</script>

<article>
  <AdminSidebar />
  <section class="body">
    <slot />
  </section>
</article>

<style lang="scss">
  article {
    position: relative;
    display: grid;
    grid-template-columns: minmax(300px, 1fr) 5fr;
    grid-template-rows: 1fr;
    min-height: calc(100vh - var(--header-height));

    .body {
      padding: 2em;

      :global(form label) {
        display: block;
      }
    }
  }
</style>
