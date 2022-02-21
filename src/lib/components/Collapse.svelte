<script lang="ts">
  export let title = "";
  export let width = "100%";
</script>

<details style="width: {width};">
  <summary>{title}</summary>
  <slot />
</details>

<style lang="scss">
  details {
    --padding-left: 8px;
    --bg-alpha: 0.125;
    --bg-hover-alpha: 0.275;
    margin-bottom: 8px;
    :global(p) {
      margin-left: calc(14px + var(--padding-left));

      &:last-child {
        margin-bottom: 36px;
      }
    }

    &[open] {
      --bg-alpha: var(--bg-hover-alpha);
    }
  }
  summary {
    padding: 12px calc(8px + var(--padding-left));
    cursor: pointer;
    border-radius: 4px;
    background: hsla(
      var(--primary-color-h),
      var(--primary-color-s),
      var(--primary-color-l),
      var(--bg-alpha)
    );
    user-select: none;
    &:hover {
      --bg-alpha: var(--bg-hover-alpha);
    }

    &:focus {
      outline: none;
    }
  }
</style>
