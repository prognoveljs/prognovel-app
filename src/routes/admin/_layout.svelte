<script lang="ts">
  import AdminPageNotConnected from "components/admin-page/AdminPageNotConnected.svelte";
  import AdminSidebar from "components/admin-page/AdminSidebar.svelte";
  import { onDestroy, onMount } from "svelte";
  import { destroyAdminGUI, initializeAdminGUI } from "utils/admin";
  import { isAdminGUIConnected } from "utils/admin/_store";

  onMount(() => {
    initializeAdminGUI();
  });

  onDestroy(() => {
    console.log("Destroy admin GUI");
    destroyAdminGUI();
  });
</script>

<article>
  <AdminSidebar />
  <section class="body">
    {#if $isAdminGUIConnected}
      <slot />
    {:else}
      <AdminPageNotConnected />
    {/if}
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

      :global(h1) {
        display: block;
        font-weight: 700;
      }

      :global(label) {
        display: block;
        margin-top: 1em;
      }

      :global(input[type="text"]) {
        padding: 0.25em 0.5em;
        color: #000a;
      }

      :global(button.submit) {
        padding: 0.25em 1em 0.25em 0.7em;
        align-self: flex-end;
        margin-top: 1em;
      }
    }
  }
</style>
