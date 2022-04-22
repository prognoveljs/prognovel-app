<script lang="ts">
  import Icon from "$lib/components/Icon.svelte";
  import { faFire } from "@fortawesome/free-solid-svg-icons";
  import { siteMetadata } from "$lib/store/states";
  // import { novelUpdatesMock } from "./_mock";

  export let grid = "";
  export let seeAllLink = "";
  $: novelList = ($siteMetadata || {}).novels || [];

  const preloadShell = `height: 18px; width: 85%; background: var(--text-body-color);
      opacity: 0.15; margin: 12px; margin-top: 32px;`;
</script>

<figure style="grid-area: {grid}">
  <figcaption>
    <div>
      <Icon icon={faFire} color={"var(--primary-color)"} paddingBottom="4px" />
      Updates
    </div>
    {#if seeAllLink}
      <a href={seeAllLink}>See all</a>
    {/if}
  </figcaption>
  {#if !novelList || !$siteMetadata.novelsMetadata}
    {#each Array(4).fill(preloadShell) as preload}
      <div style={preload} />
    {/each}
  {:else}
    <ul>
      <li class="header">
        <strong>Title</strong> <strong>Author</strong> <strong>Chapters</strong>
      </li>
    </ul>
    <div class="list">
      {#each $siteMetadata.novelsMetadata as novel}
        <a sveltekit:prefetch href="/novel/{novel.id}">
          <span>
            {novel.title}
          </span>
          <span>{novel.author || "--"}</span>
          <span class="chapters"> <span>{novel.totalChapter}</span> <span>chapters</span> </span>
        </a>
      {/each}
    </div>
    <!-- {#each novelUpdatesMock as novel}
      <a sveltekit:prefetch disabled="" aria-disabled="true" href="/novel/{novel.id}">
        {novel.title}
        <span>{novel.author || "--"}</span>
        <span class="chapters"> <span>{novel.totalChapter}</span> <span>chapters</span> </span>
      </a>
    {/each} -->
  {/if}
</figure>

<style lang="scss">
  figure {
    --header-border-color: #0003;
    --border-color: #0001;
    margin: 0;
    background-color: var(--foreground-color);
    box-shadow: 0 4px 12px #0002;
    flex: 3;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    min-height: 421px;
    max-width: 100vw;
    padding: 12px 24px;

    // content-visibility: auto;
    // contain-intrinsic-size: 592px;

    figcaption {
      font-weight: 700;
      font-size: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      a {
        font-size: 1rem;
        color: var(--primary-color-lighten-3);

        :global(html.light) & {
          color: var(--primary-color-darken-2);
        }

        &:hover {
          color: hsl(var(--primary-color-h), 90%, 47%);
        }
      }
    }

    ul {
      margin-top: 12px;
      padding: 0;
      list-style: none;
    }

    li,
    .list a {
      padding: 4px 8px;
      position: relative;
      display: grid;
      grid-template-columns: minmax(0, 2fr) minmax(70px, 1fr) minmax(90px, 1fr);
      grid-template-areas: "title" "author" "chapter";
      font-weight: 400;
      text-decoration: none;

      @include screen("small-mobile") {
        // grid-template-columns: minmax(0, 2fr) minmax(90px, 1fr);
        // grid-template-areas: "title" "chapter";
      }
    }

    .list {
      a {
        text-shadow: 2px 2px 4px #0003;

        @include screen("mobile") {
          padding: 12px 0;
        }

        span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          max-width: 100%;
          // display: block;
        }

        &:hover:not([disabled]) {
          background: #0001;
        }

        &:not(.header [disabled]) {
          cursor: pointer;
          user-select: none;
        }

        &:not(:last-child) {
          border-bottom: 1px solid var(--border-color);
        }

        // &[disabled] {
        //   opacity: 0.5;
        //   pointer-events: none;
        // }
      }
    }

    @include screen("mobile") {
      background: none;
      box-shadow: none;
      padding: 0;
      min-height: auto;
      --border-color: #fff1;
      --header-border-color: #fff3;
    }
  }

  .chapters span {
    font-weight: 300;

    &:first-child {
      font-weight: 500;
    }
  }

  li:first-child {
    border-bottom: 1px solid var(--header-border-color);
  }
</style>
