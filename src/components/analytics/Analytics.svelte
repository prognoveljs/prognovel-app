<script lang="ts">
  import { GoogleAnalytics, ga } from "@beyonk/svelte-google-analytics";
  import { currentContent } from "store/read-page";
  import { currentNovel, novelsData } from "store/states";
  import { tick } from "svelte";
  export let page;
  export let propertyId = "G-M5KXSRL0P4";

  $: if (page) {
    (async function () {
      await tick();
      if (!(process as any).browser) return;
      if (!propertyId) return;
      if (page.error) return;
      while (chapterPageTitleIsLoading()) {
        await new Promise((resolve) => {
          setTimeout(resolve, 100);
        });
      }
      console.log("send", document.title);
      ga.addEvent("page_view", {
        page_title: document.title,
        page_location: window.location,
        page_path: page.path,
        send_to: propertyId,
      });
    })();
  }

  function chapterPageTitleIsLoading(): boolean {
    if (!page.novel) return false;
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
