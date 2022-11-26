<script lang="ts">
  import { goto } from "$app/navigation";
  import Icon from "$lib/components/Icon.svelte";
  import { backend } from "$lib/store/backend";
  import { profile, userData } from "$lib/store/user";
  import { faPlus } from "@fortawesome/free-solid-svg-icons";
  import { Button, ButtonSet, TextArea, TextInput } from "carbon-components-svelte";
  import { Save, Send, SendAlt, SendAltFilled } from "carbon-icons-svelte";
  import { novelIndex } from "$lib/components/write-page/_shared";
  import { showErrorMessage } from "$lib/utils/error";

  let title = "";
  let synopsis = "";
  let genres = "";
  let tags = "";

  const SYNOPSIS_MIN_LENGTH = 20;

  $: isValidData = title && synopsis.length >= SYNOPSIS_MIN_LENGTH;
  async function createNovel(e: Event) {
    try {
      await $backend.collection("novels").create({
        title,
        synopsis,
        genres,
        tags,
        views: 0,
        author: $profile.id,
      });
      $novelIndex = $novelIndex + 1;
      goto("/write/novel/");
    } catch (error) {
      showErrorMessage({ message: error });
    }
  }
</script>

<svelte:head>
  <title>Create novel</title>
</svelte:head>

<article>
  <div class="top-flex">
    <div class="meta">
      <TextInput labelText="Novel title" bind:value={title} />
      <TextInput labelText="Genre" bind:value={genres} />
      <TextInput labelText="Tags" bind:value={tags} />
    </div>
    <div class="cover">
      <Icon icon={faPlus} size="3em" />
      Novel cover
    </div>
  </div>
  <TextArea
    rows={10}
    bind:value={synopsis}
    placeholder="Write your novel synopsis"
    labelText="Synopsis"
  />
  <ButtonSet class="cta">
    <Button kind="tertiary" icon={Save}>Save draft</Button>
    <!-- <Button>Preview</Button> -->
    <Button on:click={createNovel} icon={SendAltFilled} disabled={!isValidData}>Create novel</Button
    >
  </ButtonSet>
</article>

<style lang="scss">
  article {
    max-width: 65em;
    .top-flex {
      display: flex;
      gap: 2em;
      flex-direction: row;
      width: 100%;
      .meta {
        flex-grow: 1;
      }
      .cover {
        flex-shrink: 0;
        width: 250px;
        height: 250px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff1;
        flex-direction: column;
        gap: 0.4em;
        font-weight: 300;
      }
    }

    :global(.cta) {
      position: relative;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 1em;
      gap: 0.5em;
    }
  }
</style>
