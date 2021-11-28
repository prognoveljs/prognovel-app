<script lang="ts">
  import Navigation from "./_Navigation.svelte";
  import { createEventDispatcher } from "svelte";
  import { isMobileScreen } from "utils/mobile";
  import ReadHeader from "components/read-page/header/ReadHeader.svelte";
  const dispatch = createEventDispatcher();

  function tableOfContent() {
    dispatch("toc");
  }

  export let title = "Loading...";
</script>

<ReadHeader {title} />

<article>
  <Navigation on:toc={tableOfContent} />
</article>

<style lang="scss">
  @import "vars";

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
