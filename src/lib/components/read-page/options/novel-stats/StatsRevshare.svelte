<script lang="ts">
  import { currentNovel } from "$lib/store/states";
  import { novelTitles } from "$lib/utils/novel-page";
  import { revShareUsersLite } from "$lib/utils/web-monetization";
  import RevshareAvatar from "./StatsRevshareAvatar.svelte";
  import { AlertCircleIcon } from "svelte-feather-icons";
</script>

<section>
  {#each $revShareUsersLite as user}
    <!-- {JSON.stringify(user)} -->
    <RevshareAvatar {...user} />
  {/each}
  <div class="info">
    <AlertCircleIcon size="32" />
    <div>
      Revenue sharing is based how many times a contributors (such as author, editor, proofreader)
      being credited in chapters in {novelTitles[$currentNovel]}. This only applies for splitting
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
  }
</style>
