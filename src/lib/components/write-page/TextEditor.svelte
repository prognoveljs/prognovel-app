<script lang="ts">
  import { frameTick } from "$lib/utils/animation";
  import { showErrorMessage } from "$lib/utils/error";
  import EditorJS from "@editorjs/editorjs";
  import { Button, ButtonSet } from "carbon-components-svelte";
  import { uuid } from "short-uuid";
  import { createEventDispatcher, onMount, tick } from "svelte";

  const dispatch = createEventDispatcher();
  let hash = "";
  $: selector = `editor-${hash}`;
  let editor: EditorJS;
  let el: HTMLElement;
  export let ctaButtonPrimaryLabel = "Publish";
  export let ctaButtonSecondaryLabel = "Save draft";
  export let disablePrimary: boolean = false;
  export let disableSecondary: boolean = false;
  export let data = {} as any;
  export let size = "18px";
  export let autofocus: boolean = false;
  onMount(async () => {
    hash = uuid();
    await tick();
    editor = new EditorJS({
      holderId: selector,
      data,
      autofocus,
      tools: {},
      onReady: () => {
        dispatch("ready", { editor, el });
      },
      onChange: (api, ev) => {
        dispatch("change", ev);
      },
    });
  });

  async function primaryEvent() {
    dispatch("primary-event", { editor, el });
  }
  async function secondaryEvent() {
    dispatch("secondary-event", { editor, el });
  }
</script>

<section class="editorjs" bind:this={el} id={selector} style="--size:{size};">
  <!-- ... -->
</section>

<ButtonSet class="cta">
  <slot name="cta"><!-- optional fallback --></slot>
  {#if ctaButtonSecondaryLabel}
    <Button disabled={disableSecondary} kind="secondary" on:click={secondaryEvent}
      >{ctaButtonSecondaryLabel}</Button
    >
  {/if}
  <Button disabled={disablePrimary} on:click={primaryEvent}>{ctaButtonPrimaryLabel}</Button>
</ButtonSet>
<slot {editor} />

<style lang="scss">
  section {
    min-height: 400px;
    padding-top: 2em;
    background-color: #fffd;
    color: #000e;
    font-size: var(--size, 16px);

    :global {
      .ce-toolbar__content,
      .ce-block__content {
        max-width: none;
      }

      .ce-toolbar__actions {
        right: calc(100% + 1em);
        top: 0.33em;
      }
    }

    :global(.cta) {
      display: flex;
    }
  }
</style>
