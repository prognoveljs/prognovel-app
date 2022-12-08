<script lang="ts">
  import { backend } from "$lib/store/backend";
  import { showErrorMessage } from "$lib/utils/error";
  import { refreshVolumeChapterList } from "$lib/utils/write-page/volume";
  import { createEventDispatcher, onMount, tick } from "svelte";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { fade, fly, scale } from "svelte/transition";
  import TextEditor from "./TextEditor.svelte";
  import editorHTML from "editorjs-html";
  import { Toggle } from "carbon-components-svelte";
  import { XCircleIcon } from "svelte-feather-icons";
  import { backendReady } from "$lib/utils/backend";

  let hasChange = false;
  let el: HTMLElement;
  const dispatch = createEventDispatcher();
  export let beforeContentSave: Function = async () => {};
  export let id = "";
  export let referenceData = {};
  export let rawData: any = {};
  export let disableSubmit = false;
  export let tableKey = "posts";
  let is_published = false;
  let content = "";

  $: lastSavedContent = rawData?.editor_data?.$saved;

  async function createChapter(key: string, raw_data: any, opts: SubmitOpts = {}) {
    let data = cloneDataWithCleanedRaw(raw_data, opts);

    try {
      await beforeContentSave();
      const res = await $backend.collection(key).create(data);
      id = res.id;
      dispatch("updateid", id);

      wrapChapterSave(opts);
    } catch (error) {
      showErrorMessage({ message: error });
    }
  }

  async function editChapter(key: string, raw_data: any, opts: SubmitOpts = {}) {
    let data = cloneDataWithCleanedRaw(raw_data, opts);

    try {
      await beforeContentSave();
      await $backend.collection(key).update(id, data);

      wrapChapterSave(opts);
    } catch (error) {
      showErrorMessage({ message: error });
    }
  }

  function wrapChapterSave(opts: SubmitOpts = {}) {
    if (!opts?.isDraft) {
      close();
    } else {
      hasChange = true;
    }
  }

  async function submit(e: any, opts: SubmitOpts = {}) {
    try {
      const editorData = await e.detail.editor.save();
      const parsedData = editorHTML().parse(editorData) || [];
      const { editor_data: _, content: __, ...metadata } = rawData;
      rawData.editor_data = { ...editorData, ...metadata, $saved: new Date() };
      rawData.is_published = is_published;
      content = parsedData.join("");
      await tick();

      dispatch("submit");
      return id
        ? editChapter(tableKey, rawData, opts)
        : createChapter(
            tableKey,
            {
              ...referenceData,
              ...rawData,
            },
            opts,
          );
    } catch (error) {
      showErrorMessage({ message: error });
    }
  }

  onMount(async () => {
    if (id) await getLatestData();
    dispatch("ready");
  });

  function close() {
    refreshVolumeChapterList();
    dispatch("close");
  }

  async function getLatestData() {
    await backendReady;
    try {
      const d = await $backend.collection(tableKey).getOne(id);
      dispatch("latestdata", d);
    } catch (error) {
      showErrorMessage({ message: error });
    }
  }

  function cloneDataWithCleanedRaw(raw_data: any, opts: SubmitOpts = {}) {
    let data = JSON.parse(JSON.stringify(raw_data));
    if (opts?.isDraft) {
      playDraftSaveAnimation();
      return { editor_data: data.editor_data };
    }

    data.published_at = new Date();

    return data;
  }

  interface SubmitOpts {
    isDraft?: boolean;
  }

  let draftSaveAnimation = false;
  async function playDraftSaveAnimation() {
    draftSaveAnimation = true;
    await tick();
    draftSaveAnimation = false;
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
      <slot name="header"><!-- optional fallback --></slot>
    </section>

    {#if !(id && JSON.stringify(rawData?.editor_data) === "{}")}
      <div style="margin-top:1em;" />
      <TextEditor
        size="24px"
        on:primary-event={async (e) => submit(e)}
        on:secondary-event={async (e) => submit(e, { isDraft: true })}
        disablePrimary={disableSubmit}
        disableSecondary={disableSubmit}
        ctaButtonPrimaryLabel={id ? "Submit changes" : "Create chapter"}
        data={rawData?.editor_data}
        saved={lastSavedContent}
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
  </article>
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
    on:click={close}
  >
    <XCircleIcon size="32" />
  </div>
  <slot contendata={{ ...referenceData, ...rawData }} />
</div>

{#if draftSaveAnimation}
  <div class="draft-saved" out:fade={{ duration: 2000, easing: cubicIn }}>
    <span> saved... </span>
  </div>
{/if}

<style lang="scss">
  $zIndex: 12;
  .container-wrapper {
    --bg-color: #fff;
    --padding-top: 3em;
    --padding-bottom: 0.5em;
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
      z-index: 5;
      margin: {
        left: -10em;
        right: -10em;
      }
      padding: {
        top: var(--padding-top);
        bottom: 0.5em;
        left: 10em;
        right: 10em;
      }

      :global {
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

          & + .label {
            position: absolute;
            top: -2em;
            left: 0;
            color: #2227;
          }
        }

        .toggle-group {
          display: grid;
          grid-template-columns: 11.5em 12em;
          gap: 1em;
        }
      }
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

        background-color: var(--bg-color);

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
    top: 18px;
    right: 24px;

    &:hover {
      opacity: 1;
    }
  }

  .screen-overlay {
    z-index: $zIndex - 1;
  }

  .draft-saved {
    position: fixed;

    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999999999999;
    width: 100%;
    left: 0;
    pointer-events: none;

    span {
      font-size: 3em;
      padding: 0.25em 1.5em;
      border-radius: 8px;
      background-color: #ccc;
      color: #0007;
    }
  }
</style>
