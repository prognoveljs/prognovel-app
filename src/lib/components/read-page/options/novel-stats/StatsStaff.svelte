<script lang="ts">
  import { currentContent } from "$lib/store/read-page";
  import { parseContributorsNames } from "$lib/utils/string";
  import { enhanceRoleWithEmoji } from "$lib/utils/users/roles";
  import StatsAvatar from "./StatsAvatar.svelte";

  $: roles = Object.keys($currentContent?.contributors ?? {});
  $: contributors = $currentContent.contributors;

  const getBackgroundColor = (role: string, alpha: boolean = false) => {
    switch (role) {
      case "author":
        return "#e67e22" + (alpha ? "55" : "");
      case "editor":
        return "#e74c3c" + (alpha ? "55" : "");
      case "proofreader":
        return "#2ecc71" + (alpha ? "55" : "");
      default:
        return "#bdc3c7" + (alpha ? "55" : "");
    }
  };
</script>

<section>
  {#each roles as role}
    <span style="background-color:{getBackgroundColor(role, true)};">
      {#each contributors[role] as data}
        <StatsAvatar {...data} {role} />
      {/each}
      <div class="badge" style="background-color: {getBackgroundColor(role)};">
        {role}
      </div>
    </span>
  {/each}
</section>

<style lang="scss">
  $outline-size: 2px;
  section {
    // position: relative;
    display: flex;
    // gap: 1em;
    width: max-content;
    margin-left: $outline-size;
    // overflow: auto;
    // overflow: scroll;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */

    &::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
      width: 0;
      height: 0;
    }

    span {
      display: flex;
      gap: 1em;
      padding: 1em;
      position: relative;

      .badge {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0.4em;
        padding: 0.1em 1em;
        border-radius: 1.2em;
        transition: all 0.13s ease-in;
        box-shadow: 0 2px 8px #0002, 0 4px 16px #0001;
      }

      &:hover {
        outline: $outline-size solid #fffa;
        .badge {
          opacity: 1;
          transform: translateY(-1em);
        }
      }
    }
  }
</style>
