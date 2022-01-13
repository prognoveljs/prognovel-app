<script lang="ts">
  import { faSave } from "@fortawesome/free-solid-svg-icons";
  import Icon from "components/Icon.svelte";
  import { onMount } from "svelte";
  import { getDataFromFile } from "utils/admin";
  import { deepEqual } from "utils/misc";

  let dataSnapshot = {
    site_title: "",
    contact: "",
    disqus_id: "",
    image_resizer_service: "",
  };

  let siteTitle: string = "";
  let contactEmail: string = "";
  let disqusId: string = "";
  let imageResizeService: string = "";

  $: snap = dataSnapshot;

  $: canSubmit = () => {
    return deepEqual(dataSnapshot, {
      site_title: siteTitle,
      contact: contactEmail,
      disqus_id: disqusId,
      image_resizer_service: imageResizeService,
    });
  };

  onMount(async () => {
    dataSnapshot = (await getDataFromFile("settings")).data;
    siteTitle = dataSnapshot["site_title"];
    contactEmail = dataSnapshot["contact"];
    disqusId = dataSnapshot["disqus_id"];
    imageResizeService = dataSnapshot["image_resize_service"];
  });
</script>

<h1>Site configurations</h1>
<div class="flex">
  <label for="site-title">Site title</label>
  <input
    bind:value={siteTitle}
    placeholder="My Great ProgNovel Site"
    type="text"
    name="site-title"
    id="site-title"
  />
  <label for="contact">Contact email</label>
  <input
    bind:value={contactEmail}
    placeholder="admin@example.com"
    type="text"
    name="contact"
    id="contact"
  />
  <label for="disqus-id">Disqus Shortname ID</label>
  <input
    bind:value={disqusId}
    placeholder="my-disqus-channel"
    type="text"
    name="disqus-id"
    id="disqus-id"
  />
  <label for="image-resizer-service">Image resizer service</label>
  <input
    bind:value={imageResizeService}
    placeholder="https://www.example-image-resizer.com"
    type="text"
    name="image-resizer-service"
    id="image-resizer-service"
  />

  <button disabled={canSubmit()} class="submit">
    <Icon icon={faSave} color="var(--body-text-color)" size="1.5em" paddingBottom="4px" /> Save
  </button>

  <pre>{JSON.stringify(snap)}</pre>
</div>

<style lang="scss">
  .flex {
    display: flex;
    flex-direction: column;
    max-width: 30em;
  }
</style>
