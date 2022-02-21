<script lang="ts">
  import UpdatesModule from "$lib/components/updates-page/UpdatesModule.svelte";
  import WebMonetizationBanner from "$lib/components/web-monetization/WebMonetizationBanner.svelte";
  import ProgNovelPromo from "$lib/components/home-page/ProgNovelPromo.svelte";
</script>

<section class="contain">
  <WebMonetizationBanner />
  <UpdatesModule seeAllLink="updates" />
</section>

<ProgNovelPromo />
