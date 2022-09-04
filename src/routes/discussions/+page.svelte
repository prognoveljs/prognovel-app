<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  export let data;
  $: ({ load, novel } = data);

  onMount(async () => {
    load = "/discussions/" + load;
    console.log("🚀 redirecting to", novel, load);
    goto(load);
  });
</script>
