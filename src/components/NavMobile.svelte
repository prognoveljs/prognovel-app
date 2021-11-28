<script>
  import NavHome from "components/navigation/NavHome.svelte";
  import NavSearch from "./navigation/NavSearch.svelte";
</script>

<header>
  <NavHome nolabel />
  <section class="top-right">
    <NavSearch isMobile={true} />
  </section>
</header>

<style lang="scss">
  header {
    display: none;
    --header-color: hsla(var(--primary-color-h), 98%, 28%, 1);
    --header-color-alpha: hsla(var(--primary-color-h), 98%, 28%, 0);
    font-weight: 300;
    height: var(--header-height);
    position: fixed;
    top: 0;
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
      display: block;
    }
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
