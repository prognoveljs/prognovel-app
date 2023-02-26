<script lang="ts">
  import BookCover from "$lib/components/BookCover.svelte";
  import { numberFormatter } from "$lib/utils/string";
  import { EyeIcon, ThumbsUpIcon, UsersIcon } from "svelte-feather-icons";

  export let novel: string = "";
  export let synopsis: string = "";
  export let isHighlight: boolean = false;

  const ICON_SIZE = "15";

  let views = 2_12512616124;
  let likes = 512512616;
  let followers = 125216;
</script>

<a class="showcase-item-wrapper" href="/novel/{novel}">
  <BookCover width="100%" {novel} />
  <h3>Novel titles jedam jedom jedamp</h3>
  <div class="stats-grid" class:isHighlight>
    <div class="inline-flex" style="grid-area:views">
      <EyeIcon size={ICON_SIZE} /> <span class="number">{numberFormatter(views)}</span>
    </div>
    <div class="inline-flex" style="grid-area:likes">
      <ThumbsUpIcon size={ICON_SIZE} /> <span class="number">{numberFormatter(likes)}</span>
    </div>
    <div class="inline-flex" style="grid-area:followers">
      <UsersIcon size={ICON_SIZE} /> <span class="number">{numberFormatter(followers)}</span>
      {#if !isHighlight}
        users
      {/if}
    </div>
  </div>
  {#if synopsis}
    <div class="synopsis">
      {synopsis}
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

      .inline-flex {
        display: inline-flex;
        align-items: flex-start;

        gap: 0.3em;
        // margin-right: 0.5em;
        font-size: 90%;
        flex-wrap: nowrap;
      }

      &.isHighlight {
        grid-template-columns: repeat(3, auto);
        grid-template-rows: 1fr;
        grid-template-areas: "views likes followers";

        .inline-flex {
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
    }

    &:hover {
      h3 {
        text-decoration: underline;
      }

      .stats-grid {
        opacity: 1;
      }
    }
  }
</style>
