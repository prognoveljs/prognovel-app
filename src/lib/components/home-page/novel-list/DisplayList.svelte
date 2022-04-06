<script lang="ts">
  import {
    getNovelBookCoverSrc,
    novelCoverSubtitle,
    novelList,
    novelTitles,
    tagColorizer,
  } from "$lib/utils/novel-page";

  const list = import.meta.env.IS_DEMO ? Array(6).fill("yashura-legacy") : novelList;
</script>

<ol class="list">
  {#each list as novel, listIndex}
    <li style="--index: {listIndex ? listIndex : listIndex + 1};">
      <img src={getNovelBookCoverSrc(novel)} alt={novelTitles[novel]} width="64" height="64" />
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
    </li>
  {/each}
</ol>

<style lang="scss">
  ol {
    $offset: 24px;
    display: flex;
    flex-direction: column;
    padding-top: 24px;

    li {
      display: grid;
      grid-template-columns: 64px 1fr 100px 100px;
      gap: 12px;
      align-items: center;
      padding: 8px;
      border-radius: 4px;
      background-color: var(--foreground-color);
      transition: all 0.16s ease-in;
      position: relative;
      filter: grayscale(50%);
      counter-increment: section;
      z-index: var(--index);
      border: 2px solid var(--primary-color-lighten-2);
      transform-origin: bottom center;

      h3 {
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        font-weight: 700;
        margin: 0;
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
      }

      &:not(:first-child) {
        margin-top: -$offset;
      }

      &:hover {
        filter: grayscale(0);
        transform: scale(1.0125);
        h3 {
          color: var(--primary-color-lighten-2);
        }

        & ~ li {
          transform: translateY($offset);
        }
        & + li {
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
  }
</style>
