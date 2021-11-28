<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`devlog.json`)
      .then((r) => r.json())
      .then((data) => {
        return { ...data };
      });
  }
</script>

<script lang="ts">
  import Avatar from "components/user/Avatar.svelte";
  import { getAuthors, authorsMock, getAuthorAvatar } from "./_shared";
  import type { Post } from "./_post-attributes";

  export let posts: Post[];
  export let authors: any = {};
  let avatarsMargin = 32;
</script>

<svelte:head>
  <title>Dev Logs</title>
</svelte:head>

<div class="container-center">
  <h1>Dev Logs</h1>
  {#each posts as post}
    <article>
      <h2>{post.title}</h2>
      <div class="authors" style="--authors-number: {authorsMock.length};--avatar-margin: {avatarsMargin}px;">
        {#each getAuthors(post) as author, i}
          <span style="left: {i * avatarsMargin}px !important; z-index: {100 - i};">
            <Avatar src={getAuthorAvatar(authors, author)} size={44} />
          </span>
        {/each}
        {getAuthors(post.authors)}
      </div>
      {@html post.html || ""}
      <a rel="prefetch" href="devlog/{post.slug}">read more<br /> </a>
    </article>
  {/each}
</div>

<style lang="scss">
  .container-center a {
    $borderRadius: 8px;
    --bg-alpha: 0.075;
    padding: 12px 4px 18px;
    display: block;
    background-color: hsla(var(--primary-color-h), 100%, 65%, var(--bg-alpha));

    border-radius: $borderRadius;
    text-align: center;

    &:hover {
      --bg-alpha: 0.15;
    }
  }

  article {
    padding: 12px 24px 24px;
    background-color: var(--foreground-color);
    border-radius: 4px;
    margin-bottom: 32px;

    h2 {
      font-weight: 700;
    }

    .authors {
      --height: 40px;
      --authors-number: 1;
      --avatar-margin: 20px;
      --base-margin: 12px;
      height: var(--height);
      position: relative;
      display: flex;
      align-items: center;
      padding-left: calc(
        var(--base-margin) + var(--height) + (var(--avatar-margin) * (var(--authors-number) - 1))
      );
      span {
        position: absolute;
        left: 0;

        :global(.avatar) {
          border: 2px solid var(--foreground-color);
        }
      }
    }
  }
</style>
