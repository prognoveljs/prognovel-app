<script lang="ts">
  import { revShareUsersLite } from "utils/web-monetization";
</script>

{#each $revShareUsersLite as user}
  <section>
    <strong>{user && user.name ? user.name : ""}</strong> |
    <span>
      {user && user.chance ? user.chance : "--"}%
    </span>
  </section>
{/each}

<style lang="scss">
  section {
    span {
      color: green;
    }
  }
</style>
