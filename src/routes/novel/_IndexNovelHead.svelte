<script lang="ts">
  import { entireSiteGenres, genreFilter } from "store/novel-page";
  export let headerText = "All novels";

  function pickGenre(genre: string): any {
    if (isFilterActive(genre)) {
      $genreFilter = $genreFilter.filter((s) => s !== genre);
    } else {
      $genreFilter = [...$genreFilter, genre];
    }
  }

  function isFilterActive(genre: string): boolean {
    return $genreFilter.includes(genre);
  }
</script>

<article>
  <h1>{headerText}</h1>
  <section class="filter">
    {#each $entireSiteGenres as genre}
      <div class="button" class:Selected={$genreFilter.includes(genre)} on:click={pickGenre(genre)}>
        {genre}
      </div>
    {/each}
  </section>
</article>

<style lang="scss">
  article {
    margin-bottom: 1em;

    h1 {
      font-weight: 700;
    }

    .filter {
      margin: {
        top: 0.5em;
        bottom: 1em;
      }

      .button {
        padding: 4px 8px;
        margin-right: 8px;
        border-radius: 1em;
        display: inline;
        cursor: pointer;
        user-select: none;
        background-color: var(--text-body-color);
        color: var(--foreground-color);
        font-weight: 300;
        border: {
          color: transparent;
          style: solid;
          width: 1.5px;
        }

        &.Selected {
          background-color: var(--primary-color);
          color: #fffe;
          border-color: #fff8;
        }
      }
    }
  }
</style>
