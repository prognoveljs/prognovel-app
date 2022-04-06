<script lang="ts">
  import { getNovelBookCoverSrc, novelList, novelTitles } from "$lib/utils/novel-page";

  // const list = novelList
  const list = Array(6).fill("yashura-legacy");
</script>

<ol class="list">
  {#each list as novel, i}
    <li style="--index: {i ? i : i + 1};">
      <img src={getNovelBookCoverSrc(novel)} alt={novelTitles[novel]} width="64" height="64" />
      <h3>{novelTitles[novel]}</h3>
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
      transition: all 0.25s ease-in-out;
      position: relative;
      filter: grayscale(50%);
      counter-increment: section;
      z-index: var(--index);

      h3 {
        font-weight: 700;
      }

      &:not(:first-child) {
        margin-top: -$offset;

        &::before {
          $height: 32px;
          content: "";
          position: absolute;
          left: 0;
          top: -$height;
          width: 100%;
          height: $height;
          background: linear-gradient(to top, #0006, #0000);
          transition: all 0.3s ease-out;
          z-index: calc(var(--index) -1);
        }
      }

      &:hover {
        filter: grayscale(0);
        h3 {
          color: var(--primary-color-lighten-2);
        }

        & ~ li {
          transform: translateY($offset);
        }
        & + li {
          &::before {
            transform: translateY(24px);
          }
        }
      }
    }
  }
</style>
