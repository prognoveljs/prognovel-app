<script lang="ts">
  import Item from "components/home-page/announcement/AnnouncementNovelsItem.svelte";

  const mockNovels = [
    "Yashura Legacy",
    "Moby Dick",
    "Dragon Dragon",
    "Sherlock Holmes",
    "Metamorphosis",
    "1984",
  ];

  $: oddNovels = mockNovels.filter((_, index) => index % 2 === 0); // index starts from 0
  $: evenNovels = mockNovels.filter((_, index) => index % 2);
</script>

<article>
  <h2>Novels Announcement</h2>
  <div class="grid">
    <span class="section">
      {#each oddNovels as novel}
        <Item>{novel}</Item>
      {/each}
    </span>
    <span class="section" style="padding-top: var(--even-items-top-padding);">
      {#each evenNovels as novel}
        <Item>{novel}</Item>
      {/each}
    </span>
  </div>
</article>

<style lang="scss">
  $novelCoverWidth: 250px;
  article {
    --even-items-top-padding: 2.5em;
    background-color: #0002;

    h2 {
      margin-top: 2em;
    }

    .grid {
      --item-size: minmax(40%, #{$novelCoverWidth});
      --gap-horizontal: 16px;
      --gap-vertical: 32px;
      display: grid;
      grid-template-columns: repeat(2, var(--item-size));
      grid-gap: var(--gap-horizontal);
      gap: var(--gap-horizontal);
      justify-content: center;

      .section > :global(section) {
        margin-bottom: var(--gap-vertical);
      }
    }
  }
</style>
