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
    width: 100%;
    display: grid;
    grid-template-columns: 660px 1fr;
    gap: 16px;

    @include screen("desktop") {
      margin: {
        left: -48px;
        right: -48px;
      }
    }
  }
</style>
