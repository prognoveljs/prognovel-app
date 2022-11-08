<script lang="ts">
  import { backend } from "$lib/store/backend";
  import { Toggle } from "carbon-components-svelte";
  import ContentEditor from "../ContentEditor.svelte";

  let el: HTMLElement;
  export let data: any = {};
  export let novel_parent: string = "";
  let volume_parent: string = data?.volume_parent;
  let title = data?.title ?? "New post";
  let content = data?.content ?? "";
  let is_published = data?.is_published ?? false;
  let is_monetized = data?.is_monetized ?? false;
  let hasChange = false;
  $: id = data?.id;
  $: editor_data = {};
  $: isInvalidPostTitle = !title?.length;
  $: isInvalidPostContent = !content?.length;

  $: disableSubmit = isInvalidPostContent || isInvalidPostTitle;

  let readonly = !!id;

  $: rawData = {
    title,
    content,
    editor_data,
    is_monetized,
    is_published,
  };

  async function checkConflictingIndex() {
    return;
  }

  function updateData(e) {
    const { detail } = e;
    console.log(e);

    title = detail.title;
    content = detail.content;
    editor_data = detail.editor_data;
    is_monetized = detail.is_monetized;
    is_published = detail.is_published;
  }
</script>

<ContentEditor
  {rawData}
  referenceData={{ volume_parent, novel_parent }}
  {id}
  beforeContentSave={checkConflictingIndex}
  tableKey="posts"
  on:close
  on:latestdata={updateData}
  on:updateid={(e) => (id = e.detail)}
>
  <div slot="header">
    <span class="title-and-index">
      <div>
        <input type="text" {readonly} bind:value={title} class:invalid={isInvalidPostTitle} />
        <span class="label">Post title </span>
      </div>
    </span>
    <div class="toggle-group">
      <Toggle bind:toggled={is_monetized} labelA="Not monetized" labelB="Currently monetized" />
    </div>
  </div>
</ContentEditor>

<style lang="scss">
  .title-and-index {
    display: grid;
    gap: 2em;
    grid-template-columns: 1fr;

    div {
      position: relative;
      display: flex;
    }
  }
</style>
