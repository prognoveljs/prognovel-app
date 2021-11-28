<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import {
    currentChapterCursor,
    toc,
    disableNextChapter,
    disablePrevChapter,
    nextChapterLink,
    prevChapterLink,
  } from "store/read-page";

  const dispatch = createEventDispatcher();

  export let isFooter = false;

  const tableOfContent = () => {
    dispatch("toc");
  };
</script>

<div class:isFooter>
  <hr />
  <section>
    {#if !($disablePrevChapter || !$toc.length || !$currentChapterCursor)}
      <a style="grid-area: prev;" href={$prevChapterLink}> Prev Chapter </a>
    {:else}<em style="grid-area: prev;">Prev Chapter</em>{/if}

    <button style="grid-area: toc;" disabled={!$toc.length} on:click={tableOfContent}
      >Table of Content</button
    >
    {#if !($disableNextChapter || !$toc.length)}
      <a
        style="grid-area: next;"
        class:disabled={$disableNextChapter || !$toc.length}
        href={$nextChapterLink}
      >
        {$disableNextChapter ? "Last chapter reached..." : "Next Chapter"}
      </a>
    {:else}<em style="grid-area: next;">Last chapter reached...</em>{/if}
  </section>
</div>

<style lang="scss">
  hr {
    display: none;
  }

  section {
    --margin-top: 24px;
    display: grid;
    grid-template-columns: 2fr 3fr 3fr;
    grid-template-areas: "prev toc next";
    grid-gap: 4px;
    align-items: center;
    justify-content: space-between;
    margin-top: var(--margin-top);

    em {
      text-align: center;
      font-size: 14px;
      font-weight: 300;
      user-select: none;
    }
  }

  button,
  a {
    font-family: inherit;
    padding: 4px 8px;
    text-decoration: none;
    text-align: center;
    border: 2px solid var(--primary-color);
    background-color: hsla(var(--primary-color-h), 100%, 70%, 0.4);
    line-height: 1;
    font-size: 14px;
    border-radius: 2px;
    color: #fff;

    &:hover {
      background-color: hsla(var(--primary-color-h), 100%, 70%, 0.7);
    }
  }

  .isFooter {
    --padding: 12px;
    --margin-top: 0;

    button,
    a {
      padding: var(--padding);
    }

    hr {
      margin-top: 48px;
      opacity: 0.1;
      margin-bottom: 8px;
      display: block;
    }
  }
</style>
