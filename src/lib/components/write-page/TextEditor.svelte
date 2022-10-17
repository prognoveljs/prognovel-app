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
  export let data = {} as any;
  onMount(async () => {
    hash = uuid();
    await tick();
    editor = new EditorJS({
      holderId: selector,
      data,
      onReady: () => {
        dispatch("ready", { editor, el });
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

<section bind:this={el} id={selector}>
  <!-- ... -->
</section>

<ButtonSet class="cta">
  <slot name="cta"><!-- optional fallback --></slot>
  {#if ctaButtonSecondaryLabel}
    <Button kind="secondary" on:click={secondaryEvent}>{ctaButtonSecondaryLabel}</Button>
  {/if}
  <Button on:click={primaryEvent}>{ctaButtonPrimaryLabel}</Button>
</ButtonSet>
<slot {editor} />

<style lang="scss">
  section {
    min-height: 400px;
    padding-top: 2em;
    background-color: #fffd;
    color: #000e;

    :global(.cta) {
      display: flex;
    }
  }
</style>
