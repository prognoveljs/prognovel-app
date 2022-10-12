<script lang="ts">
  import { backend } from "$lib/store/backend";
  import { Button, ButtonSet, NumberInput, TextArea, TextInput } from "carbon-components-svelte";
  import { AddAlt } from "carbon-icons-svelte";
  import { createEventDispatcher } from "svelte";
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

  async function createChapter() {
    try {
      await $backend.records.create("chapters", {
        volume_parent,
        novel_parent,
        title,
        index,
        content,
      });
      dispatch("chapterlistrefresh");
      dispatch("close");
    } catch (error) {}
  }

  async function editChapter() {
    try {
      await $backend.records.update("chapters", id, {
        title,
        index,
        content,
      });
      dispatch("chapterlistrefresh");
      dispatch("close");
    } catch (error) {}
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
  <span class="title-and-index">
    <NumberInput hideSteppers min={0} bind:value={index} label="Ch. Index" />
    <TextInput bind:value={title} labelText="Chapter title" />
  </span>
  <div style="margin-top: 1em" />
  <TextArea labelText="Chapter content" bind:value={content} />
  <ButtonSet class="cta">
    <Button icon={AddAlt} on:click={id ? editChapter : createChapter}
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

    :global(.cta) {
      margin-top: 1.5em;
      display: flex;
      justify-content: end;
    }
    :global(.bx--form-requirement) {
      margin: 0;
    }
  }

  .screen-overlay {
    z-index: $zIndex - 1;
  }
</style>
