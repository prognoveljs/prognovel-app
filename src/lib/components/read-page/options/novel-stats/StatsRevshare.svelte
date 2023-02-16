<script lang="ts">
  import { currentNovel, novelsData } from "$lib/store/states";
  import { novelTitles } from "$lib/store/novel-page";
  import { revShareUsersLite } from "$lib/utils/web-monetization";
  import RevshareAvatar from "./StatsRevshareAvatar.svelte";
  import { AlertCircleIcon } from "svelte-feather-icons";
  import SkeletonShell from "$lib/components/SkeletonShell.svelte";

  $: novelData = $novelsData?.[$currentNovel];
</script>

<section>
  {#if $revShareUsersLite?.length}
    {#each $revShareUsersLite as user}
      <RevshareAvatar {...user} />
    {/each}
  {:else}
    <div class="no-data-wrapper">
      {#if !$revShareUsersLite?.length || novelData?.rev_share?.length}
        {#each Array(9).fill("") as item, i}
          <SkeletonShell
            width="100%"
            height="36"
            primaryColor="#EBECEF55"
            secondaryColor="#F5F5F799"
          >
            <rect width="100%" height="32" x="0" y="0" rx="2" ry="2" />
          </SkeletonShell>
        {/each}
      {:else}
        <!-- TODO: create UI for no rev share available -->
        <!-- no contributors found -->
      {/if}
    </div>
  {/if}
  <div class="info">
    <AlertCircleIcon size="32" />
    <div>
      Revenue sharing is based how many times a contributors (such as author, editor, proofreader)
      being credited in chapters in {$novelTitles[$currentNovel]}. This only applies for splitting
      revenue from <a href="https://webmonetization.org/">Web Monetization</a> streams in real-time.
    </div>
  </div>
</section>

<style lang="scss">
  section {
    position: relative;
    display: flex;
    gap: 0.6em;
    flex-direction: column;
    width: 92%;

    .info {
      margin-top: 1em;
      display: flex;
      justify-content: baseline;
      gap: 0.7em;
      padding: 0.7em;
      padding-right: 2em;
      border-radius: 4px;
      background-color: #0003;
      line-height: 1.25;
      opacity: 0.825;

      a {
        color: var(--primary-color);
        font-weight: 700;
        filter: grayscale(20%);

        &:hover {
          filter: grayscale(0%);
        }
      }

      :global(svg) {
        flex-shrink: 0;
        opacity: 0.6;
      }
    }

    .no-data-wrapper {
      min-height: 300px;
    }
  }
</style>
