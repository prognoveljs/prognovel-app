<script lang="ts">
  import BookCover from "$lib/components/BookCover.svelte";
  import { showTOC } from "$lib/store/read-page/state";
  import { toc } from "$lib/store/read-page/vars";
  import { currentNovel, path } from "$lib/store/states";
  import { handleBeginReadingButton, novelTitles, ReadNowObject } from "$lib/utils/novel-page";
  import { replacePageTitleBookAndChapter } from "$lib/utils/read-page/history";
  import { windowLock, windowUnlock } from "$lib/utils/window/lock";
  import { formatDistance } from "date-fns";
  import { createEventDispatcher } from "svelte";
  import { onMount } from "svelte";
  import { ArrowRightIcon, CornerUpLeftIcon, ListIcon, XSquareIcon } from "svelte-feather-icons";
  import { cubicIn, cubicOut } from "svelte/easing";
  import { fade, fly } from "svelte/transition";

  const dispatch = createEventDispatcher();

  let readLink: string = "";
  let lastReadAt: DOMHighResTimeStamp;
  $: lastReadAtText = lastReadAt
    ? formatDistance(lastReadAt, new Date(), { addSuffix: true })
    : "--";
  $: [volume, chapter] = (readLink || "")
    .split("/")
    .filter((s) => !!s)
    .slice(-2);
  $: readNowData = (
    $toc?.length ? handleBeginReadingButton($currentNovel) : Promise.resolve("")
  ) as Promise<ReadNowObject>;
  $: readNowData.then((data) => {
    if (typeof data?.link === "string") readLink = data?.link;
    if (data?.lastReadAt) lastReadAt = data?.lastReadAt;
  });

  $: if (!$path.startsWith(`/novel/${$currentNovel}`)) {
    close();
  }

  onMount(() => {
    windowLock();

    return () => {
      windowUnlock();
    };
  });

  function onClick() {}
  function openTableOfContent() {
    $showTOC = true;
  }
  function close() {
    dispatch("close");
  }
</script>

<article
  in:fly={{ duration: 425, x: window.innerWidth, opacity: 1, easing: cubicOut }}
  out:fly={{ duration: 600, x: -window.innerWidth, opacity: 1, easing: cubicIn }}
>
  <BookCover novel={$currentNovel} />
  <p>
    Last time you read {novelTitles[$currentNovel]} is at {replacePageTitleBookAndChapter(
      `${volume}`,
      true,
    )}, Chapter {((chapter || "").split("chapter-")[1] || "").replace("-", ".")} ({lastReadAtText})
  </p>
  <p>How would you like to proceed?</p>
  <div class="cta">
    <a class="continue" href={readLink} on:click={onClick}
      >Open last chapter read
      <ArrowRightIcon size="28" />
    </a>
    <a href="/read/{$currentNovel}/{$toc[0]}" on:click={onClick}
      >Read from first chapter
      <CornerUpLeftIcon size="20" />
    </a>
    <a href="/" on:click|preventDefault={openTableOfContent}
      >Let me choose from table of content
      <ListIcon size="20" />
    </a>
  </div>
  <div on:click={close}>
    <XSquareIcon class="close" size="28" />
  </div>
</article>

<style lang="scss">
  article {
    position: fixed;
    inset: 0;
    padding: 20% 2em;
    background-color: var(--foreground-color);
    z-index: 490;
    isolation: isolate;
    box-shadow: -4px 0 8px 16px #0004;

    a {
      --bg-alpha: 0.6;
      display: block;
      padding: 8px;
      width: 100%;
      border: 2px solid var(--primary-color);
      border-radius: 4px;
      background-color: hsla(#{$hsl}, var(--bg-alpha));
      margin-bottom: 8px;
      max-width: 400px;
      position: relative;

      :global {
        svg {
          position: absolute;
          top: 50%;
          right: 1em;
          transform: translateY(-50%);
        }
      }

      &.continue {
        --bg-alpha: 1;
        text-decoration: none;
        font-weight: 700;
        color: #000a;
        filter: contrast(85%);

        :global(svg) {
          right: 0.7em;
        }
      }
    }

    :global(.close) {
      position: absolute;
      top: 1.5em;
      right: 1.2em;
      color: #fffc;
    }
  }
</style>
