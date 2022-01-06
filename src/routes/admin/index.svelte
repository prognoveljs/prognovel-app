<script lang="ts">
  import AdminDashboardBody from "components/admin-page/AdminDashboardBody.svelte";
  import AdminSidebar from "components/admin-page/AdminSidebar.svelte";
</script>

<article>
  <AdminSidebar />
  <AdminDashboardBody />
</article>

<style lang="scss">
  article {
    position: relative;
    display: grid;
    grid-template-columns: minmax(300px, 1fr) 5fr;
    grid-template-rows: 1fr;
    min-height: calc(100vh - var(--header-height));
  }
</style>
