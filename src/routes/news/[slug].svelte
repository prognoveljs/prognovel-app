<script lang="ts" context="module">
  export const prerender = false;
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params }) {
    const { slug } = params;

    return {
      props: {
        slug,
      },
    };
  }
</script>

<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "$lib/components/Icon.svelte";
  import Avatar from "$lib/components/user/Avatar.svelte";
  import { newsData } from "$lib/store/news-page";
  import { isBrowser } from "$lib/store/states";
  import { SITE_TITLE } from "$lib/_setting";
  import { faFacebook, faReddit, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

  export let slug;
  $: data = $newsData.find((news) => news.id === slug);
</script>

<article>
  <h1>{data?.title}</h1>
  <div class="cover">
    <img src="" alt="" />
    <div class="author">
      <Avatar size={42} email={data?.author?.email} />
      <div>
        {data?.author?.name}
      </div>
    </div>
    <div class="share">
      <span>share</span>
      <a
        target="_blank"
        href={data?.url}
        on:click|preventDefault={() => {
          window.open(
            "https://www.facebook.com/sharer/sharer.php?u=" + $page.url,
            "facebook-share-dialog",
            "width=626, height=436",
          );
        }}
      >
        <Icon size="1.25em" icon={faFacebook} />
      </a>
      <a
        target="_blank"
        href="https://twitter.com/intent/tweet?text={'[' +
          SITE_TITLE +
          ' news] ' +
          data?.title +
          ' ' +
          $page?.url}"
      >
        <Icon size="1.25em" icon={faTwitter} />
      </a>
      <a
        target="_blank"
        href="https://api.whatsapp.com/send?text={$page?.url
          ?.href}&title=[{SITE_TITLE} news] {data?.title}"
        data-action="share/whatsapp/share"
      >
        <Icon size="1.5em" icon={faWhatsapp} />
      </a>
      <a
        target="_blank"
        href="https://www.reddit.com/submit?url={$page?.url
          ?.href}&title=[{SITE_TITLE} news] {data?.title}"
      >
        <Icon size="1.25em" icon={faReddit} />
      </a>
    </div>
  </div>
  <div class="content">
    {@html data?.content}
  </div>
</article>

<style lang="scss">
  article {
    max-width: 46em;
    margin: 10em auto 7em;
    position: relative;
    padding: 0 24px;

    h1 {
      font-weight: 700;
      font-size: 3em;
    }

    .cover {
      width: 120%;
      margin: 2em -4em;
      background-color: #0004;
      border-radius: 12px;
      min-height: 400px;
      position: relative;

      .author {
        display: flex;
        flex-direction: column;
        align-items: end;
        position: absolute;
        gap: 8px;
        top: 48px;
        left: -86px;
        font-size: 1.2em;
        font-weight: 700;
        // font-family: "Courier New", Courier, monospace;
        color: var(--primary-color-lighten-3);
      }

      .share {
        display: flex;
        flex-direction: column;
        top: 4px;
        right: -64px;
        position: absolute;
        span {
          opacity: 0.6;
          margin-bottom: 8px;
        }
        a {
          $size: 42px;
          height: $size;
          width: $size;
          border-radius: 50%;
          border: 1px solid var(--primary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          opacity: 0.7;

          &:hover {
            opacity: 1;
            background-color: hsla(#{$hsl}, 0.2);
          }
        }
      }
    }

    :global(p) {
      font-size: 1.2em;
    }

    @include screen("mobile") {
      padding: 0 var(--mobile-body-side-margin);
      .cover {
        width: 100%;
        margin: 1em 0;
      }
    }
  }
</style>
