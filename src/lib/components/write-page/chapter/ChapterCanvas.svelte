<script lang="ts">
  import { backend } from "$lib/store/backend";
  import { backendReady } from "$lib/utils/backend";
  import { showErrorMessage } from "$lib/utils/error";
  import { refreshVolumeChapterList } from "$lib/utils/write-page/volume";
  import {
    Button,
    ButtonSet,
    NumberInput,
    TextArea,
    TextInput,
    Toggle,
  } from "carbon-components-svelte";
  import { AddAlt } from "carbon-icons-svelte";
  import { createEventDispatcher, onMount, tick } from "svelte";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { fade, fly, scale } from "svelte/transition";
  import TextEditor from "../TextEditor.svelte";
  import editorHTML from "editorjs-html";
  import { delay } from "$lib/utils/misc";
  import { XCircleIcon } from "svelte-feather-icons";

  const dispatch = createEventDispatcher();

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

  $: hot_data = {
    title,
    index,
    content,
    editor_data,
    is_monetized,
    is_published,
    title_spoiler,
  };

  interface SubmitOpts {
    isDraft?: boolean;
  }
  async function createChapter(key: string, raw_data: any, opts: SubmitOpts = {}) {
    let data = JSON.parse(JSON.stringify(raw_data));
    if (opts?.isDraft) delete data.content;

    try {
      await checkConflictingIndex();
      const res = await $backend.collection(key).create(data);
      id = res.id;

      wrapChapterSave(opts);
    } catch (error) {
      showErrorMessage({ message: error });
    }
  }

  async function editChapter(key: string, raw_data: any, opts: SubmitOpts = {}) {
    let data = JSON.parse(JSON.stringify(raw_data));
    if (opts?.isDraft) delete data.content;
    console.log({ data, opts });
    try {
      await checkConflictingIndex();
      await $backend.collection(key).update(id, data);

      wrapChapterSave(opts);
    } catch (error) {
      showErrorMessage({ message: error });
    }
  }

  function wrapChapterSave(opts: SubmitOpts = {}) {
    if (!opts?.isDraft) {
      refreshVolumeChapterList();
      dispatch("close");
    } else {
      hasChange = true;
    }
  }

  onMount(async () => {
    if (id) getLatestData();
  });

  async function getLatestData() {
    await backendReady;
    try {
      const d = await $backend.collection("chapters").getOne(id);

      title = d.title;
      index = d.index;
      content = d.content;
      editor_data = d.editor_data;
      is_published = d.is_published;
      is_monetized = d.is_monetized;
      title_spoiler = d.title_spoiler;

      readonly = false;
    } catch (error) {
      showErrorMessage({ message: error });
    }
  }

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

  async function submit(e: any, opts: SubmitOpts = {}) {
    try {
      const editorData = await e.detail.editor.save();
      const parsedData = editorHTML().parse(editorData) || [];
      editor_data = editorData;
      content = parsedData.join("");
      await tick();
      return id
        ? editChapter("chapters", hot_data, opts)
        : createChapter(
            "chapters",
            {
              volume_parent,
              novel_parent,
              ...hot_data,
            },
            opts,
          );
    } catch (error) {
      showErrorMessage({ message: error });
    }
  }
</script>

<div in:fade={{ duration: 300 }} out:fade={{ duration: 600 }} class="screen-overlay" />

