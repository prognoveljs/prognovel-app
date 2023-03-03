<script lang="ts">
  import BookCover from "$lib/components/BookCover.svelte";
  import SkeletonShell from "$lib/components/SkeletonShell.svelte";
  import { numberFormatter } from "$lib/utils/string";
  import { EyeIcon, ThumbsUpIcon, UsersIcon } from "svelte-feather-icons";
  import StatsItem from "./ShowcaseNovelStatsItem.svelte";

  export let novel: string = "";
  export let isHighlight: boolean = false;

  $: title = "";
  $: synopsis = ``;
  //   $: synopsis = `
  // Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique eos repudiandae distinctio officia, repellendus error aut quam? Ullam, eligendi cumque fugit officiis saepe similique esse ab labore, ea autem quis!
  // `;

  const PRELOAD_PRIMARY_COLOR = "#9996";
  const PRELOAD_SECONDARY_COLOR = "#aaaa";
</script>

<a class:disabled={!novel} class:isHighlight class="showcase-item-wrapper" href="/novel/{novel}">
  <BookCover width="100%" {novel} />
  {#if title}
    <h3>{title}</h3>
  {:else}
    <div class="title-preload">
      <SkeletonShell
        height="18"
        width="100%"
        primaryColor={PRELOAD_PRIMARY_COLOR}
        secondaryColor={PRELOAD_SECONDARY_COLOR}
      />
      <SkeletonShell
        height="18"
        width="80%"
        primaryColor={PRELOAD_PRIMARY_COLOR}
        secondaryColor={PRELOAD_SECONDARY_COLOR}
      />
    </div>
  {/if}
  <div class="stats-grid" class:isHighlight>
    <StatsItem type="views" />
    <StatsItem type="likes" />
    <StatsItem type="followers">
      {#if !isHighlight}
        users
      {/if}
    </StatsItem>
  </div>
  {#if isHighlight}
    <div class="synopsis">
      {#if synopsis}
        {synopsis}
      {:else}
        <div class="loading">
          {#each Array(4).fill("") as item, index}
            <SkeletonShell
              height="18"
              width={index < 3 ? "100%" : "80%"}
              primaryColor={PRELOAD_PRIMARY_COLOR}
              secondaryColor={PRELOAD_SECONDARY_COLOR}
            />
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</a>

<style lang="scss">
  .showcase-item-wrapper {
    width: var(--width, 250px);
    // flex-basis: var(--width, 250px);
    text-decoration: none;
    display: block;

    h3 {
      font-weight: 700;
      font-size: var(--font-size, 2.25em);
      margin-top: 0.5em;
      margin-bottom: 0.25em;
      line-height: 1.1;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(auto, 1fr));
      grid-template-rows: repeat(2, minmax(auto, 1fr));
      grid-template-areas: "views likes" "followers followers";
      gap: 0.3em 0.8em;
      color: var(--primary-color-lighten-3);
      opacity: 0.66;

      &.isHighlight {
        grid-template-columns: repeat(3, auto);
        grid-template-rows: 1fr;
        grid-template-areas: "views likes followers";

        :global(.inline-flex) {
          align-items: center;
        }
      }
    }

    .synopsis {
      // max-height: 5em;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-top: 0.5em;
      line-height: 1.4;

      .loading {
        opacity: 0.6;
      }
    }

    &:hover {
      h3 {
        text-decoration: underline;
      }

      .stats-grid {
        opacity: 1;
      }
    }

    .title-preload {
      margin: {
        top: 1em;
        bottom: 0.5em;
      }
    }

    &.disabled {
      pointer-events: none;
      cursor: auto;
    }
  }
</style>
