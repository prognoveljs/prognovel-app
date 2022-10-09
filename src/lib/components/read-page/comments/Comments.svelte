<script lang="ts">
  import { browser } from "$app/environment";
  import Disqus from "$lib/components/comments/disqus/Disqus.svelte";
  // import { currentChapterCursor } from "$lib/store/read-page";
  import { showComments } from "$lib/store/read-page/state";
  import { currentChapterCursor } from "$lib/store/read-page/vars";
  import { siteMetadata } from "$lib/store/states";
  import { fade } from "svelte/transition";

  $: hasDisqus = Boolean($siteMetadata?.disqus_id);
</script>

{#if hasDisqus && browser}
  {#if $showComments}
    <div
      in:fade={{ duration: 400 }}
      out:fade={{ duration: 150 }}
      class="overlay"
      on:click={() => ($showComments = false)}
    />
  {/if}
  {#key $currentChapterCursor}
    <section class="contain" class:show={$showComments}>
      <Disqus src={$siteMetadata.disqus_id} identifier="comments" />
    </section>
  {/key}
{/if}

<style lang="scss">
  section {
    margin: 2em auto 0;
    max-width: var(--contentMaxWidth);
    @include screen("mobile") {
      @include mobile-modal();

      height: 70vh;
      overflow-y: scroll;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0005;
    z-index: 447;
  }
</style>
