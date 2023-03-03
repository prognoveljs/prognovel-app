<script lang="ts">
  import BookCover from "$lib/components/BookCover.svelte";
  import SectionHeaderLabel from "../misc/SectionHeaderLabel.svelte";
  import ShowcaseNovelItem from "./ShowcaseNovelItem.svelte";

  export let label = "Trending novels this week";
  export let emoji = "🔥";
  export let isLoading: boolean = true;

  const HIGHLIGHT_COVER_SIZE = "280px";
  let novelList: string[] = Array(9).fill("");
</script>

<article>
  <SectionHeaderLabel --width="8em" {label} {emoji}>
    <slot>
      <div />
    </slot>
  </SectionHeaderLabel>
  <div class="flex">
    <div class="highlight">
      <ShowcaseNovelItem --width={HIGHLIGHT_COVER_SIZE} novel={novelList[0]} isHighlight={true} />
    </div>
    <section class="list">
      {#each (novelList || []).slice(1) as novel}
        <ShowcaseNovelItem --width="120px" --font-size="1.6em" {novel} />
      {/each}
    </section>
  </div>
</article>

<style lang="scss">
  article {
    padding-top: 5em;
    margin-bottom: 5em;

    .flex {
      display: flex;
      gap: 3em;

      .highlight {
        --padding-side: 25px;
        position: relative;
        text-decoration: none;

        :global(a) {
          height: 500px;
        }

        :global(.showcase-item-wrapper) {
          --border-opacity: 0.2;
          padding: 3em var(--padding-side) 2em;
          background-color: #fff1;
          border: 2px solid hsla(#{$hsl}, var(--border-opacity));

          // text-decoration: none;
          // width: calc(var(--cover-width) + #{$padding-left * 2});

          &:hover {
            background-color: #fff2;
            --border-opacity: 0.4;
          }
        }

        :global(.stats-grid) {
          opacity: 1 !important;
        }
      }

      .list {
        display: flex;
        gap: 2em;
        font-size: 0.8em;
        flex-wrap: wrap;
        align-items: start;
        // justify-content: space-between;
        // flex-shrink: 0;

        &::after {
          content: "";
          flex: auto;
        }
      }
    }
  }
</style>
