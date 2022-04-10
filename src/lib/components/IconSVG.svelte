<script lang="ts">
  export let data = "";
  export let size = "24";
  $: svg = data.replace('width="24" height="24"', `width="${size}" height="${size}"`);
</script>

<span on:click>
  {@html svg}
</span>

<style lang="scss">
  span {
    color: var(--color, currentColor);
    // :global(svg) {

    // }
  }
</style>
