<script lang="ts">
  import UpdatesModule from "$lib/components/updates-page/UpdatesModule.svelte";
  import WebMonetizationBanner from "$lib/components/web-monetization/WebMonetizationBanner.svelte";
  import Warning from "$lib/components/home-page/HomeWarning.svelte";
  import ProgNovelPromo from "$lib/components/home-page/ProgNovelPromo.svelte";
</script>

<div class="contain">
  <Warning />
  <WebMonetizationBanner />
  <UpdatesModule seeAllLink="updates" />
</div>

<ProgNovelPromo />
