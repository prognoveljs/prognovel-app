<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte
    const res = await this.fetch(`devlog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { ...data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import Avatar from "components/user/Avatar.svelte";
  import { getAuthors, getAuthorsName, getAuthorAvatar } from "./_shared";

  export let post;
  export let allAuthors;
  let avatarsMargin = 32;
</script>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<div class="cover">
  {#if post.attributes.cover}<img src={post.attributes.cover} alt={post.title} />{/if}
  <h1>{post.title}</h1>
  <section class="author">
    <div class="authors">
      {#each getAuthors(post.attributes.author) as author, i}
        <span style="left: {i * avatarsMargin}px !important; z-index: {100 - i};">
          <Avatar src={getAuthorAvatar(allAuthors, author)} size={44} />
        </span>
      {/each}
      {getAuthorsName(post.attributes.author)}
    </div>
  </section>
  <section class="timestamp">
    <span>Published at {new Date(post.attributes.createdAt).toUTCString()}</span>
    {#if post.attributes.modifiedAt}<span>Edited at {post.attributes.modifiedAt}</span>{/if}
  </section>
</div>
<div class="content container-center">
  {@html post.html}
</div>

<style lang="scss">
  $coverHeight: 420px;
  .cover {
    width: 100%;
    background-color: #0002;
    height: $coverHeight;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;

    h1 {
      font-weight: 700;
      font-size: 2em;
      line-height: 1.3;
      text-align: center;
      max-width: 60%;
      text-shadow: 0 2px 8px #0002;
      margin: 0 auto 20px;
      font-display: swap;
    }

    .timestamp {
      text-align: center;
      margin-top: 12px;
      margin-bottom: 24px;
      // font-size: 0.9em;
      font-weight: 300;
      opacity: 0.85;
    }
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
    justify-content: center;
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

  .content {
    --textPadding: 0 9%;
    :global(h2) {
      font-size: 1.8em;
      font-weight: 500;
      margin: 2.5em 0 1.25em;
      padding: var(--textPadding);
    }

    :global(p) {
      font-size: 1.1em;
      padding: var(--textPadding);
    }

    :global(a) {
      color: var(--primary-color);
      text-decoration-thickness: 3px;
    }

    :global(pre) {
      background-color: #f9f9f9;
      box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
      padding: 0.5em;
      border-radius: 2px;
      overflow-x: auto;
    }
    :global(pre) :global(code) {
      background-color: transparent;
      padding: 0;
    }
    :global(ul) {
      line-height: 1.5;
    }
    :global(li) {
      margin: 0 0 0.5em 0;
    }
  }
</style>
