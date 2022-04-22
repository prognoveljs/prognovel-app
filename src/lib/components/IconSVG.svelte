<script lang="ts">
  export let data = "";
  export let size = "24px";
  export let style = "";
  $: svg = data.replace('width="24" height="24"', `width="${size}" height="${size}"`);
  // $: svg = data.replace('width="24" height="24"', `width="100%" height="100%"`);
</script>

<span on:click {style}>
  {@html svg}
</span>

<style lang="scss">
  span {
    color: var(--color, currentColor);
    display: inline-flex;
    align-items: center;
    :global(svg) {
      display: block;
    }
  }
</style>
