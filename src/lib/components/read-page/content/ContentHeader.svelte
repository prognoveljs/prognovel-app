<script lang="ts">
  import Navigation from "./ClassicNavigation.svelte";
  import { createEventDispatcher } from "svelte";
  import ReadHeader from "$lib/components/read-page/header/ReadHeader.svelte";
  import SpeechSyntesis from "$lib/components/read-page/speech-synthesis/SpeechSyntesis.svelte";
  const dispatch = createEventDispatcher();

  function tableOfContent() {
    dispatch("toc");
  }

  export let title = "Loading...";
  export let book = "";
  export let chapter = "";
</script>

<ReadHeader {book} {chapter} {title} />

<article>
  <Navigation on:toc={tableOfContent} />
</article>

<style lang="scss">
  @import "../../../../routes/read/vars";

  article {
    padding: 24px calc(#{$padding-base} + #{$padding-ratio});
    padding-right: calc(#{$padding-base} + #{$padding-ratio / 4});
    margin: 0 auto;

    @include screen("mobile") {
      display: none;
    }
  }

  @media all and (max-width: 1350px) {
    article {
      padding-right: 24px;
      padding-left: 24px;
      max-width: $contentIntrinsicWidth;
    }
  }
</style>
