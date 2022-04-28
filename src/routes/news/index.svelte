<script context="module" lang="ts">
  import { isBrowser } from "$lib/store/states";
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params }) {
    return {
      props: { load: isBrowser ? new URL(location.href).searchParams.get("load") : "" },
    };
  }
</script>

<script lang="ts">
  import Icon from "$lib/components/Icon.svelte";
  import Avatar from "$lib/components/user/Avatar.svelte";
  import { newsData } from "$lib/store/news-page";
  import { SITE_TITLE } from "$lib/_setting";
  import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
  import { formatDistance } from "date-fns";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  export let load;

  onMount(async () => {
    if (load) goto("/news/" + load);
  });
</script>

<svelte:head>
  <title>News | {SITE_TITLE}</title>
</svelte:head>

<article class="container">
  <h1>📰 News</h1>
  {#if $newsData.length}
    {#each $newsData as news}
      <a href="/news/{news.id}">
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
          {@html news.content}
        </div>
        <div class="go-icon">
          <Icon icon={faArrowRight} size="2em" />
        </div>
        <div class="horizontal-line" />
      </a>
    {/each}
  {:else}
    <h2>Loading...</h2>
    <!-- promise was rejected -->
  {/if}
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

    a {
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
