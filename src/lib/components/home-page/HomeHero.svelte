<script lang="ts">
  import HeroNews from "./news/HeroNews.svelte";
  import HeroSlider from "./slider/HeroSlider.svelte";
</script>

<article>
  <HeroSlider />
  <HeroNews />
</article>

<style lang="scss">
  article {
    $bleed: 48px;
    display: grid;
    grid-template-columns: minmax(560px, 650px) 1fr;
    gap: 16px;
    width: 100%;

    @include screen("desktop") {
      width: calc(100% + #{$bleed * 2});
      margin: {
        left: $bleed * -1;
        right: $bleed * -1;
      }
    }

    @include screen("tablet") {
      grid-template-columns: 100%;
      grid-template-rows: repeat(2, auto);
      padding: 18px;
    }
    @include screen("mobile") {
      padding: 12px;
    }
  }
</style>
