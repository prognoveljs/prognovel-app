<script lang="ts">
  import UpdatesModule from "$lib/components/updates-page/UpdatesModule.svelte";
  import WebMonetizationBanner from "$lib/components/web-monetization/WebMonetizationBanner.svelte";
  import ProgNovelPromo from "$lib/components/home-page/ProgNovelPromo.svelte";
  import HomeNovels from "./HomeNovels.svelte";
  import ShowcaseContainer from "./novel-showcase/ShowcaseContainer.svelte";
</script>

<section class="contain">
  <ShowcaseContainer />
  <WebMonetizationBanner />
  <HomeNovels grid={"novels"} />
  <UpdatesModule seeAllLink="updates" />
</section>

<ProgNovelPromo />
