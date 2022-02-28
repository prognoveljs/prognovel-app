<script lang="ts">
  import HeroSlider from "./slider/HeroSlider.svelte";
</script>

<article>
  <HeroSlider />
  <section class="news"><h2>News</h2></section>
</article>

<style lang="scss">
  article {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 16px;

    @include screen("desktop") {
      margin: {
        left: -48px;
        right: -48px;
      }
    }
  }
</style>
