<script lang="ts">
  import {
    getNovelBookCoverSrc,
    novelCoverSubtitle,
    novelList,
    novelTitles,
    tagColorizer,
  } from "$lib/utils/novel-page";
  import thumbsUpIcon from "$lib/assets/feather-icons/thumbs-up.svg?raw";
  import listIcon from "$lib/assets/feather-icons/list.svg?raw";
  import IconSvg from "$lib/components/IconSVG.svelte";

  const list = import.meta.env.IS_DEMO ? Array(6).fill("yashura-legacy") : novelList;
</script>

<section class="list">
  {#each list as novel, listIndex}
    <div class="item" style="--index: {listIndex ? listIndex : listIndex + 1};">
      <a href="/novel/{novel}">
        <img src={getNovelBookCoverSrc(novel)} alt={novelTitles[novel]} width="64" height="64" />
        <div class="title">
          <div>
            <div class="subtitle">
              {#each $novelCoverSubtitle[novel].split(" ") as tag, tagIndex}
                <span style="--delay: {tagIndex}; color:{tagColorizer(tag)};">
                  {tag}
                </span>
              {/each}
            </div>
            <h3>{novelTitles[novel]}</h3>
          </div>
        </div>
      </a>
    </div>
  {/each}
</section>

<style lang="scss">
  .list {
    $offset: 16px;
    display: flex;
    flex-direction: column;

    @include screen("small-desktop") {
      padding-top: 24px;
    }

    .item {
      a {
        display: grid;
        grid-template-columns: 64px minmax(0, 4fr) 1fr 1fr;
        gap: 12px;
        align-items: center;
        padding: 8px;
        text-decoration: none;

        @include screen("mobile") {
          grid-template-columns: 64px minmax(0, 4fr) 1fr 1fr;
        }
      }
      border-radius: 4px;
      background-color: var(--foreground-color);
      transition: all 0.16s ease-in;
      position: relative;

      counter-increment: section;
      z-index: var(--index);
      border: 2px solid var(--primary-color-lighten-2);
      transform-origin: bottom center;

      // .number {
      //   display: flex;
      //   align-items: center;
      //   font-size: 1.4em;
      //   font-weight: 300;
      //   line-height: 1;
      //   gap: 8px;

      //   * {
      //     display: flex;
      //     align-items: center;
      //   }
      // }

      h3 {
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        font-weight: 700;
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        max-width: 100%;

        @include screen("mobile") {
          font-size: 1.5em;
        }
      }

      .subtitle {
        width: max-content;
        span {
          $delay-factor: 0.225s;
          transition: all 0.3s calc(var(--delay) * #{$delay-factor}) ease-in;
          opacity: 0.6;
        }
      }

      &::after {
        $height: 48px;
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: $height;
        background: linear-gradient(to top, #0006, #0000);
        transition: all 0.3s ease-out;
        z-index: calc(var(--index));
        pointer-events: none;
      }

      @include screen("small-desktop") {
        filter: grayscale(50%);
        &:not(:first-child) {
          margin-top: -$offset;
        }

        &:hover {
          filter: grayscale(0);
          transform: scale(1.0125);
          h3 {
            color: var(--primary-color-lighten-2);
          }

          & ~ .item {
            transform: translateY($offset);
          }

          &::after {
            // transform: translateY(24px);
            opacity: 0.2;
          }

          .subtitle {
            span {
              opacity: 1;
            }
          }
        }
      }

      @include screen("tablet") {
        margin-bottom: 12px;
        border: 2px solid var(--primary-color-lighten-3);
      }
    }
  }
</style>
