<script lang="ts">
  import Modal from "$lib/components/Modal.svelte";
  import Cover from "$lib/components/BookCover.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import { onMount } from "svelte";
  import { faEye } from "@fortawesome/free-solid-svg-icons";
  import { createEventDispatcher } from "svelte";
  import { getBookmarkLastRead, saveBookmark } from "$lib/utils/bookmark";
  import { novelsData } from "$lib/store/states";
  import { Tag } from "carbon-components-svelte";
  import { capsFirstLetter, parseChapterIndex } from "$lib/utils/string";
  import { toc } from "$lib/store/read-page/vars";
  import type { NovelMetadata } from "$typings";

  const dispatch = createEventDispatcher();

  let saveButton;
  let history;
  $: isHaventReadYet = !history;
  $: isReachLastChapter = history === $toc[$toc.length - 1];

  export let id;
  export let title = "";
  export let showModal;

  $: meta = $novelsData[id] ?? ({} as NovelMetadata);
  $: tags = [meta.demographic, ...(meta.genre ?? [])]
    .filter((tag) => !!tag)
    .map((tag) => capsFirstLetter(tag)) as string[];

  function save() {
    saveBookmark(id);
    dispatch("close");
  }

  onMount(async () => {
    history = await getBookmarkLastRead(id, { allowReturnUndefined: true });
  });
</script>

<Modal borderTop={true} width={350} {showModal} on:close={() => dispatch("close")}>
  <section class="head">
    <Cover novel={id} />
  </section>
  <section class="body">
    <h2>{title}</h2>
    <div class="tags">
      {#each tags as tag, i}
        <Tag type={i ? "warm-gray" : "green"}>{tag}</Tag>
      {/each}
    </div>
    <div class="history" class:isHaventReadYet class:isReachLastChapter>
      <Icon paddingBottom={"3px"} marginRight={"4px"} size={"24px"} icon={faEye} />
      {#if isHaventReadYet}
        <span>Haven't read yet.</span>
      {:else if isReachLastChapter}
        <span>You reached latest chapter.</span>
      {:else}<span>Last read at {parseChapterIndex(history, { useSeparator: true })}.</span>{/if}
    </div>
  </section>
  <section slot="footer">
    <button class="secondary" on:click={() => dispatch("close")}>Cancel</button>
    <button bind:this={saveButton} on:click={save}> Save to Bookmark</button>
  </section>
</Modal>

<style lang="scss">
  .head {
    position: relative;

    &::before {
      content: "";
      background: #0002;
      clip-path: circle();
      width: calc(140% + 48px);
      height: 700px;
      margin-top: -24px;
      margin-left: -24px;
      position: absolute;
      top: -325px;
      left: -20%;
    }
  }

  .body {
    min-height: 85px;

    h2 {
      font-weight: 700;
      color: var(--primary-color-lighten-2);
      text-align: center;
    }
  }

  .tags {
    :global(span:first-child) {
      margin-left: 0 !important;
    }
  }

  .history {
    margin-top: 8px;

    span {
      font-size: 0.9em;
      font-weight: 300;
    }

    :global(path) {
      color: #fffd;
    }
  }

  .isHaventReadYet {
    :global(path) {
      color: #888;
    }
  }

  .isReachLastChapter {
    :global(path) {
      color: var(--primary-color-lighten-1);
    }
  }
</style>
