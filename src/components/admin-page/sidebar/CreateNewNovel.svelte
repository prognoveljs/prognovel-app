<script lang="ts">
  import Modal from "components/Modal.svelte";
  import { createNovel } from "utils/admin/novel";
  import { newNovelTitle } from "utils/admin/_store";

  $: validNovelTitle = $newNovelTitle && /^[0-9a-z\-]+$/.test($newNovelTitle);
</script>

<Modal showModal={$newNovelTitle !== null} on:close={() => ($newNovelTitle = null)}>
  <div class="new-novel-flex">
    <strong>Enter ID for your new novel</strong>
    <em>only digits, lowcase letters, and dash (-) allowed</em>
    <input bind:value={$newNovelTitle} type="text" name="new-novel" id="new-novel" />
    <button
      on:click={() => {
        createNovel($newNovelTitle);
        $newNovelTitle = null;
      }}
      disabled={!validNovelTitle}
      class="submit">Create novel</button
    >
  </div>
</Modal>

<style lang="scss">
  :global(.new-novel-flex) {
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
      margin-bottom: 0;
    }

    em {
      margin-top: -4px;
      opacity: 0.7;
      font-weight: 300;
    }

    input {
      padding: 4px;
    }

    button {
      align-self: end;
    }
  }
</style>
