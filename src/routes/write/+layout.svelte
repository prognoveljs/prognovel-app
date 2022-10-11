<script lang="ts">
  import WriteSidebar from "$lib/components/write-page/WriteSidebar.svelte";
  import { onDestroy, onMount } from "svelte";
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<article>
  <WriteSidebar />
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
      position: relative;
      overflow: hidden;

      :global(h1) {
        display: block;
        font-weight: 700;
      }

      // :global(label) {
      //   display: block;
      //   margin-top: 1em;
      // }

      // :global(input[type="text"]) {
      //   padding: 0.25em 0.5em;
      //   color: #000a;
      // }

      // :global(button.submit) {
      //   padding: 0.25em 1em 0.25em 0.7em;
      //   align-self: flex-end;
      //   margin-top: 1em;
      // }
    }
  }
</style>
