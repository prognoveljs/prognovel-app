<script lang="ts">
  import Navigation from "./_Navigation.svelte";
  import { createEventDispatcher, onMount, tick } from "svelte";
  import { isMobileScreen } from "utils/mobile";
  import { menuReadPageShow } from "components/mobile/menu/_store";
  import Comments from "components/read-page/comments/Comments.svelte";
  // TODO migrate mobile menu to _layout
  const dispatch = createEventDispatcher();

  function hideMobileMenu() {
    $menuReadPageShow = false;

    window.addEventListener("click", showMobileMenu), { once: true };
  }
  function showMobileMenu() {
    $menuReadPageShow = true;

    window.addEventListener("scroll", hideMobileMenu, { once: true });
  }

  onMount(async () => {
    $menuReadPageShow = true;
    await tick();
    await tick();
    window.addEventListener("scroll", hideMobileMenu, { once: true });
  });
</script>

{#if !isMobileScreen()}
  <section>
    <Navigation on:toc={() => dispatch("toc")} isFooter={true} />
  </section>
{/if}
<Comments />

<style lang="scss">
  @import "_vars.scss";
  section {
    padding: 24px calc(#{$padding-base} + #{$padding-ratio});
    padding-right: calc(#{$padding-base} + #{$padding-ratio / 4});
  }
</style>
