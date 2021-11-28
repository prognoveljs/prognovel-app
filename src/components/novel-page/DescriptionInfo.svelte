<script lang="ts">
  import { Tag } from "carbon-components-svelte";
  import { capsFirstLetter } from "utils/string";
  export let novelMetadata;

  $: author = (novelMetadata?.author || "--") as string;
  $: demographic = (novelMetadata?.demographic || "--") as string;
  $: genres = (novelMetadata?.genre || []) as string[];
</script>

<section>
  <div class="info">
    <div><strong>Author:</strong> {author}</div>
    <div><strong>Demographic:</strong> {capsFirstLetter(demographic)}</div>
  </div>
  <div class="genre">
    {#each genres as genre}
      <Tag type="warm-gray">{capsFirstLetter(genre)}</Tag>
    {/each}
  </div>
</section>

<style lang="scss">
  section {
    display: grid;
    grid-template-columns: 1fr 250px;
    grid-template-areas: "info genre";
    align-items: start;

    @include screen("mobile") {
      grid-template-areas: "info info";
    }

    .genre {
      grid-area: genre;
      justify-self: end;

      @include screen("mobile") {
        display: none;
      }
    }

    .info {
      grid-area: info;
      position: relative;
      line-height: 1.25;
      strong {
        font-weight: 500;
        color: var(--primary-color);
      }
    }
  }

  @media only screen and (min-width: 1024px) {
    .genre {
      padding-right: 28px;
    }
  }
</style>
