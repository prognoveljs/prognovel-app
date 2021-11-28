<script lang="ts">
  import Modal from "components/Modal.svelte";
  import { showDownload } from "store/novel-page";
  import { isMobileScreen } from "utils/mobile";
  import Download from "./Download.svelte";
</script>

{#if $showDownload}
  <div class="overlay" on:click={() => ($showDownload = false)} />
{/if}
{#if isMobileScreen()}
  <article class:show={$showDownload}>
    <Download mobileDisplay="block" />
  </article>
{:else}
  <Modal showModal={$showDownload}>
    <Download />
  </Modal>
{/if}

<style lang="scss">
  article {
    @include screen("mobile") {
      @include mobile-modal();
    }
  }

  .overlay {
    @include overlay();
  }
</style>
