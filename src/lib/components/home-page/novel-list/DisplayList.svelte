<script lang="ts">
  import BookCover from "$lib/components/BookCover.svelte";
  import SkeletonShell from "$lib/components/SkeletonShell.svelte";
  import { liteNovelsStats, novelList, novelTitles } from "$lib/store/novel-page";
  import { novelsData } from "$lib/store/states";
  import { getNovelBookCoverSrc, novelCoverSubtitle, tagColorizer } from "$lib/utils/novel-page";
  import { EyeIcon, ThumbsUpIcon, UsersIcon } from "svelte-feather-icons";

  const list = $novelList?.length ? $novelList : Array(6).fill("");
</script>

<section class="list">
  {#if $novelList?.length}
    {#each list as novelID, listIndex}
      <div class="item" style="--index: {listIndex ? listIndex : listIndex + 1};">
        <a href="/novel/{novelID}" class:disabled={!novelID}>
          <BookCover novel={novelID} width="100%" style="padding-top: 0 !important;" />
          <section class="title">
            <div>
              <div class="subtitle">
                {#each ($novelCoverSubtitle?.[novelID] ?? "").split(" ") as tag, tagIndex}
                  <span style="--delay: {tagIndex}; color:{tagColorizer(tag)};">
                    {tag}
                  </span>
                {/each}
              </div>
              {#if novelID}
                <h3>{$novelTitles[novelID]}</h3>
              {:else}
                <SkeletonShell width="200px" height="24px" />
              {/if}
            </div>
          </section>
          <section class="views">
            <span>
              <EyeIcon size="18" /> views
            </span>
            <strong>{$liteNovelsStats[novelID]?.views ?? "--"}</strong>
          </section>
          <section class="likes">
            <span>
              <ThumbsUpIcon size="18" /> likes
            </span>
            <strong>{$liteNovelsStats[novelID]?.likes ?? "--"}</strong>
          </section>
          <section class="followers">
            <span>
              <UsersIcon size="18" /> followers
            </span>
            <strong>{$liteNovelsStats[novelID]?.followers ?? "--"}</strong>
          </section>
        </a>
      </div>
    {/each}
  {:else}
    <div class="loading">
      {#each Array(4).fill("") as item}
        <SkeletonShell height={84} />
      {/each}
    </div>
  {/if}
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
      --overlay-color: #0006;
      a {
        display: grid;
        grid-template-columns: 64px minmax(0, 4fr) 1fr 1fr 1fr;
        gap: 12px;
        align-items: center;
        padding: 8px;
        text-decoration: none;

        &.disabled {
          pointer-events: none;
        }

        @include screen("mobile") {
          grid-template-columns: 64px minmax(0, 4fr) 1fr 1fr;
        }
      }

      border-radius: 4px;
      background-color: var(--foreground-color);
      transition: all 0.16s ease-in;
      position: relative;
      padding-right: 2em;

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
        --opacity: 0.6;
        width: max-content;
        span {
          $delay-factor: 0.225s;
          transition: all 0.3s calc(var(--delay) * #{$delay-factor}) ease-in;
          opacity: var(--opacity);
        }
        :global(html.light) & {
          --opacity: 0.8;
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
        background: linear-gradient(to top, var(--overlay-color), #0000);
        transition: all 0.3s ease-out;
        z-index: calc(var(--index));
        pointer-events: none;
      }

      :global(html.light) & {
        --overlay-color: #0003;

        h3 {
          color: #000a;
        }
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
            color: var(--primary-color-lighten-2) !important;
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

      .views,
      .likes,
      .followers {
        line-height: 1.2;
        text-align: center;
        align-self: flex-start;

        span {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.725;

          :global(svg) {
            margin-right: 0.4em;
            opacity: 0.6;
          }
        }

        strong {
          display: block;
          font-size: 1.5em;
          line-height: 1.5;
        }
      }
    }

    .loading {
      display: flex;
      flex-direction: column;
      gap: 0.6em;
      opacity: 0.8;
    }
  }
</style>
