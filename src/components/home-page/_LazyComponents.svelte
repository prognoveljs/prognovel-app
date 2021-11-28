<script lang="ts">
  import UpdatesModule from "components/updates-page/UpdatesModule.svelte";
  import WebMonetizationBanner from "components/web-monetization/WebMonetizationBanner.svelte";
  import Warning from "components/home-page/HomeWarning.svelte";
  import ProgNovelPromo from "components/home-page/ProgNovelPromo.svelte";
</script>

<div class="contain">
  <Warning />
  <WebMonetizationBanner />
  <UpdatesModule seeAllLink="updates" />
</div>

<ProgNovelPromo />
