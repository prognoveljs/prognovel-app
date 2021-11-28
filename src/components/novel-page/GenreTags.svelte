<script lang="ts">
  import { currentNovel, novelsData } from "states";
  import { Tag } from "carbon-components-svelte";

  $: metadata = $novelsData[$currentNovel];
  // $: genres = (metadata?.genre || []) as string[];
  $: tags = (metadata?.tags || []) as string[];
  $: genres = (metadata?.genre || []) as string[];

  // function capsFirstLetter(text: string): string {
  //   return text.slice(0, 1).toLocaleUpperCase() + text.slice(1);
  // }
</script>

<article>
  <section class="mobile">
    {#if metadata}
      {#each genres as genre}
        <Tag color="warm-grey">#{genre}</Tag>
      {/each}
    {/if}
  </section>
  {#if metadata}
    {#each tags as tag}
      <Tag>#{tag}</Tag>
    {/each}
  {/if}
</article>

<style lang="scss">
  article {
    margin-top: 0.5em;
    grid-area: tags;

    @include screen("mobile") {
      margin-top: -0.5em;
    }

    .mobile {
      display: none;

      @include screen("mobile") {
        display: block;
      }
    }
  }
</style>
