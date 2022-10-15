<script lang="ts">
  export let id: string = "";
  export let tab: string = "";
</script>

{#if id === tab}
  <slot><!-- optional fallback --></slot>
{/if}
