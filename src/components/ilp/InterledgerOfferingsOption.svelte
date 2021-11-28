<script context="module">
  let index = 0;
</script>

<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import type { IlpOfferings } from "./ilp-offerings";

  export let name = "ilp-offerings";
  // export let value = "";
  export let price = "";
  export let iswebmonetization = false;
  export let iscreditcard = false;
  export let ispaypal = false;
  export let selected = false;

  const dispatch = createEventDispatcher();
  let id = "ilp-offering-" + index++;

  function onChange() {
    const data: IlpOfferings = {
      price,
      iswebmonetization,
      iscreditcard,
      ispaypal,
    };
    dispatch("picked", data);
  }

  onMount(() => {
    if (selected) onChange();
  });
</script>

<input checked={selected} on:change={onChange} type="radio" {id} {name} />
<label for={id}><slot>Choice</slot></label>

<style lang="scss">
  input {
    display: none;
  }

  label {
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid #0002;

    &:focus {
      --outline-alpha: 0.25;
      outline: 3px solid
        hsla(var(--primary-color-h), var(--primary-color-s), var(--primary-color-l), var(--outline-alpha));
    }
  }

  input:checked + label {
    background: #fff4;
  }
</style>