<div class="container-wrapper">
  <article
    bind:this={el}
    in:scale={{
      duration: 225,
      start: 0.925,
      easing: cubicOut,
      opacity: 0,
    }}
    out:scale={{
      duration: 600,
      start: 0.95,
      easing: cubicIn,
      opacity: 0,
    }}
  >
    <section class="header">
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
    </section>

    {#if !(id && JSON.stringify(editor_data) === "{}")}
      <div style="margin-top:1em;" />
      <TextEditor
        size="24px"
        on:primary-event={async (e) => submit(e)}
        on:secondary-event={async (e) => submit(e, { isDraft: true })}
        disablePrimary={disableSubmit}
        disableSecondary={disableSubmit}
        ctaButtonPrimaryLabel={id ? "Submit changes" : "Create chapter"}
        data={editor_data}
        on:ready={async (e) => {
          try {
            e.detail.el.focus();
            e.detail.editor.toolbar.open();
          } catch (error) {
            showErrorMessage({ message: error });
          }
        }}
        on:change={() => (hasChange = true)}
      >
        <div slot="cta">
          <Toggle
            class="publish"
            bind:toggled={is_published}
            labelA="Unpublished"
            labelB="Published"
          />
        </div>
      </TextEditor>
    {/if}
    <div
      in:fly={{
        duration: 300,
        easing: cubicOut,
        delay: 200,
        y: -4,
      }}
      out:fly={{
        duration: 350,
        easing: cubicIn,
        delay: 0,
        y: -2,
      }}
      class="close"
      on:click={() => dispatch("close")}
    >
      <XCircleIcon size="32" />
    </div>
  </article>
</div>

<style lang="scss">
  $zIndex: 12;
  .container-wrapper {
    --bg-color: #fff;
    --padding-top: 3em;
    --padding-bottom: 1em;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    // max-width: 70%;
    height: 100%;
    display: flex;
    gap: 1.25em;
    z-index: 9999999999999999;
    isolation: isolate;
    background-color: var(--bg-color);
    overflow-y: scroll;
  }

  article {
    z-index: $zIndex;
    padding: 0 6em 2em var(--padding-bottom);
    width: 100%;
    max-width: 70em;
    margin: 0 auto;

    .header {
      background-color: var(--bg-color);
      position: sticky;
      top: 0;
      padding-top: var(--padding-top);
      padding-bottom: 0.5em;
      z-index: 5;
    }

    .title-and-index {
      display: grid;
      gap: 2em;
      grid-template-columns: 10em 1fr;

      div {
        position: relative;
        display: flex;

        input {
          width: 100%;
          --border-color: #0002;
          font-size: 3em;
          border: none;
          outline: none;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.33em;

          &:active,
          &:focus {
            --border-color: var(--primary-color);
          }

          &.invalid {
            background-color: #a222;
          }
        }

        .label {
          position: absolute;
          top: -2em;
          left: 0;
          color: #2227;
        }
      }
    }

    .toggle-group {
      display: grid;
      grid-template-columns: 11.5em 12em;
      gap: 1em;
    }

    /* width */
    &::-webkit-scrollbar {
      width: 0.4rem;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      // box-shadow: inset 0 0 5px grey;
      // border-radius: 10px;
      background-color: #fff2;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      --opacity: 0.6;
      background-color: hsla(#{$hsl}, var(--opacity));
      transition: all 0.3s ease-in-out;

      &:hover {
        --opacity: 0.8;
      }
    }

    :global {
      .editorjs {
        min-height: 100vh;
      }

      .cta {
        margin-top: 1.5em;
        display: flex;
        justify-content: end;
        position: sticky;
        bottom: 0;
        padding-bottom: var(--padding-bottom);
        background-color: var(--bg-color);
        z-index: 5;

        .publish {
          width: 11em;
          flex: none;
          user-select: none;
        }
      }

      .bx--form-requirement {
        margin: 0;
      }

      .bx--number[data-invalid] .bx--number__input-wrapper ~ .bx--form-requirement {
        width: max-content;
        position: absolute;
        bottom: -1.5em;
      }

      .bx--toggle-input__label {
        color: #444;
      }
    }
  }

  .close {
    opacity: 0.75;
    color: rgb(224, 85, 85);
    cursor: pointer;
    z-index: $zIndex + 1;
    position: fixed;
    height: min-content;
    top: 2em;
    right: 2em;

    &:hover {
      opacity: 1;
    }
  }

  .screen-overlay {
    z-index: $zIndex - 1;
  }
</style>
