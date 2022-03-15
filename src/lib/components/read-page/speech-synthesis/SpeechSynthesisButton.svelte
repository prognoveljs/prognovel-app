<script lang="ts">
  import Icon from "$lib/components/Icon.svelte";

  export let icon;
</script>

<div tabindex="0" class="btn btn-focusable" on:click>
  <Icon paddingBottom="3px" {icon} />
  <slot />
</div>

<style lang="scss">
  .btn {
    padding: 4px 8px;
    border-radius: 1em;
    border: 1px solid var(--primary-color);
    display: inline-block;
    margin-right: 8px;
    cursor: pointer;
    user-select: none;

    &:active {
      outline: none;
      border: 1px solid var(--primary-color);
    }

    &:focus {
      border: 1px solid var(--primary-color);
      outline: none;
    }

    :global(svg) {
      opacity: 0.75 !important;
    }

    &:hover,
    &:focus {
      background-color: hsla(#{$hsl}, 0.25);
    }
  }
</style>
