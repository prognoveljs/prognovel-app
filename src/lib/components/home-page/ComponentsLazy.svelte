<script lang="ts">
  import UpdatesModule from "$lib/components/updates-page/UpdatesModule.svelte";
  import WebMonetizationBanner from "$lib/components/web-monetization/WebMonetizationBanner.svelte";
  import ProgNovelPromo from "$lib/components/home-page/ProgNovelPromo.svelte";
  import Updates from "./HomeUpdates.svelte";
  import ShowcaseContainer from "./novel-showcase/ShowcaseContainer.svelte";
  import HomeTrending from "./HomeTrending.svelte";
  import HomeExploreByGenre from "./HomeExploreByGenre.svelte";
</script>

<section class="contain">
  <HomeTrending />
  <WebMonetizationBanner />
  <Updates grid={"novels"} />
  <HomeExploreByGenre />
</section>

<!-- <ProgNovelPromo /> -->

<div class="bottom" />

<style lang="scss">
  .bottom {
    padding-bottom: 7em;
  }
</style>
