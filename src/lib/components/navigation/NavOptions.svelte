<script lang="ts">
  import OptionDarkMode from "./options/OptionDarkMode.svelte";
  import OptionColors from "./options/OptionColors.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import OptionWebMonetization from "./options/OptionWebMonetization.svelte";

  export let open: boolean = false;
</script>

<article>
  <Modal width={430} showModal={open} on:close>
    <OptionDarkMode />
    <OptionColors />
    <OptionWebMonetization />
  </Modal>
</article>

<style lang="scss">
  article {
    :global(h5) {
      font-weight: 300;
      padding: 0 12px;
      opacity: 0.6;
      font-size: 15px;
    }

    :global(.modal::after) {
      // background-color: red;
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      background: linear-gradient(to top, #0005, #0000);
      width: 100%;
      height: 70%;
      z-index: -1;
      pointer-events: none;
    }
  }
</style>
