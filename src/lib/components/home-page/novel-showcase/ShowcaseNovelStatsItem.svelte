<script lang="ts">
  import SkeletonShell from "$lib/components/SkeletonShell.svelte";
  import { numberFormatter } from "$lib/utils/string";
  import { SvelteComponentTyped } from "svelte";
  import { EyeIcon, ThumbsUpIcon, UsersIcon } from "svelte-feather-icons";

  export let type: "views" | "likes" | "followers";
  export let value: number = undefined;

  type Icon = typeof EyeIcon | typeof ThumbsUpIcon | typeof UsersIcon;

  $: icon = (): Icon => {
    switch (type) {
      case "views":
        return EyeIcon;
      case "likes":
        return ThumbsUpIcon;
      case "followers":
        return UsersIcon;
      default:
        return ThumbsUpIcon;
    }
  };

  const ICON_SIZE = "15";
</script>

<div class="inline-flex" style="grid-area:{type}">
  <div class="icon">
    <svelte:component this={icon()} size={ICON_SIZE} />
  </div>
  {#if value !== undefined}
    <span class="number">{numberFormatter(value)}</span>
  {:else}
    <div class="loading">
      <SkeletonShell height="12" width="36" primaryColor="#666a" secondaryColor="#999a" />
    </div>
  {/if}
  <slot><!-- optional fallback --></slot>
</div>

<style lang="scss">
  .inline-flex {
    display: inline-flex;
    align-items: flex-start;

    gap: 0.3em;
    // margin-right: 0.5em;
    font-size: 90%;
    flex-wrap: nowrap;

    .icon {
      flex-shrink: 0;
    }

    .loading {
      transform: translateY(2px);
    }
  }
</style>
