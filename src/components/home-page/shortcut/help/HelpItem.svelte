<script>
  import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
  import Icon from "components/Icon.svelte";
  let i = "";
  export let link;
</script>

<a class="help-item" rel="prefetch" href={link}>
  <span>
    <slot />
  </span>
  <Icon icon={faCaretRight} size="36px" />
</a>

<style lang="scss">
  .help-item {
    --border-alpha: 0.7;
    width: 100%;
    padding: 12px;
    border-radius: 4px;
    border: 1px solid
      hsla(var(--primary-color-h), var(--primary-color-s), var(--primary-color-l), var(--border-alpha));
    background: #fff1;
    display: grid;
    grid-template-columns: 1fr 48px;
    justify-content: center;
    align-items: center;
    text-align: left;
    margin-bottom: 8px;
    font-size: 0.85em;
    line-height: 1.25;
    cursor: pointer;
    user-select: none;
    text-decoration: none;

    span {
      opacity: 0.85;
    }

    :global(svg) {
      justify-self: end;
    }

    :global(path) {
      transition: all 0.125s ease-in;
      color: var(--primary-color) !important;
      opacity: 0.7;
    }

    &:hover {
      --border-alpha: 0.9;

      span {
        opacity: 1;
      }

      :global(path) {
        transform: translateX(4px);
        color: var(--primary-color) !important;
        opacity: 0.95;
      }
    }
  }
</style>
