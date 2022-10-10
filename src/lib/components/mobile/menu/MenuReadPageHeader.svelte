<script lang="ts">
  import { fly } from "svelte/transition";
  import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
  import Icon from "$lib/components/Icon.svelte";
  import { currentNovel, novelsData, path } from "$lib/store/states";
  import { novelCoverPlaceholders } from "$lib/utils/novel-page";
  import { onMount } from "svelte";
  import { waitForNovelCoverLoading } from "$lib/utils/images/novel-cover";

  $: novelTitle = $novelsData?.[$currentNovel]?.title;
  $: backURL = $path.startsWith("/read") ? `/novel/${$currentNovel}` : "/";

  let novelCover = novelCoverPlaceholders[$currentNovel];

  onMount(async () => {
    novelCover = await waitForNovelCoverLoading($currentNovel);
  });
</script>

{#if $currentNovel}
  <article>
    <div in:fly={{ y: -50, duration: 600 }} out:fly={{ y: -50, duration: 300 }} class="overlay" />
    <a
      in:fly={{
        x: -4,
        duration: 300,
      }}
      out:fly={{
        x: -4,
        duration: 140,
      }}
      href={backURL}
      sveltekit:prefetch
      class="back"
    >
      <Icon icon={faChevronLeft} size="2em" />
    </a>
    <div
      in:fly={{
        x: 16,
        duration: 300,
      }}
      out:fly={{
        x: 16,
        duration: 140,
      }}
      class="novel-info"
    >
      <img width="40" height="40" src={novelCover} alt={novelTitle} />
      <strong>{novelTitle || ""}</strong>
    </div>
  </article>
{/if}

<style lang="scss">
  article {
    display: flex;
    align-items: center;
    position: fixed;
    top: 8px;
    left: 0;
    width: 100%;

    a {
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      padding: 8px;
    }

    img {
      border-radius: 4px;
      margin-left: 12px;
    }

    .novel-info {
      display: flex;
      align-items: center;
      gap: 8px;
      user-select: none;

      strong {
        font-size: 1.5em;
      }
    }

    *:not(.overlay) {
      z-index: 2;
    }

    .overlay {
      z-index: 0;
      width: 100%;
      height: 200px;
      position: absolute;
      background: linear-gradient(to bottom, #000a 30%, transparent);
    }
  }
</style>
