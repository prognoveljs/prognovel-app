<script lang="ts">
  export let grid;
</script>

<a href="https://community.webmonetization.org/prognovel" aria-label="GftW">
  <div class="body" style="grid-area:{grid};">
    <h3>ProgNovel is <span>Grant for the Web</span> Spark Grantee</h3>
    <section>
      <img
        class="logo"
        width="100%"
        height="auto"
        src="/img/third-party-logos/gftw.jpg"
        alt="Grant for the Web"
      />
    </section>
    <img class="doodles" width="100%" height="auto" src="/img/svg/doodles.svg" alt="Doodles" />
  </div>
</a>

<style lang="scss">
  $maxWidth: 800px;

  .body {
    padding: 4px 12px;
    border-radius: 8px;
    background-color: #0002;
    position: relative;
    overflow: hidden;

    :global(html.light) & {
      background-color: hsl(var(--primary-color-h), 100%, 96%);
      border: 2px solid var(--primary-color-lighten-3);
    }
  }

  h3 {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 700;
    color: hsl(var(--primary-color-h), 72%, 55%);

    span {
      text-decoration: underline;
      text-underline-offset: -0.33em;
      text-decoration-skip-ink: none;
      text-decoration-thickness: 0.3em;
      text-decoration-color: hsla(var(--primary-color-h), 55%, 33%, 0.9);
    }
  }

  section {
    display: flex;
    /* grid-template-columns: 150px 150px 150px 150px;
    grid-gap: 40px; */
    flex-wrap: wrap;
    padding: 12px 24px;
    justify-content: center;
    padding-bottom: 6px;
  }

  a {
    text-align: center;
    border-radius: 4px;
    font-size: 18px;
    text-decoration: none;
    border: 1.5px solid transparent;
    line-height: 1.2;
    width: 100%;

    img.logo {
      border-radius: 50%;
      filter: contrast(0.8) grayscale(0.3);
      padding: 4px 10px;
    }

    .doodles {
      position: absolute;
      bottom: -30%;
      left: -20%;
      width: 130%;
      z-index: -1;
      transition: all 0.225s ease-in-out;
    }

    &:hover {
      background-color: #fff1;
      box-shadow: 0 6px 18px #0001, 0 4px 8px #0002;
      border-color: hsla(
        var(--primary-color-h),
        var(--primary-color-s),
        var(--primary-color-l),
        0.4
      );

      h3 {
        color: hsl(var(--primary-color-h), 76%, 61%);
      }

      img.logo {
        filter: contrast(1) grayscale(0) !important;
      }

      .doodles {
        transform: scale(1.1);
      }
    }

    :global(html.light) & {
      img.logo {
        filter: contrast(0.85) grayscale(0) !important;
      }

      &:hover {
        background-color: #fff;
        img.logo {
          filter: contrast(1) grayscale(0) !important;
        }
      }
    }
  }
</style>
