<script lang="ts">
  import { browser } from "$app/environment";

  import { page } from "$app/stores";
  import Disqus from "$lib/components/comments/disqus/Disqus.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import SkeletonShell from "$lib/components/SkeletonShell.svelte";
  import Avatar from "$lib/components/user/Avatar.svelte";
  import { newsData } from "$lib/store/news-page";
  import { siteMetadata } from "$lib/store/states";
  import { SITE_TITLE } from "$lib/_setting";
  import { faFacebook, faReddit, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

  $: ({ slug } = $page?.params || {});
  $: console.log({ slug, localNewsData });
  $: localNewsData = $newsData.find((news) => news.id === slug);
  // $: data = null;
  $: hasDisqus = Boolean($siteMetadata?.disqus_id);
  const SKELETON_SHELL_RANDOM_WIDTH = [40, 20, 60, 30];
</script>

<svelte:head>
  <title>{localNewsData?.title || "Loading..."} | {SITE_TITLE}</title>
</svelte:head>

<article>
  {#if localNewsData}
    <h1>{localNewsData?.title}</h1>
  {:else}
    <SkeletonShell primaryColor="#EBECEF99" secondaryColor="#F5F5F7aa" height="50px">
      <rect width="70%" height="3em" x="0" y="0" rx="4" ry="4" />
    </SkeletonShell>
  {/if}
  <div class="cover">
    <!-- <img src="" alt="" /> -->
    <div class="author">
      <Avatar size={42} email={localNewsData?.author?.email} />
      <div>
        {#if localNewsData}
          <!-- content here -->
          {localNewsData?.author?.name}
        {:else}
          <SkeletonShell
            width="100px"
            primaryColor="hsla(var(--primary-color-h), 60%,60%,.4)"
            secondaryColor="hsla(var(--primary-color-h), 40%,70%,.8)"
          >
            <rect width="100px" height="1em" x="0" y="0" rx="4" ry="4" />
          </SkeletonShell>
        {/if}
      </div>
    </div>
    <div class="share">
      <span>share</span>
      <a
        target="_blank"
        href={localNewsData?.url}
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
          localNewsData?.title +
          ' ' +
          $page?.url}"
      >
        <Icon size="1.25em" icon={faTwitter} />
      </a>
      <a
        target="_blank"
        href="https://api.whatsapp.com/send?text={$page?.url
          ?.href}&title=[{SITE_TITLE} news] {localNewsData?.title}"
        data-action="share/whatsapp/share"
      >
        <Icon size="1.5em" icon={faWhatsapp} />
      </a>
      <a
        target="_blank"
        href="https://www.reddit.com/submit?url={$page?.url
          ?.href}&title=[{SITE_TITLE} news] {localNewsData?.title}"
      >
        <Icon size="1.25em" icon={faReddit} />
      </a>
    </div>
  </div>
  <div class="content">
    {#if localNewsData}
      <!-- content here -->
      {@html localNewsData?.content}
    {:else}
      {#each Array(4).fill(0) as shells, width}
        <SkeletonShell primaryColor="#EBECEF55" secondaryColor="#F5F5F766" height="9em">
          {#each Array(4).fill(0) as svg, i}
            <rect
              width={(i + 1) % 4 === 0 ? SKELETON_SHELL_RANDOM_WIDTH[width] + "%" : "100%"}
              height="1.35em"
              x="0"
              y="{i * 2}em"
              rx="4"
              ry="4"
            />
          {/each}
        </SkeletonShell>
      {/each}
    {/if}
  </div>
  {#if hasDisqus && browser}
    <Disqus src={$siteMetadata.disqus_id} identifier="news/{slug}" />
  {/if}
</article>

<style lang="scss">
  article {
    max-width: 46em;
    margin: 10em auto 7em;
    position: relative;
    padding: 0 24px;

    .content {
      min-height: 35em;
    }

    h1 {
      font-weight: 700;
      font-size: 3em;
      margin: 0;
      height: 50px;
      display: block;
    }

    .cover {
      width: 120%;
      margin: 2em -4em;
      // background-color: #0004;
      // min-height: 400px;
      border-radius: 12px;
      position: relative;

      .author {
        display: flex;
        flex-direction: column;
        align-items: end;
        position: absolute;
        height: 4em;
        justify-content: space-between;
        gap: 8px;
        top: 48px;
        right: calc(100%);
        font-size: 1.2em;
        // font-weight: 700;
        // font-family: "Courier New", Courier, monospace;
        color: var(--primary-color-lighten-3);
        width: max-content;
        white-space: normal;
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
