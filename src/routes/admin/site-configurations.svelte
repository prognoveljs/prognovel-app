<script lang="ts">
  import { faSave } from "@fortawesome/free-solid-svg-icons";
  import Icon from "$lib/components/Icon.svelte";
  import { onMount } from "svelte";
  import { saveDataForFile } from "$lib/utils/admin/data";
  import { adminSiteData } from "$lib/utils/admin/_store";
  import { deepEqual } from "$lib/utils/misc";

  let dataSnapshot = {
    site_title: "",
    contact: "",
    disqus_id: "",
    image_resizer_service: "",
  };

  let site_title: string = "";
  let contact: string = "";
  let disqus_id: string = "";
  let image_resizer_service: string = "";

  $: canSubmit = () => {
    return !deepEqual(dataSnapshot, getDataStructure());
  };

  $: getDataStructure = () => {
    return {
      site_title: site_title || "",
      contact: contact || "",
      disqus_id: disqus_id || "",
      image_resizer_service: image_resizer_service || "",
    };
  };

  function saveData() {
    saveDataForFile("settings", getDataStructure());
    dataSnapshot = getDataStructure();
  }

  onMount(async () => {
    dataSnapshot = await new Promise(async (resolve) => {
      while (JSON.stringify($adminSiteData) === "{}") {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      resolve({
        site_title: $adminSiteData.site_title || "",
        contact: $adminSiteData.contact || "",
        disqus_id: $adminSiteData.disqus_id || "",
        image_resizer_service: $adminSiteData.image_resizer_service || "",
      });
    });
    site_title = dataSnapshot["site_title"];
    contact = dataSnapshot["contact"];
    disqus_id = dataSnapshot["disqus_id"];
    image_resizer_service = dataSnapshot["image_resize_service"];
  });
</script>

<h1>Site configurations</h1>
<div class="flex">
  <label for="site-title">Site title</label>
  <input
    bind:value={site_title}
    placeholder="My Great ProgNovel Site"
    type="text"
    name="site-title"
    id="site-title"
  />
  <label for="contact">Contact email</label>
  <input
    bind:value={contact}
    placeholder="admin@example.com"
    type="text"
    name="contact"
    id="contact"
  />
  <label for="disqus-id">Disqus Shortname ID</label>
  <input
    bind:value={disqus_id}
    placeholder="my-disqus-channel"
    type="text"
    name="disqus-id"
    id="disqus-id"
  />
  <label for="image-resizer-service">Image resizer service</label>
  <input
    bind:value={image_resizer_service}
    placeholder="https://www.example-image-resizer.com"
    type="text"
    name="image-resizer-service"
    id="image-resizer-service"
  />

  <button disabled={!canSubmit()} class="submit" on:click={saveData}>
    <Icon icon={faSave} color="var(--body-text-color)" size="1.5em" paddingBottom="4px" /> Save
  </button>
</div>

<style lang="scss">
  .flex {
    display: flex;
    flex-direction: column;
    max-width: 30em;
  }
</style>
