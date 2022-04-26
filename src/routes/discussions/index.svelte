<script context="module" lang="ts">
  import { isBrowser } from "$lib/store/states";
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ params }) {
    const { novel } = params;
    return {
      props: { novel, load: isBrowser ? new URL(location.href).searchParams.get("load") : "" },
    };
  }
</script>

<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  export let load;
  export let novel;

  onMount(async () => {
    console.log("🚀 redirecting to", load);
    load = novel ? "/discussions/" + load : "/";
    goto(load);
  });
</script>
