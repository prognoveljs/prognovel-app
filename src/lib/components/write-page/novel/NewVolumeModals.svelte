<script lang="ts">
  import Modal from "$lib/components/Modal.svelte";
  import { backend } from "$lib/store/backend";
  import { TextArea, TextInput } from "carbon-components-svelte";
  import { createEventDispatcher } from "svelte";

  export let novelParent = "";
  export let order = 1;
  let title = "";
  let blurb = "";
  $: disabled = !title.length || !novelParent;
  const dispatch = createEventDispatcher();

  async function createVolume() {
    if (!novelParent) return;
    try {
      await $backend.collection("volumes").create({
        novel_parent: novelParent,
        order,
        title,
        blurb,
      });
      dispatch("refreshlist");
      dispatch("close");
    } catch (error) {}
  }
</script>

<Modal style="padding-bottom:2em" showModal={true} on:close>
  <TextInput bind:value={title} labelText="Volume title (e.g, Book 1 - The Beginning)" />
  <TextArea bind:value={blurb} labelText="Volume blurb" />
  <button {disabled} on:click={createVolume}> Create novel volume </button>
  <!-- <TextInput bind:value={title} labelText="Volume title (e.g, Book 1 - The Beginning)" /> -->
</Modal>

<style lang="scss">
  button {
    padding: 1em;
    width: 100%;
    background-color: var(--primary-color-darken-2);
    outline: none;
    border: none;
    font-weight: 500;
    color: #fffd;
    cursor: pointer;
    filter: brightness(120%);
    margin-top: 2em;

    &:hover {
      filter: brightness(140%);
    }

    &:disabled {
      cursor: auto;
      filter: contrast(80%) brightness(100%) grayscale(20%);
      pointer-events: none;
    }
  }
</style>
