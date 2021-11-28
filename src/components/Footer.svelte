<script>
  import Donation from "components/footer/FooterDonation.svelte";
  import Stacks from "components/footer/FooterStacks";

  const COPYRIGHT_YEAR = new Date().getFullYear();

  // const testUrl =
  //   "https://forum.prognovel.com/d/4-interested-in-hosting-a-platform-with-prognovel-read-this-first";
  const testUrl = "help";
</script>

<footer>
  <div class="grid">
    <Donation grid={"donation"} />
    <div style="grid-area: desc">
      This website is powered by
      <strong style="color: hsl(var(--primary-color-h), var(--primary-color-s), 60%);">
        ProgNovel
      </strong>
      <hr />
      <p>
        ProgNovel an independent webnovel platform developer. This website is currently in alpha
        phase, and should only treated as a demo. To make webnovel community move forward, we will
        provide the final product free for indie creators, complete with free hosting. We don't have
        any company backing and telling us how the direction of ProgNovel should go, so we'd have to
        rely on community support to make this project success. We have
        <strong style="color: lime">$1,000</strong>
        for our first goal, consider to donate or buy ProgNovel's merchandises to help us realising better
        webnovels for the community.
      </p>
      <p>
        Having a webnovel site? Consider becoming alpha/early tester,
        <a href={testUrl}>details can be found here.</a>
      </p>
    </div>
  </div>
  <Stacks />
  <div class="misc">
    <a rel="prefetch" href="privacy">privacy policy</a>
    <a rel="prefetch" href="dmca">DMCA</a>
    <a rel="prefetch" href="help">user help</a>
    <strong style="display: block;">
      <small>&copy; Copyright {COPYRIGHT_YEAR}, ProgNovel</small>
    </strong>
  </div>
</footer>

<style lang="scss">
  footer {
    padding: 2em 10%;
    padding-bottom: 1em;
    box-sizing: border-box;
    background-color: var(--foreground-color);
    position: relative;
    font-size: 24px;
    box-shadow: 0 -4px 12px #0001;
    z-index: 15;
    // content-visibility: auto;
    // contain-intrinsic-size: 923px;
  }
  .grid {
    display: grid;
    grid-template-columns: 260px 1fr;
    grid-template-areas: "donation desc";
    grid-gap: 48px;
  }

  @media only screen and (max-width: 800px) {
    footer {
      width: 100%;
      max-width: 100vw;
      left: 0;
      padding: 12px;
    }
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto;
      grid-template-areas: "donation" "desc";
      grid-gap: 12px;
    }
  }

  hr {
    border: none;
    height: 2px;
    width: 80%;
    margin: 24px;
    margin-top: 36px;
    background-color: var(--text-body-color);
    opacity: 0.2;
  }

  p {
    opacity: 0.85;
    font-size: 18px;
    margin-left: 24px;
  }

  a {
    color: hsl(var(--primary-color-h), 100%, 75%);
    font-weight: 700;

    &:hover {
      color: hsl(var(--primary-color-h), 72%, 46%);
    }
  }

  .misc {
    margin-top: 48px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;

    a {
      padding: 4px 8px;

      &:not(:first-of-type) {
        border-left: 1px solid #8883;
      }
    }

    strong {
      margin-top: 12px;
    }
  }
</style>
