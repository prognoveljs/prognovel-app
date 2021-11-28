<script>
  import Main from "./_AnnouncementMain.svelte";
  import Novels from "./_AnnouncementNovels.svelte";
</script>

<svelte:head>
  <title>Announcement</title>
</svelte:head>

<main>
  <Main />
  <Novels />
</main>

<style lang="scss">
  main {
    display: grid;
    grid-template-columns: 3fr 2fr;

    :global(article) {
      min-height: calc(100vh - var(--header-height));
      padding: 24px;

      @include screen("tablet") {
        padding: 12px;
      }
    }
  }
</style>
