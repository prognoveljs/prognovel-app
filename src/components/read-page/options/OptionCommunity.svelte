<script lang="ts">
  import { discordGroupId } from "store/novel-page";
  import SectionHeader from "./body/SectionHeader.svelte";
</script>

<SectionHeader>Community</SectionHeader>
{#if $discordGroupId}
  <iframe
    title="discord group"
    src="https://discord.com/widget?id={$discordGroupId}&theme=dark"
    width="100%"
    height="500"
    allowtransparency="true"
    frameborder="0"
    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
  />
{:else}
  <div class="no-discord">discord group have not been set yet</div>
{/if}

<style lang="scss">
  @import "option-body.scss";

  .no-discord {
    opacity: 0.7;
    font-style: italic;
  }
</style>
