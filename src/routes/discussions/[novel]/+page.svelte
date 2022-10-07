<script lang="ts">
  import { siteMetadata } from "$lib/store/states";
  import { getNovelBookCoverSrc, novelList, novelTitles } from "$lib/utils/novel-page";
  import Comments from "$lib/components/comments/disqus/Disqus.svelte";
  import NoDisqus from "../_NoDisqus.svelte";
  import { SITE_TITLE } from "$lib/_setting";
  import { browser } from "$app/environment";

  $: hasDisqus = Boolean($siteMetadata?.disqus_id);
  const GENERAL_SLUG = "all";

  export let data;
  $: ({ novel } = data);
</script>

<svelte:head>
  <title>Discussion{novelTitles[novel] ? ` - ${novelTitles[novel]}` : ""} | {SITE_TITLE}</title>
</svelte:head>

{#if hasDisqus}
  <article>
    <section class="novel-dir">
      <div class="wrapper">
        <a class="general" href="/discussions/all" class:selected={novel === GENERAL_SLUG}>
          <strong>General</strong></a
        >
        {#each novelList as novelID}
          <a
            style="--bg: {getNovelBookCoverSrc(novelID)};"
            href="/discussions/{novelID}"
            class:selected={novelID === novel}
          >
            <img src={getNovelBookCoverSrc(novelID)} alt={novelTitles[novelID]} />
            <div class="metadata">
              <strong>
                {novelTitles?.[novelID] || ""}
              </strong>
            </div>
          </a>
        {/each}
      </div>
    </section>
    <section class="body">
      <h1><small>#</small> {novel === GENERAL_SLUG ? "General" : novelTitles[novel] || novel}</h1>
      <div class="comments">
        {#key novel}
          {#if browser}
            <Comments src={$siteMetadata.disqus_id} identifier="disqussions" />
          {/if}
        {/key}
      </div>
    </section>
  </article>
{:else}
  <NoDisqus />
{/if}

<style lang="scss">
  article {
    --padding: 24px;
    --grid-gap: 1em;
    padding: var(--padding);
    max-width: 1200px;
    margin: 3em auto;
    display: grid;
    grid-template-columns: 400px 1fr;
    grid-gap: var(--grid-gap);
    gap: var(--grid-gap);
    overflow: hidden;
    position: relative;
    .novel-dir {
      display: flex;
      flex-direction: column;
      position: relative;

      a {
        width: 400px;
        height: 160px;
        background-color: var(--foreground-color);
        margin-bottom: 8px;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        display: block;
        box-shadow: 0 4px 24px #0003;
        text-decoration: none;
        text-shadow: 2px 2px #0006;
        border: 3px solid transparent;

        &.selected {
          border-color: hsla(#{$hsl}, 0.3);
        }

        &.general {
          height: 64px;
          font-size: 1.2em;
          display: flex;
          align-items: center;
          // justify-content: center;
          padding-left: 1em;
        }

        img {
          height: 100%;
          width: auto;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          clip-path: circle(71.3% at 28% 56%);
          // --gradient: circle 71.3% at 28% 56%, black 40%, transparent 50%;
          // -webkit-mask-image: radial-gradient(var(--gradient));
          // mask-image: radial-gradient(var(--gradient));
        }

        .metadata {
          margin-left: 30%;
          width: 60%;
          position: relative;
          z-index: 3;
          strong {
            margin-top: 0.4em;
            font-size: 2em;
            display: block;
          }
        }
      }
    }

    h1 {
      font-weight: 700;
      margin: 0;
      height: var(--header-height, auto);
      small {
        font-size: 1em;
        font-weight: 300;
        opacity: 0.45;
      }
    }

    @include screen("mobile") {
      --padding: 12px;
      --grid-gap: 1em;
      margin: 0;
      padding: 0;
      padding-top: var(--padding);
      grid-template-columns: auto;
      grid-template-rows: 4em auto;
      max-width: calc(100% + var(--padding));
      overflow-y: hidden;
      .novel-dir {
        flex-direction: row;
        flex-wrap: nowrap;
        position: relative;
        overflow-x: auto;
        overflow-y: hidden;
        padding: calc(-1 * var(--padding));
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
        padding-top: var(--padding);

        &::-webkit-scrollbar {
          display: none;
        }

        .wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: max-content;
          overflow-x: scroll;
          overflow-y: hidden;
          height: 100%;
          padding-left: var(--padding);

          a {
            max-height: 100%;
            width: max-content;
            display: inline-flex;
            align-items: center;
            padding: 2px 12px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow-x: hidden;

            &:not(:last-child) {
              margin-right: 0.25rem;
            }

            &.general {
              text-align: center;
            }
            .metadata {
              margin-left: 25%;
              width: auto;
              strong {
                font-size: 1.5em;
                margin-top: 0;
              }
            }
          }
        }
        // .wrapper {
        // }
      }

      .body {
        --header-height: 1.4em;
        max-width: calc(100vw - (var(--padding) * 1));
        padding-left: var(--padding);
        .comments {
          position: relative;
          overflow-y: scroll;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
          &::-webkit-scrollbar {
            display: none;
          }

          height: calc(
            100vh - var(--padding) - var(--header-height) - var(--grid-gap) -
              var(--mobile-menu-height)
          );
          padding-bottom: calc(var(--mobile-menu-height) + 0.5em);
        }
      }
    }
  }
</style>
