<script>
  import { onDestroy } from "svelte";
  import { childData } from "./_store";

  export let title;
  $: $childData = { title };

  onDestroy(() => {
    $childData = {};
  });
</script>

<slot />
