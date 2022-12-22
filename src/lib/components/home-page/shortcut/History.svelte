<script lang="ts">
  import { onMount } from "svelte";
  import { get as getIDB } from "idb-keyval";
  import { IDB_PREFIX_HISTORY_RECENT } from "$lib/utils/history";
  import { formatDistanceToNow } from "date-fns";
  import { siteMetadata } from "$lib/store/states";
  import { novelTitles } from "$lib/utils/novel-page";
  import Icon from "$lib/components/Icon.svelte";
  import { faClock } from "@fortawesome/free-regular-svg-icons";
  import { getCoverURLPath, isWEBP } from "$lib/utils/images";
  import type { HistoryRecent } from "$typings";

  let history: HistoryRecent[] = [];

  onMount(async () => {
    const saved: HistoryRecent[] = await getIDB(IDB_PREFIX_HISTORY_RECENT);
    if (saved) {
      history = saved;
    }
  });
</script>

<section>
  {#if novelTitles && history.length}
    {#each history as novel}
      <a class="novel" rel="preload" href="/read/{novel.id}/{novel.lastChapterRead}">
        <img
          src={getCoverURLPath(novel.id, { width: 128, height: 128 }, isWEBP ? "webp" : "jpeg")}
          alt={novel.id}
        />
        <span class="title">{novelTitles[novel.id] || novel.id}</span>
        <span class="chapter"
          >Ch
          {novel.lastChapterRead
            ? novel.lastChapterRead.split("/")[1].slice(8).replace(/-/, ".")
            : "--"}</span
        >
        <span class="last-read"
          >{formatDistanceToNow(novel.lastReadAt, { includeSeconds: true })} ago</span
        >
      </a>
    {/each}
  {:else}
    <div class="empty" aria-disabled="true">
      <Icon size="3em" icon={faClock} />
      <em>your recent history will show here</em>
    </div>
  {/if}
</section>

<style lang="scss">
  $height: 65px;
  $imgWidth: 65px;
  $imgHeight: $imgWidth;

  .novel:not(:first-of-type) {
    border-top: 1px solid #0002;
    margin-top: -1px;
  }

  .novel {
    width: 100%;
    height: $height;
    display: grid;
    grid-template-columns: $imgWidth 1fr 140px;
    grid-template-rows: 1fr 24px;
    grid-gap: 4px;
    grid-template-areas: "image title title" "image chapter lastRead";
    cursor: pointer;
    text-decoration: none;

    &:hover {
      background-color: #0002;

      img {
        filter: saturate(100%) grayscale(0%);
      }

      .chapter {
        font-size: 0.85em;
        font-weight: 700;
      }

      .last-read {
        opacity: 1;
      }
    }

    img {
      filter: saturate(60%) grayscale(20%);
      grid-area: image;
      width: $imgWidth;
      height: $imgHeight;
    }

    .title {
      grid-area: title;
    }

    .chapter {
      grid-area: chapter;
      font-size: 0.75em;
      align-self: end;
    }

    .last-read {
      grid-area: lastRead;
      color: var(--primary-color);
      font-style: italic;
      font-size: 0.625em;
      align-self: end;
      text-align: right;
      padding: 2px 4px;
      opacity: 0.75;
    }
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-top: 36px;

    @import "_empty-content.scss";
  }
</style>
