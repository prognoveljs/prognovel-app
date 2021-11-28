<script lang="ts">
  import { currentContent } from "store/read-page";
  import { parseContributorsNames } from "utils/string";
  import { enhanceRoleWithEmoji } from "utils/users/roles";

  $: roles = Object.keys($currentContent?.contributors ?? {});
</script>

{#each roles as role}
  <section>
    <h4 class:emoji={Boolean(enhanceRoleWithEmoji(role))}>
      {enhanceRoleWithEmoji(role) || role}
    </h4>
    {parseContributorsNames(
      $currentContent.contributors[role].map((contributorData) => contributorData.name),
    )}
  </section>
{/each}

<style lang="scss">
  section {
    margin-bottom: 1em;
    h4 {
      font-weight: 700;
      margin: 0;

      &.emoji {
        &::first-letter {
          margin-right: 0.5em;
        }
      }
    }
  }
</style>
