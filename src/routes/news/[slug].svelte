<script lang="ts" context="module">
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
  import { isBrowser } from "$lib/store/states";
  import { faDiscord, faFacebook, faReddit, faTwitter } from "@fortawesome/free-brands-svg-icons";

  let mock = [
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
  const DEFAULT_IMAGE = "";
  let slug;
  console.log($page);
  $: data = mock[mock.findIndex((news) => news.url.split("/").slice(-1))];
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
      <a target="_blank" href="/">
        <Icon size="1.25em" icon={faFacebook} />
      </a>
      <a target="_blank" href="/">
        <Icon size="1.25em" icon={faTwitter} />
      </a>
      <a target="_blank" href="/">
        <Icon size="1.25em" icon={faDiscord} />
      </a>
      <a
        target="_blank"
        href="https://www.reddit.com/submit?url={$page?.url?.href}&title={isBrowser
          ? decodeURIComponent(data?.title)
          : ''}"
      >
        <Icon size="1.25em" icon={faReddit} />
      </a>
    </div>
  </div>
  <div class="content">
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse rem earum facilis quis
      accusamus ipsam quos! Eligendi ex nam eum consequatur, fugiat laboriosam itaque quas maxime
      maiores, totam distinctio odit.
    </p>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse rem earum facilis quis
      accusamus ipsam quos! Eligendi ex nam eum consequatur, fugiat laboriosam itaque quas maxime
      maiores, totam distinctio odit.
    </p>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse rem earum facilis quis
      accusamus ipsam quos! Eligendi ex nam eum consequatur, fugiat laboriosam itaque quas maxime
      maiores, totam distinctio odit.
    </p>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse rem earum facilis quis
      accusamus ipsam quos! Eligendi ex nam eum consequatur, fugiat laboriosam itaque quas maxime
      maiores, totam distinctio odit.
    </p>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse rem earum facilis quis
      accusamus ipsam quos! Eligendi ex nam eum consequatur, fugiat laboriosam itaque quas maxime
      maiores, totam distinctio odit.
    </p>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse rem earum facilis quis
      accusamus ipsam quos! Eligendi ex nam eum consequatur, fugiat laboriosam itaque quas maxime
      maiores, totam distinctio odit.
    </p>
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
        top: 12px;
        right: -64px;
        position: absolute;
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

    p {
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
