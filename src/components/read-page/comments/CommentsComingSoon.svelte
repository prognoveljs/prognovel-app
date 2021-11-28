<article>
  <div class="illustration">
    <img width="100%" height="auto" src="/img/svg/comments.svg" alt="Custom comment system." />
  </div>
  <section>
    <h2>Comment system is coming soon...</h2>
    <p>
      Web Monetization API will powering Nitro-like premium comment system where users can engage with GIFs
      and emojies.
    </p>
    <p>
      <strong>STAY TUNED!</strong>
    </p>
  </section>
</article>

<style lang="scss">
  $grid: 1fr 50%;
  $grid-tablet: 20% 1fr;
  $margin: 128px;

  article {
    width: 100%;
    max-width: 1200px;
    margin: $margin auto;
    margin-bottom: $margin * 2;
    padding: 24px;
    padding-top: 12px;
    background-color: #0001;
    border-radius: 8px;
    // box-shadow: 0 4px 8px #0001, 0 2px 6px #0002;
    display: grid;
    grid-template-columns: $grid;
  }

  $h2-h: var(--primary-color-h);
  $h2-s: var(--primary-color-s);
  $h2-l: 44%;
  section {
    padding-right: 6%;

    h2 {
      color: hsl($h2-h, $h2-s, $h2-l);
      font-weight: 700;
    }
  }

  .illustration {
    position: relative;

    img {
      transform: rotate(12deg) scale(0.75);
      position: absolute;
      top: -128px;
      left: -24px;
    }
  }
</style>
