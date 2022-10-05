<script lang="ts">
  import { TextArea, TextInput } from "carbon-components-svelte";

  export let data;

  $: ({ chapterData } = data);
  $: title = chapterData?.title || "";
  $: index = chapterData?.index || "";
  $: content = chapterData?.content || "";

  $: console.log(data);
</script>

<div class="title-index-flex">
  <span class="chapter-index">
    <div class="label">Chapter-</div>
    <TextInput bind:value={index} />
  </span>
  <TextInput bind:value={title} labelText="Chapter title" />
</div>
<TextArea bind:value={content} labelText="Content" />

<style lang="scss">
  .title-index-flex {
    display: flex;
    gap: 1em;

    .chapter-index {
      display: flex;
      align-items: end;
      gap: 0.5em;

      .label {
        align-self: flex-end;
        padding-bottom: 8px;
      }
    }
  }
</style>
