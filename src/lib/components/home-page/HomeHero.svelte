<script lang="ts">
  import HeroNews from "./news/HeroNews.svelte";
  import HeroSlider from "./slider/HeroSlider.svelte";
</script>

<article>
  <section>
    <h2>👌 <span> Handpicked novels </span></h2>
    <HeroSlider />
  </section>
  <section>
    <h2>📰 <span>News</span></h2>
    <HeroNews />
  </section>
</article>

<style lang="scss">
  article {
    $bleed: 48px;
    display: grid;
    grid-template-columns: minmax(560px, 650px) 1fr;
    gap: 16px;
    width: 100%;
    margin-top: 3.5em;

    section {
      h2 {
        position: relative;
        // margin: 0;
        font-weight: 700;
        color: var(--primary-color-lighten-4);
        span {
          text-decoration: underline;
          text-underline-offset: -8px;
          text-decoration-skip-ink: none;
          text-decoration-thickness: 8px;
          text-decoration-color: var(--primary-color);
        }

        :global {
          html.light & {
            color: #fffd;
          }
        }
      }
    }

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
