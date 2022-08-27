<script lang="ts">
  import { newsData } from "$lib/store/news-page";
  import { onMount } from "svelte";

  onMount(async () => {
    if (!$newsData.length) {
      const res = await fetch(import.meta.env.BACKEND_API + "/news");
      $newsData = await res.json();
    }
  });
</script>

<slot />
