<script lang="ts">
  import {
    currentChapterCursor,
    toc,
    disableNextChapter,
    disablePrevChapter,
    nextChapterLink,
    prevChapterLink,
  } from "$lib/store/read-page";
</script>

<div class="pwa-header">
  <!-- <section>
    {#if !($disablePrevChapter || !$toc.length || !$currentChapterCursor)}
      <a id="prev-chapter" style="grid-area: prev;" href={$prevChapterLink}> Prev Chapter </a>
    {:else}<em style="grid-area: prev;">Prev Chapter</em>{/if}

    {#if !($disableNextChapter || !$toc.length)}
      <a
        id="next-chapter"
        style="grid-area: next;"
        class:disabled={$disableNextChapter || !$toc.length}
        href={$nextChapterLink}
      >
        {$disableNextChapter ? "Last chapter reached..." : "Next Chapter"}
      </a>
    {:else}<em style="grid-area: next;">Last chapter reached...</em>{/if}
  </section> -->
</div>

<style lang="scss">
  .pwa-header {
    position: fixed;
    left: env(titlebar-area-x);
    top: env(titlebar-area-y);
    width: env(titlebar-area-width);
    height: env(titlebar-area-height);
  }
</style>
