<script lang="ts">
  export let Icon = null;
  export let style: string = "";
</script>

<strong {style}>
  {#if Icon}
    <Icon size="20" />
  {/if}
  <slot /></strong
>
<hr />

<style lang="scss">
  strong {
    display: flex;
    max-width: 75%;
    margin-top: 1.5em;
    color: var(--primary-color-lighten-3);
    position: relative;

    :global(html.light) & {
      color: var(--primary-color-darken-2);
    }

    :global(svg) {
      opacity: 0.6;
      margin-right: 0.5em;
      filter: contrast(70%) grayscale(15%);
      flex-shrink: 0;
      transform: translateY(min(1em, 6%));
    }
  }

  hr {
    margin: 4px 0 12px;
    border-color: var(--text-body-color);
    border-width: 0.125px;
    opacity: 0.125;
  }
</style>
