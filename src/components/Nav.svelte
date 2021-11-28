<script>
  import NavTitles from "components/navigation/NavTitles.svelte";
  import NavHome from "components/navigation/NavHome.svelte";
  import NavSearch from "./navigation/NavSearch.svelte";

  export let page;
  export let segment;
</script>

<header>
  {#if segment === undefined || segment === "announcement" || segment === "updates"}
    <NavHome {segment} />
  {:else}
    <NavTitles {page} />
  {/if}
  <section class="top-right">
    <NavSearch />
  </section>
</header>

<style lang="scss">
  :global(body) {
    padding-top: var(--header-height);

    @include screen("mobile") {
      padding-top: 0;
    }
  }

  header {
    --header-color: var(--foreground-color);
    --header-color-alpha: var(--foreground-color-alpha);
    font-weight: 300;
    height: 1000px;
    position: fixed;
    top: -944px;
    left: 0;
    width: 100%;
    z-index: 999;
    box-shadow: 0 2px 8px #0001;
    background-color: var(--header-color);
    padding-bottom: 1px;
    transition: background-color 0.145s ease-in-out;
    transition-delay: 0.06s;

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
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
