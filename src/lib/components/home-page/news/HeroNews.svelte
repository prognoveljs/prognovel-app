<script lang="ts">
  // import Icon from "$lib/components/Icon.svelte";
  // import { faCalendar, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
  import Avatar from "$lib/components/user/Avatar.svelte";
  import { delay } from "$lib/utils/misc";
  import { formatDistance } from "date-fns";
  import { onMount } from "svelte";
  import NewsSkeletonShell from "./NewsSkeletonShell.svelte";

  let mockNews = [
    {
      date: "2020-01-01",
      title: "My first news",
      author: {
        name: "Radhy",
        email: "radhy.nodix@gmail.com",
      },
      url: "/news/test-1",
    },
    {
      date: "2021-01-01",
      title: "ProgNovel is now have a new hero in its home page",
      author: {
        name: "Suara sepatu kuda wa wa waw awawa awa",
        email: "radhy.nodix@gmail.com",
      },
      url: "/news/test-2",
    },
    {
      date: "2022-01-01",
      title: "Here's 2022",
      url: "/news/test-3",
    },
    {
      date: "2023-01-01",
      title: "ProgNovel is now testing",
      author: {
        name: "Radhy",
        email: "radhy.nodix@gmail.com",
      },
      url: "/news/test-14",
    },
  ];
  let news_data = [];

  $: news = news_data.sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  });

  onMount(async () => {
    await delay(1000);
    news_data = mockNews;
  });
</script>

<article id="news">
  <h2>News</h2>
  {#if news.length}
    {#each news.slice(0, 3) as news, i}
      <a class="news-item" href={news.url}>
        {#if i}
          <div class="horizontal-line" />
        {/if}
        <h3>{news.title}</h3>
        <div class="item-wrapper">
          <div class="author">
            <Avatar email={news?.author?.email} size={32} />
            <span>{news?.author?.name || "Admin"}</span>
          </div>
          <div class="date">
            <!-- <Icon icon={faCalendarAlt} size="1.15em" paddingBottom="2px" marginRight="4px" /> -->
            {formatDistance(new Date(news.date), new Date(), { addSuffix: true })}
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
    h2 {
      margin: {
        top: 0;
        bottom: 0;
      }
    }

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
      margin-top: 4px;
      align-self: flex-end;

      &:hover {
        font-weight: 700;
      }
    }
  }
</style>
