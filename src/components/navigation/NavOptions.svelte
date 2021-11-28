<script lang="ts">
  import OptionDarkMode from "./options/OptionDarkMode.svelte";
  import OptionColors from "./options/OptionColors.svelte";
  import Modal from "components/Modal.svelte";
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
  }
</style>
