<script lang="ts">
  import HomeShortcut from "$lib/components/home-page/HomeShortcut.svelte";
  import { setContext } from "svelte";

  setContext("show-help", false);
</script>

<article>
  <!-- <Bookmark showHelp={false} /> -->
  <HomeShortcut --display="block" />
</article>

<style lang="scss">
  article {
    padding: 10% 12px;

    @include screen("tablet") {
      --item-height: 200px;
    }

    @include screen("mobile") {
      --item-height: 120px;
      --header-height: 0;
    }
  }
</style>
