<script>
  import Stacks from "components/footer/FooterStacks";
  import { path } from "src/store/states";

  const COPYRIGHT_YEAR = new Date().getFullYear();
</script>

{#if $path === "/"}
  <footer>
    <div class="grid">
      <div class="desc" style="grid-area: desc">
        This website is powered by
        <strong style="color: var(--primary-color-lighten-2);"> ProgNovel </strong>
        <hr />
        <p>
          ProgNovel is currently under development and not ready to be published. If you're
          interested in becoming beta tester, shoot us an email at
          <strong class="email-address">prognovel@gmail.com</strong>
        </p>
        <div>
          &#x1F5A5; <a href="https://community.webmonetization.org/prognovel">Dev Logs</a>
        </div>
        <div>&#x1F6A9; <a href="roadmap" sapper:prefetch>Roadmaps</a></div>
      </div>
      <Stacks grid={"stack"} />
    </div>
    <div class="misc">
      <a rel="prefetch" href="privacy">privacy policy</a>
      <a rel="prefetch" href="dmca">DMCA</a>
      <a rel="prefetch" href="help">user help</a>
      <strong style="display: block;">
        <small>&copy; Copyright {COPYRIGHT_YEAR}, ProgNovel</small>
      </strong>
    </div>
  </footer>
{/if}

<style lang="scss">
  footer {
    padding: 24px;
    box-sizing: border-box;
    background-color: var(--foreground-color);
    position: relative;
    font-size: 24px;
    box-shadow: 0 -4px 12px #0001;
    z-index: 15;
    // content-visibility: auto;
    // contain-intrinsic-size: 923px;

    @include screen("mobile") {
      padding: 12px var(--mobile-body-side-margin);
      padding-bottom: calc(12px + var(--mobile-menu-height));
      width: 100%;
      max-width: 100vw;
      left: 0;

      .grid {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        grid-template-areas: "desc" "stack";
        grid-gap: 12px;
      }

      .desc {
        padding-top: 18px;
        max-width: 100vw;
      }

      hr {
        margin-top: 12px;
      }
    }
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr minmax(300px, 25%);
    grid-template-rows: 1fr;
    grid-template-areas: "desc stack";
    grid-gap: 12px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .desc {
    max-width: 600px;
    position: relative;

    div {
      position: relative;

      a {
        position: absolute;
        bottom: 2px;
        left: 32px;
      }
      a:first-of-type {
        margin-top: 12px;
      }
    }
  }

  hr {
    border: none;
    height: 2px;
    width: 80%;
    margin-top: 36px;
    background-color: var(--text-body-color);
    opacity: 0.2;
  }

  p {
    opacity: 0.85;
    font-size: 18px;
  }

  a {
    color: hsl(var(--primary-color-h), 100%, 75%);
    font-weight: 700;

    &:hover {
      color: hsl(var(--primary-color-h), 72%, 46%);
    }
  }

  .email-address {
    color: hsl(calc(var(--primary-color-h) + 17), var(--primary-color-s), 71%);
    // text-decoration: underline;
    // text-decoration-line: line-through;
    // text-decoration-skip-ink: unset;
    // text-decoration-thickness: 6px;
    // text-underline-offset: 2px;
    // text-decoration-color: hsla(calc(var(--primary-color-h) + 2), var(--primary-color-s), 46%, 36%);
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
