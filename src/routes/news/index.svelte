<script lang="ts">
  import Icon from "$lib/components/Icon.svelte";
  import Avatar from "$lib/components/user/Avatar.svelte";
  import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
  import { formatDistance } from "date-fns";
  import { onMount } from "svelte";

  const fetchLoading: Promise<any> = new Promise(async (resolve) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    resolve([
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
    ]);
  });
  onMount(async () => {
    //
  });
</script>

<article class="container">
  <h1>📰 News</h1>
  {#await fetchLoading}
    <h2>Loading...</h2>
    <!-- promise is pending -->
  {:then allNews}
    {#each allNews as news}
      <a href={news.url}>
        <h2>{news?.title}</h2>
        <div class="author-and-date">
          <div class="author">
            <Avatar email={news?.author?.email} /><span>{news?.author?.name || "Admin"}</span>
          </div>
          <div class="date">
            {formatDistance(new Date(news.date), new Date(), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div class="content-break">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto tenetur maiores, quaerat
            perferendis expedita amet, labore officiis autem dolorum eveniet voluptates? Itaque,
            aperiam deserunt modi error nulla libero. Nostrum, sunt?
          </p>
        </div>
        <div class="go-icon">
          <Icon icon={faArrowRight} size="2em" />
        </div>
        <div class="horizontal-line" />
      </a>
    {/each}
  {:catch error}
    <!-- promise was rejected -->
  {/await}
</article>

<style lang="scss">
  article {
    max-width: 50em;
    margin: 10em auto 7em;

    h1 {
      font-weight: 700;
      text-align: center;
      margin-bottom: 1em;
      font-size: 3em;
    }
    a,
    section {
      margin-bottom: 3em;
      padding: 2em;
      text-decoration: none;
      display: block;
      position: relative;

      .go-icon {
        background-color: var(--primary-color-darken-1);
        width: fit-content;
        padding: 8px;
        border-radius: 50%;
        position: absolute;
        right: -24px;
        top: calc(50% - 24px);
        box-shadow: 0 2px 6px #0006, 0 4px 12px #0004;
        opacity: 0;
        transform: translateX(6px);
        transition: all 0.225s ease-out;
      }

      &:hover {
        background-color: hsla(#{$hsl}, 0.2);

        h2 {
          text-decoration: underline;
        }

        .go-icon {
          opacity: 1;
          transform: translateX(0);
        }
      }

      h2 {
        font-weight: 700;
        margin: 0;
        margin-bottom: 0.4em;
      }

      .author-and-date {
        display: flex;
        justify-content: space-between;

        .author {
          display: flex;
          align-items: center;
          span {
            margin-left: 6px;
            color: var(--primary-color-lighten-3);
          }
        }
        .date {
          font-weight: 300;
          opacity: 0.8;
        }
      }

      .horizontal-line {
        position: absolute;
        width: 70%;
        left: 0;
        bottom: 0;
        height: 2px;
        margin: 0 auto;
        background: linear-gradient(to right, #fff0 0%, #fff7 10%, #fff0);
      }
    }
  }
</style>
