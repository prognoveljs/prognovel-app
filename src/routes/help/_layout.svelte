<script context="module" lang="ts">
  export async function preload(page) {
    const { params, query, path } = page;
    const { slug } = params;
    let res = await this.fetch(`help.json`);
    // let res = await this.fetch(`${path.split("/").slice(0, -1).join("/") || path}.json`);
    let { parent, children } = await res.json();
    return { parent, children };
  }
</script>

<script lang="ts">
  import Index from "components/help-page/SidebarIndex.svelte";
  import Misc from "components/help-page/SidebarMisc.svelte";
  import { stores } from "@sapper/app";
  import { onDestroy } from "svelte";
  import { customBreadcrumbTitle } from "utils/navigation/custom-title";
  import { SITE_TITLE } from "settings";
  import { childData, showIndex } from "./_store";
  import Icon from "components/Icon.svelte";
  import { faList } from "@fortawesome/free-solid-svg-icons";
  import { fade } from "svelte/transition";

  export let parent = {};
  export let children = {};

  // @ts-ignore
  const { page } = stores();

  $: slug = $page && $page.path ? $page.path.split("help/")[1] : "";
  $: $customBreadcrumbTitle = $childData.title || parent[slug]?.title || "";
  $: pageTitle = $customBreadcrumbTitle;

  // $: console.log($page);

  onDestroy(() => {
    $customBreadcrumbTitle = "";
  });
</script>

<svelte:head>
  <title>{pageTitle || "Help"} | {SITE_TITLE}</title>
</svelte:head>

{#if $showIndex}
  <div
    in:fade={{ duration: 400 }}
    out:fade={{ duration: 150 }}
    class="overlay"
    on:click={() => ($showIndex = false)}
  />
{/if}

<div class="main">
  <div class="mobile-header" style="display:none">
    <div class="show-index" on:click={() => ($showIndex = !$showIndex)}>
      <Icon icon={faList} size="1.5em" paddingBottom="3px" />
    </div>
    <div class="text">
      {pageTitle || "Help"}
    </div>
  </div>
  <Index pages={parent} childPages={children} store={$page} />
  <article class="container-center body">
    <h1>{pageTitle || "Help"}</h1>
    <slot />
  </article>
  <Misc />
</div>

<style lang="scss">
  .main {
    --bleed-padding: 32px;
    --additional-padding: 0px;
    --code-padding: 32px;
    --code-bg-color: #0002;
    display: grid;
    justify-content: start;
    width: 100%;
    max-width: 80em;
    margin: 0 auto;
    grid-template-columns: 300px 1fr 250px;
    grid-template-areas: "index body misc";
    grid-gap: 8px;

    @include screen("tablet") {
      grid-template-columns: 300px 1fr;
      grid-template-rows: auto 200px;
      grid-template-areas: "index body" "index misc";
    }

    @include screen("mobile") {
      grid-template-columns: 100%;
      grid-template-rows: auto 60px;
      grid-template-areas: "body" "misc";

      .mobile-header {
        z-index: 5;
        display: flex !important;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        box-shadow: 0 2px 12px #0005;
        font-size: 1.25em;
        background-color: var(--foreground-color);
        overflow: hidden;

        .text {
          width: calc(100% - 60px);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .show-index {
          padding: 12px;
          border-radius: 50%;
          position: relative;
          margin-right: 8px;

          &::before {
            content: "";
            width: 150%;
            height: 150%;
            position: absolute;
            top: -25%;
            left: -50%;
            border-radius: 50%;
            background-color: var(--primary-color);
            z-index: -1;
          }
        }
      }
    }

    :global(code:not(:only-child)) {
      background: var(--code-bg-color);
    }

    :global(pre) {
      background: var(--code-bg-color);
      border-radius: 2px;
      width: calc(100% + var(--code-padding) * 2);
      transform: translateX(calc(var(--code-padding) * -1));
      padding: 24px;
    }

    :global(pre.language-md) {
      display: block;
      padding: 12px var(--code-padding);
      margin: 12px 0;
      overflow-x: auto;
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -pre-wrap;
      white-space: -o-pre-wrap;
      word-wrap: break-word;
    }

    :global(h2),
    :global(h2) {
      font-weight: 700;
    }

    :global(h1),
    :global(h2),
    :global(h3),
    :global(h4),
    :global(h5),
    :global(h6) {
      margin: 2em 0 0.5em;
    }

    :global(h1) {
      font-weight: 700;
    }

    :global(img) {
      width: calc(100% + var(--bleed-padding));
      margin: 0 calc(-0.5 * var(--bleed-padding));
    }

    :global(:not(pre) > code) {
      background-color: #fff3;
      border-radius: 2px;
      padding: 2px 8px;

      :global(html.light) & {
        background-color: #0003;
      }
    }
  }

  .body {
    padding: {
      left: calc(var(--bleed-padding) + var(--additional-padding));
      right: calc(var(--bleed-padding) + var(--additional-padding));
    }
    margin-top: 24px;
    grid-area: body;
    width: 100%;

    :global(a) {
      color: hsla(#{$h}, #{$s}, 65%, 1);
    }
  }

  .overlay {
    @include overlay();
    z-index: 3;
  }
</style>
