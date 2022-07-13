<script lang="ts">
  import { revShareUsersLite } from "$lib/utils/web-monetization";
  import RevshareAvatar from "./StatsRevshareAvatar.svelte";
</script>

<section>
  {#each $revShareUsersLite as user}
    <!-- {JSON.stringify(user)} -->
    <RevshareAvatar {...user} />
  {/each}
</section>

<style lang="scss">
  section {
    position: relative;
    display: flex;
    gap: 0.6em;
    flex-direction: column;
  }
</style>
