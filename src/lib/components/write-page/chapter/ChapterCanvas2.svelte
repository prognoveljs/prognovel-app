<script lang="ts">
  import { backend } from "$lib/store/backend";
  import { Toggle } from "carbon-components-svelte";
  import ContentEditor from "../ContentEditor.svelte";

  let el: HTMLElement;
  export let data: any = {};
  export let novel_parent: string = "";
  let volume_parent: string = data?.volume_parent;
  let title = data?.title ?? "";
  let index = data?.index ?? 1;
  let content = data?.content ?? "";
  let is_published = data?.is_published ?? false;
  let is_monetized = data?.is_monetized ?? false;
  let title_spoiler = data?.title_spoiler ?? false;
  let invalidIndex;
  let indexInvalidText;
  let hasChange = false;
  $: id = data?.id;
  $: editor_data = {};
  $: isInvalidChapterIndex = !!indexInvalidText || index <= 0;
  $: isInvalidChapterTitle = !title?.length;
  $: isInvalidChapterContent = !content?.length;

  $: disableSubmit = isInvalidChapterContent || isInvalidChapterIndex || isInvalidChapterTitle;

  let readonly = !!id;

  $: rawData = {
    title,
    index,
    content,
    editor_data,
    is_monetized,
    is_published,
    title_spoiler,
  };

  async function checkConflictingIndex() {
    if (index <= 0) {
      invalidIndex = index;
      indexInvalidText = `Chapter index must greater than 0.`;
      throw indexInvalidText;
    }

    const res = await $backend.collection("chapters").getList(1, 10, {
      filter: `volume_parent = "${volume_parent}" && novel_parent = "${novel_parent}" && index = "${index}" && id != "${id}"`,
    });

    if (res?.totalItems) {
      invalidIndex = index;
      indexInvalidText = `Chapter index ${index} already exists.`;
      throw indexInvalidText;
    }
  }

  function updateData(e) {
    const { detail } = e;
    console.log(e);

    title = detail.title;
    index = detail.index;
    content = detail.content;
    editor_data = detail.editor_data;
    is_monetized = detail.is_monetized;
    is_published = detail.is_published;
    title_spoiler = detail.title_spoiler;
  }
</script>

<ContentEditor
  {rawData}
  referenceData={{ volume_parent, novel_parent }}
  {id}
  beforeContentSave={checkConflictingIndex}
  tableKey="chapters"
  on:close
  on:latestdata={updateData}
  on:updateid={(e) => (id = e.detail)}
>
  <div slot="header">
    <span class="title-and-index">
      <div>
        <input
          {readonly}
          bind:value={index}
          min="0"
          type="number"
          name="chapter-canvas-index"
          id="chapter-canvas-index"
          class:invalid={isInvalidChapterIndex}
        />
        <span class="label">Ch. index </span>
      </div>
      <div>
        <input
          type="text"
          {readonly}
          bind:value={title}
          id="chapter-canvas-title"
          class:invalid={isInvalidChapterTitle}
        />
        <span class="label">Chapter title </span>
      </div>
    </span>
    <div class="toggle-group">
      <Toggle bind:toggled={is_monetized} labelA="Not monetized" labelB="Currently monetized" />
      <Toggle
        bind:toggled={title_spoiler}
        labelA="Chapter title spoiler off"
        labelB="Chapter title spoiler on"
      />
    </div>
  </div>
</ContentEditor>

<style lang="scss">
  .title-and-index {
    display: grid;
    gap: 2em;
    grid-template-columns: 10em 1fr;

    div {
      position: relative;
      display: flex;
    }
  }
</style>
