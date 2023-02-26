<script lang="ts">
  export let label = "Browse our novel";
  export let emoji = "🌟";
</script>

<h2>
  {#if emoji}
    <div>
      {emoji}
    </div>
  {/if}
  {label}
</h2>

<style lang="scss">
  h2 {
    margin: 0;
    line-height: 1;
    padding-bottom: 0.5em;
    margin-bottom: 0.8em;
    opacity: 0.7;
    max-width: var(--width, 5em);

    div {
      margin-bottom: 0.4em;
    }

    position: relative;
    z-index: 2;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 2em;
      height: 4px;
      background-color: var(--primary-color);
      opacity: 0.7;
    }

    :global {
      html.light & {
        font-weight: 700;
      }
    }
  }
</style>
