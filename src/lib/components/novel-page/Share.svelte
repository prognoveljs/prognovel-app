<script>
  import Modal from "$lib/components/Modal.svelte";
  import { onMount, onDestroy } from "svelte";
  import { windowLock, windowUnlock } from "$lib/utils/window/lock";
  export let title = "";
  export let show;
</script>

<Modal showModal={show} on:close>
  <h1>Share {title}</h1>
  <p>Coming soon...</p>
</Modal>

<style lang="scss">
</style>
