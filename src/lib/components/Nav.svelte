<script lang="ts">
  import NavTitles from "$lib/components/navigation/NavTitles.svelte";
  import NavHome from "$lib/components/navigation/NavHome.svelte";
  import NavSearch from "./navigation/NavSearch.svelte";
  import { path } from "$lib/store/states";
  import UserNavButton from "./user/UserNavButton.svelte";
</script>

<header>
  <div class="pwa-wrapper">
    {#if $path === "/"}
      <NavHome />
    {:else}
      <NavTitles />
    {/if}
    <section class="top-right">
      <NavSearch />
      <UserNavButton />
    </section>
  </div>
</header>

<style lang="scss">
  :global(html) {
    --header-color: var(--foreground-color);
    --header-color-alpha: var(--foreground-color-alpha);

    @media all and (display-mode: window-controls-overlay) {
      --header-color: #333;
      --header-color-alpha: #3330;
    }
  }

  :global(body) {
    padding-top: var(--header-height);

    @include screen("mobile") {
      padding-top: 0;
    }
  }

  header {
    font-weight: 300;
    height: var(--header-height);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
    box-shadow: 0 2px 8px #0001;
    background-color: var(--header-color);
    padding-bottom: 1px;
    transition: background-color 0.145s ease-in-out;
    transition-delay: 0.06s;
    -webkit-app-region: drag;
    app-region: drag;
    isolation: isolate;

    .pwa-wrapper {
      position: absolute;
      width: env(titlebar-area-width, 100%);
      left: env(titlebar-area-x, 0);
      bottom: 0;
      display: flex;
      justify-content: space-between;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: var(--primary-color);
      opacity: 0.2;
    }
  }

  @include screen("mobile") {
    header {
      // left: 0;
      // width: 100%;
      display: none;
    }

    // :global(:root) {
    //   --header-height: 0;
    // }
  }

  .top-right {
    // position: absolute;
    // bottom: 0;
    // right: 1em;
    // z-index: 1000;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
    background: var(--header-color);
    z-index: 1;
    margin-right: 1em;
  }
</style>
