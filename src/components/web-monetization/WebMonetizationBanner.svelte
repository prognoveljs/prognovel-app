<script>
  import Illustration from "./WebMonetizationIllustration.svelte";
</script>

<section>
  <Illustration />
  <div style="position: relative; z-index: 2;">
    <h3>Part of Web Monetization API</h3>
    <p>Subscribe once, enjoy VIP experiences across all ProgNovel-based sites.</p>
    <div class="flex">
      <a href="https://coil.com/learn-more" target="_blank" rel="noopener" class="learn-more"
        >What's this?</a
      >
      <a href="https://coil.com" target="_blank" rel="noopener" class="subscribe"
        >Subscribe for $5/month</a
      >
    </div>
  </div>
</section>

<style lang="scss">
  section {
    position: relative;
    overflow: hidden;
    margin-top: 24px;
    width: 100%;
    padding: 24px;
    padding-bottom: 12px;
    // padding-right: 200px;
    background: var(--foreground-color);
    margin-bottom: 3em;
    box-shadow: 0 4px 12px #0002;
    border-radius: 4px;
  }

  @media only screen and (min-width: 964px) {
    section {
      padding-left: 64px;
    }
  }

  h3,
  p {
    position: relative;
    max-width: 400px;
    text-align: left;
    // margin: 0 auto;
    z-index: 1;
  }

  h3 {
    font-weight: 700;
  }

  p {
    margin-top: 12px;
    line-height: 1.35;
    font-weight: 300;

    :global(html.light) & {
      font-weight: 400;
    }
  }

  .flex {
    position: relative;
    z-index: 1;
    margin: 32px 0 12px;
    display: flex;
    justify-content: left;

    a {
      text-decoration: none;
      padding: 4px 16px;
      border-radius: 2px;
      font-weight: 700;
      vertical-align: middle;
      border: 2px solid transparent;

      &:first-child {
        margin-right: 12px;
      }
    }

    .subscribe {
      background-color: hsla(var(--primary-color-h), var(--primary-color-s), 38.25%, 1);
      color: #fffd;

      &:hover {
        background-color: hsla(var(--primary-color-h), var(--primary-color-s), 56%, 1);
        color: #000d;
      }
    }

    $learn-more__transparent: 0.44;
    .learn-more {
      --bg-alpha: #{$learn-more__transparent / 3};
      border-color: hsla(
        var(--primary-color-h),
        var(--primary-color-s),
        56%,
        $learn-more__transparent
      );
      background-color: hsla(var(--primary-color-h), var(--primary-color-s), 56%, var(--bg-alpha));

      :global(html.light) & {
        --bg-alpha: #{$learn-more__transparent / 1.5};
      }

      &:hover {
        background-color: hsla(
          var(--primary-color-h),
          var(--primary-color-s),
          56%,
          $learn-more__transparent
        );
      }
    }
  }
</style>
