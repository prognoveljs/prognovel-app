<script lang="ts">
  // import Icon from "$lib/components/Icon.svelte";
  // import { faCalendar, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
  import Avatar from "$lib/components/user/Avatar.svelte";
  import { siteMetadata } from "$lib/store/states";
  import { delay } from "$lib/utils/misc";
  import { formatDistance } from "date-fns";
  import { onMount } from "svelte";
  import NewsSkeletonShell from "./NewsSkeletonShell.svelte";

  $: news = $siteMetadata.news || [];

  onMount(async () => {
    await delay(1000);
  });
</script>

<article id="news">
  {#if news.length}
    {#each news.slice(0, 3) as anews, i}
      <a class="news-item" href="/news/{anews.id}">
        {#if i}
          <div class="horizontal-line" />
        {/if}
        <h3>{anews.title}</h3>
        <div class="item-wrapper">
          <div class="author">
            <Avatar email={anews?.author?.email} size={32} />
            <span>{anews?.author?.name || "Admin"}</span>
          </div>
          <div class="date">
            <!-- <Icon icon={faCalendarAlt} size="1.15em" paddingBottom="2px" marginRight="4px" /> -->
            {formatDistance(new Date(anews.date), new Date(), { addSuffix: true })}
          </div>
        </div>
      </a>
    {/each}
  {:else}
    <NewsSkeletonShell --width="60%" horizontalLine={false} />
    <NewsSkeletonShell />
    <NewsSkeletonShell --width="80%" />
  {/if}
  <div class="horizontal-line" style="position:relative !important;" />

  <a class="more-news" href="/news">more news</a>
</article>

<style lang="scss">
  @import "shared";
  #news {
    display: flex;
    flex-direction: column;

    .news-item {
      position: relative;
      text-decoration: none;
      padding: 0.75em $news-bleed-padding 0.5em;
      margin: 0 #{$news-bleed-padding * -1} 0 #{$news-bleed-padding * -1};

      &:hover {
        background-color: #fff2;
        h3 {
          text-decoration: underline;
        }
      }

      h3 {
        font-size: 1.25em;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 0.4em;
      }

      .item-wrapper {
        display: grid;
        justify-content: space-between;
        align-items: center;
        position: relative;
        grid-template-columns: minmax(0, 1fr) max-content;
        gap: 8px;

        .author {
          display: flex;
          align-items: center;

          span {
            width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          :global(.avatar) {
            margin-right: 6px;
          }
        }

        .date {
          display: flex;
          justify-content: end;
          opacity: 0.8;
          font-style: italic;
          font-size: 0.8em;
          align-items: center;
        }
      }
    }

    .more-news {
      margin-top: 8px;
      align-self: flex-end;

      &:hover {
        font-weight: 700;
      }
    }
  }
</style>
