<script lang="ts">
  import { GoogleAnalytics, ga } from "./index";
  import { currentNovel, novelsData } from "$lib/store/states";
  import { tick } from "svelte";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import { currentContent } from "$lib/store/read-page/vars";

  export let propertyId = import.meta.env.GA_TRACKING_ID;

  $: if ($page) {
    (async function () {
      await tick();
      if (!browser) return;
      if (!propertyId) return;
      if ($page.error) return;
      while (chapterPageTitleIsLoading()) {
        await new Promise((resolve) => {
          setTimeout(resolve, 100);
        });
      }
      console.log("send", document.title);
      ga.addEvent("page_view", {
        page_title: document.title,
        page_location: window.location,
        page_path: $page.url.pathname,
        send_to: propertyId,
      });
    })();
  }

  function chapterPageTitleIsLoading(): boolean {
    if (!$page.params.novel) return false;
    return !$novelsData[$currentNovel] || $currentContent?.title === "Loading...";
  }
</script>

{#if propertyId}
  <GoogleAnalytics
    properties={[propertyId]}
    configurations={{
      propertyId: {
        send_page_view: false,
      },
    }}
  />
{/if}
