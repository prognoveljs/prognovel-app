<script lang="ts">
  import { showIndex } from "routes/help/_store";

  export let pages = {};
  export let childPages = {};
  //@ts-ignore
  export let store: any = {};
</script>

<article class:show={$showIndex}>
  <a
    href="help"
    class="link-parent"
    class:currentPage={store.path ? store.path.split("help/").filter((s) => !!s).length < 2 : false}
    >What is ProgNovel?</a
  >
  <div class="pages">
    {#each Object.keys(pages) as slug}
      <a
        href={pages[slug].href}
        class:currentPage={store.path.startsWith("/" + pages[slug].href) && store.path
          ? store.path.split("help/").filter((s) => !!s).length >= 2
          : false}
      >
        {pages[slug].title}
      </a>
      {#if childPages[slug]}
        <ul>
          {#each Object.keys(childPages[slug]) as child}
            <li>
              <a
                href={childPages[slug][child].href}
                class="children"
                class:currentPage={store.path.startsWith("/" + childPages[slug][child].href)}
                title={childPages[slug][child].title}>{childPages[slug][child].title}</a
              >
            </li>
          {/each}
        </ul>
      {/if}
    {/each}
  </div>
</article>

<style lang="scss">
  $margin-side: 16px;
  article {
    grid-area: index;
    overflow: hidden;
    top: 0;
    position: sticky;
    min-height: 80vh;
    max-width: 80vw;

    @include screen("mobile") {
      position: fixed;
      top: 0;
      left: 0;
      height: calc(100vh - var(--mobile-menu-height));
      transform: translateX(-100%);
      background-color: var(--foreground-color);
      transition: transform 0.3s ease-in;
      padding-top: 2em;
      padding-bottom: 10em;
      overflow-y: scroll;
      z-index: 4;

      &.show {
        transform: translateX(0);
      }
    }
  }

  .pages {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    a:not(.children) {
      --bg-alpha: 0.1;
      --bg-saturate: var(--primary-color-s);
      --bg-light: var(--primary-color-l);
      margin: 4px $margin-side;
      padding: 8px 16px;
      border-radius: 4px;
      line-height: 1.1;
      text-decoration: none;
      background: hsla(
        var(--primary-color-h),
        var(--bg-saturate),
        var(--bg-light),
        var(--bg-alpha)
      );
      position: relative;
      &.currentPage::after {
        --size: 8px;
        content: "";
        position: absolute;
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        top: calc(50% - var(--size) / 2);
        left: -4px;
        background-color: var(--primary-color);
        border: 2px solid var(--background-color);
      }

      &:hover:not(.currentPage) {
        --bg-alpha: 0.325;
      }
    }

    a.children {
      --margin-left: 32px;
      display: block;
      margin-left: var(--margin-left);
      width: calc(100% - var(--margin-left) - 24px);
      font-size: 0.85em;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      &.currentPage {
        transform: none;
      }
    }

    ul {
      margin-top: 4px;
      margin-bottom: 18px;

      li {
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }

  .pages .currentPage {
    color: var(--primary-color);
    font-weight: 700;
    --bg-alpha: 0.075 !important;
    --bg-saturate: 35% !important;
    --bg-light: 70% !important;
  }

  .link-parent {
    margin: 3em $margin-side 0.75em;
    display: block;

    &.currentPage {
      font-weight: 700;
      color: var(--primary-color);
    }
  }
</style>
