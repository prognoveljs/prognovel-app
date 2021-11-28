<script>
  export let size = 18;
  // export let icon;
</script>

<button class="btn" style="font-size: {size}px;">
  <slot />
</button>

<style lang="scss">
  .btn {
    font-family: inherit;
  }
</style>
