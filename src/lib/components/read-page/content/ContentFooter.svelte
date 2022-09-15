<script lang="ts">
  import Navigation from "./ClassicNavigation.svelte";
  import { createEventDispatcher, onMount, tick } from "svelte";
  import { isMobileScreen } from "$lib/utils/mobile";
  import { menuReadPageShow } from "$lib/components/mobile/menu/_store";
  import Comments from "$lib/components/read-page/comments/Comments.svelte";
  import { browser } from "$app/environment";

  // TODO migrate mobile menu to _layout
  const dispatch = createEventDispatcher();

  function hideMobileMenu() {
    if (
      !document.activeElement.classList.contains("adjust-font") ||
      !document.activeElement.parentElement.classList.contains("adjust-font")
    ) {
      $menuReadPageShow = false;

      window.addEventListener("click", showMobileMenu), { once: true };
    }
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
{#if browser}
  <Comments />
{/if}

<style lang="scss">
  @import "../../../../routes/read/vars";

  section {
    padding: 24px calc(#{$padding-base} + #{$padding-ratio});
    padding-right: calc(#{$padding-base} + #{math.div($padding-ratio, 4)});
  }
</style>
