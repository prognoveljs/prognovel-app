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
    ToggleSmall,
  } from "carbon-components-svelte";
  import { AddAlt } from "carbon-icons-svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";

  const dispatch = createEventDispatcher();

  let el: HTMLElement;
  export let data: any = {};
  export let novel_parent: string = "";
  let volume_parent: string = data?.volume_parent;
  let id = data?.id;
  let title = data?.title ?? "";
  let index = data?.index ?? 1;
  let content = data?.content ?? "";
  let is_published = data?.is_published ?? false;
  let is_monetized = data?.is_monetized ?? false;
  let title_spoiler = data?.title_spoiler ?? false;
  let readonly = !!id;
  let invalidIndex;
  let indexInvalidText;

  $: hot_data = {
    title,
    index,
    content,
    is_monetized,
    is_published,
    title_spoiler,
  };

  async function createChapter() {
    try {
      await checkConflictingIndex();
      await $backend.records.create("chapters", {
        volume_parent,
        novel_parent,
        ...hot_data,
      });
      refreshVolumeChapterList();
      dispatch("close");
    } catch (error) {
      showErrorMessage({ message: error });
    }
  }

  async function editChapter() {
    try {
      await checkConflictingIndex();
      console.log("Updating", id);
      await $backend.records.update("chapters", id, hot_data);
      refreshVolumeChapterList();
      dispatch("close");
    } catch (error) {
      showErrorMessage({ message: error });
    }
  }

  onMount(async () => {
    if (id) getLatestData();
  });

  async function getLatestData() {
    await backendReady;
    try {
      const d = await $backend.records.getOne("chapters", id);

      title = d.title;
      index = d.index;
      content = d.content;
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

    try {
      const res = await $backend.records.getList("chapters", 1, 10, {
        filter: `volume_parent = "${volume_parent}" && novel_parent = "${novel_parent}" && index = "${index}" && id != "${id}"`,
      });

      if (res?.totalItems) {
        invalidIndex = index;
        indexInvalidText = `Chapter index ${index} already exists.`;
        throw indexInvalidText;
      }
    } catch (error) {
      showErrorMessage({ message: error });
    }
  }
</script>

<div
  in:fade={{ duration: 300 }}
  out:fade={{ duration: 600 }}
  class="screen-overlay"
  on:click={() => dispatch("close")}
/>

<article
  bind:this={el}
  in:fly={{
    duration: 300,
    x: -el.clientWidth,
    easing: cubicOut,
    opacity: 1,
  }}
  out:fly={{
    duration: 600,
    x: -el.clientWidth,
    easing: cubicIn,
    opacity: 1,
  }}
>
  <section>
    <span class="title-and-index">
      <NumberInput
        invalid={!!indexInvalidText || index <= 0}
        invalidText={!!indexInvalidText ? indexInvalidText : "Must positive number."}
        on:change={() => {
          invalidIndex = null;
          indexInvalidText = null;
        }}
        {readonly}
        hideSteppers
        min={0}
        bind:value={index}
        label="Ch. Index"
      />
      <TextInput {readonly} bind:value={title} labelText="Chapter title" />
    </span>
    <div class="toggle-group">
      <Toggle bind:toggled={is_monetized} labelA="Not monetized" labelB="Currently monetized" />
      <Toggle
        bind:toggled={title_spoiler}
        labelA="Chapter title spoiler off"
        labelB="Chapter title spoiler on"
      />
    </div>
    <div style="margin-top: 1.5em" />
    <TextArea {readonly} labelText="Chapter content" bind:value={content} />
  </section>

  <ButtonSet class="cta">
    <Toggle class="publish" bind:toggled={is_published} labelA="Unpublished" labelB="Published" />
    <Button skeleton={readonly} icon={AddAlt} on:click={id ? editChapter : createChapter}
      >{id ? "Submit changes" : "Create chapter"}</Button
    >
  </ButtonSet>
</article>

<style lang="scss">
  $zIndex: 12;
  article {
    position: absolute;
    top: 0;
    left: 0;
    width: 65em;
    max-width: 70%;
    height: 100%;
    background-color: var(--foreground-color);
    z-index: $zIndex;
    padding: 3em 6em 2em 2em;

    .title-and-index {
      display: grid;
      gap: 1em;
      grid-template-columns: 10em 1fr;
    }

    .toggle-group {
      display: grid;
      grid-template-columns: 11.5em 12em;
      gap: 1em;
    }

    :global {
      .cta {
        margin-top: 1.5em;
        display: flex;
        justify-content: end;

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
    }
  }

  .screen-overlay {
    z-index: $zIndex - 1;
  }
</style>
