<script>
  import DescriptionInfo from "components/novel-page/DescriptionInfo.svelte";
  import { readPageLink } from "src/store/read-page/read-page-navigation";
  export let novelMetadata;

  let showMore = false;
  $: height = showMore ? "auto" : "270px";
</script>

<article>
  <h1 id="novel-title">{novelMetadata ? novelMetadata.title : "Loading..."}</h1>
  <DescriptionInfo {novelMetadata} />
  <div class="novel-description" style="height: {height};" class:hideMore={!showMore}>
    {@html novelMetadata ? novelMetadata.synopsis : ""}
    {#if !showMore}<span class="show-more" on:click={() => (showMore = true)}>show more</span>{/if}
  </div>
  <div class="flex">
    <a href={$readPageLink}>READ NOW</a>
  </div>
</article>

<style lang="scss">
  article {
    position: relative;
    grid-area: description;
  }

  h1 {
    margin-top: 0;
    font-weight: 700;
    color: #fff;
  }

  .flex {
    text-align: right;
    margin-top: 24px;
    justify-content: end;

    a {
      --bg: hsl(var(--primary-color-h), 80%, 40%);
      cursor: pointer;
      padding: 8px 18px;
      border-radius: 4px;
      color: #fffd;
      background-color: var(--bg);
      border: 1px solid var(--bg);
      text-decoration: none;
      font-weight: 700;
      letter-spacing: 0.075em;
      margin-top: 12px;

      transition: all 0.085s ease-out;

      &:hover {
        background-color: hsl(var(--primary-color-h), 67%, 39%);
        // color: #000e;
      }

      @include screen("mobile") {
        display: none;
      }
    }
  }

  .novel-description {
    overflow-y: hidden;
    position: relative;

    .show-more {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      position: absolute;
      width: 100%;
      height: 48px;
      bottom: 0;
      left: 0;
      color: var(--primary-color);
      text-align: center;
      padding-bottom: 6px;
      z-index: 5;
      cursor: pointer;
      opacity: 0.66;
      text-shadow: 0 0 4px var(--foreground-color);

      &:hover {
        opacity: 1;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .show-more {
      font-size: 16px;
      padding-bottom: 16px;
    }
  }

  .hideMore {
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 160px;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(
        to top,
        var(--background-color),
        var(--background-color-alpha)
      );
      border-bottom: 1.5px solid hsla(var(--primary-color-h), 55%, 44%, 1);
    }
  }
</style>
