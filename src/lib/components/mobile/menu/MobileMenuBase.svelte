<script lang="ts">
  import {
    showAdjustFont,
    showComments,
    showStatsAndOptions,
    showTOC,
  } from "$lib/store/read-page/state";
  import { fly } from "svelte/transition";
  import { menuVariance, menuState, MenuState, MenuVariance } from "./_store";
  import ReadPageNav from "./MenuReadPageNavigation.svelte";
  import ReadPageHeader from "./MenuReadPageHeader.svelte";
  import Icon from "$lib/components/Icon.svelte";
  import {
    faBookmark,
    faChevronRight,
    faCog,
    faCogs,
    faComment,
    faFileDownload,
    faFont,
    faGlobe,
    faHome,
    faListAlt,
    faQuestionCircle,
  } from "@fortawesome/free-solid-svg-icons";
  import { showDownload } from "$lib/store/novel-page";
  import { path, showReadPageWindow, showSettings } from "$lib/store/states";
  import { showNovelPageWindow } from "$lib/store/novel-page";
  import { readNowObjectData } from "$lib/store/read-page/navigation";
  import ContinueReadPreventDialogue from "$lib/components/novel-page/menu/ContinueReadPreventDialogue.svelte";
  $: readPageActive = $showAdjustFont || $showStatsAndOptions || $showTOC || $showComments;
  $: buttonsLength = function () {
    switch ($menuVariance) {
      case MenuVariance.NovelPage:
        return 5;
      case MenuVariance.General:
        return 5;
      default:
        return 5;
    }
  };

  let readButton: HTMLAnchorElement;
  let showContinueReadDialog: boolean = false;
  function continueReadingClick(e: MouseEvent) {
    if (readButton.textContent.includes("Continue")) {
      showContinueReadDialog = true;
      e.preventDefault();
    }
  }
</script>

{#if $menuState === MenuState.Shown || readPageActive}
  <article
    style="--buttons-length: {buttonsLength()};"
    in:fly={{ y: 30, duration: 300 }}
    out:fly={{ y: 30, duration: 300 }}
  >
    {#if $menuVariance === MenuVariance.General}
      <a class:active={!$showSettings && $path === "/"} href="/"
        ><Icon icon={faHome} /><small>Home</small>
      </a>
      <a class:active={!$showSettings && $path.startsWith("/bookmark")} href="/bookmark"
        ><Icon icon={faBookmark} /><small>Bookmark</small>
      </a>
      <a class:active={!$showSettings && $path.startsWith("/discussions/")} href="/discussions/all"
        ><Icon icon={faGlobe} /><small>Community</small>
      </a>
      <a class:active={!$showSettings && $path.startsWith("/help")} href="/help">
        <Icon icon={faQuestionCircle} />
        <small>Help</small>
      </a>
      <button class:active={$showSettings} on:click={() => showNovelPageWindow(showSettings)}
        ><Icon icon={faCog} /><small>Settings</small>
      </button>
    {/if}
    {#if $menuVariance === MenuVariance.NovelPage}
      <a class:active={!$showSettings && $path === "/"} href="/"
        ><Icon icon={faHome} /><small>Home</small>
      </a>
      <button class:active={$showTOC} on:click={() => showNovelPageWindow(showTOC)}
        ><Icon icon={faListAlt} /> <small>Ch. List</small>
      </button>
      <button class:active={$showDownload} on:click={() => showNovelPageWindow(showDownload)}
        ><Icon icon={faFileDownload} /> <small>Offline</small>
      </button>
      <button class:active={$showSettings} on:click={() => showNovelPageWindow(showSettings)}
        ><Icon icon={faCog} /><small>Settings</small>
      </button>
      {#await $readNowObjectData}
        <a href={"/"} class:active={false} class="right-cta" disabled>
          <Icon icon={faChevronRight} /><small>Begin reading</small>
        </a>
      {:then data}
        <a
          bind:this={readButton}
          href={data?.link || "/"}
          class:active={false}
          on:click={continueReadingClick}
          class="right-cta"
        >
          <Icon icon={faChevronRight} /><small
            >{data?.lastReadAt ? "Continue" : "Begin reading"}</small
          >
        </a>
      {/await}
    {/if}
    {#if $menuVariance === MenuVariance.ReadPage}
      <a class:active={!$showSettings && $path === "/"} href="/"
        ><Icon icon={faHome} /><small>Home</small>
      </a>
      <button class:active={$showTOC} on:click={() => showReadPageWindow(showTOC)}
        ><Icon icon={faListAlt} /> <small>Ch. List</small>
      </button>
      <button class:active={$showComments} on:click={() => showReadPageWindow(showComments)}
        ><Icon icon={faComment} /><small>Comments</small>
      </button>
      <button class:active={$showAdjustFont} on:click={() => showReadPageWindow(showAdjustFont)}
        ><Icon icon={faFont} /> <small>Adjust Font</small>
      </button>
      <button
        class:active={$showStatsAndOptions}
        on:click={() => showReadPageWindow(showStatsAndOptions)}
        ><Icon icon={faCogs} /><small>Options</small>
      </button>
    {/if}
  </article>
  <div class="float">
    {#if $menuVariance === MenuVariance.ReadPage}
      <ReadPageNav />
    {/if}
    {#if $menuVariance === MenuVariance.ReadPage || $menuVariance === MenuVariance.NovelPage}
      <ReadPageHeader />
    {/if}
  </div>
  <div class="backdrop" />
{:else if $menuState === MenuState.Loading}
  <article>...</article>
{/if}

{#if showContinueReadDialog}
  <ContinueReadPreventDialogue on:close={() => (showContinueReadDialog = false)} />
{/if}

<style lang="scss">
  @import "style";
</style>
