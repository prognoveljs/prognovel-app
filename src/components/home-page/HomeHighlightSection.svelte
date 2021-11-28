<script lang="ts">
  export let grid = "";
  export let title = "";

  $: className = grid;
</script>

<section class={className} style="grid-area: {grid};" tabindex="0">
  <div class="content">
    <div class="banner">
      <slot name="banner" />
    </div>
    <strong>{title}</strong>
    <div class="body-text">
      <slot />
    </div>
  </div>
  <div class="fade overlay-bottom" />
  <span class="read-more" aria-hidden="true">read more...</span>
</section>

<style lang="scss">
  $focus-z-index: 999999;
  section {
    overflow: hidden;
    position: relative;
    outline: none;
    border: none;
    font-size: 0.925rem;
    line-height: 1.325;

    &.monetization {
      font-size: 1rem;
    }

    .overlay-bottom {
      pointer-events: none;
      width: 100%;
      height: var(--overlay-height, 100px);
      position: absolute;
      bottom: 0;
      right: 0;
      background: linear-gradient(
        to top,
        var(--section-bg-color) -50%,
        var(--section-bg-color),
        transparent
      );
      z-index: 3;
    }

    .read-more {
      position: absolute;
      bottom: 6px;
      left: 0;
      width: 100%;
      color: var(--primary-color);
      text-align: center;
      opacity: 0.35;
      z-index: 4;
      // font-style: italic;
      font-size: 0.9em;
      pointer-events: none;
    }

    .content {
      --border-thick: 1.5px;
      --border-color: #555;
      --padding: 1.5em 1em;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: var(--section-bg-color);
      border: var(--border-thick) solid var(--border-color);
      padding: var(--padding);
      transition: transform 0.125s ease-out;
      cursor: pointer;

      strong {
        font-size: 1.6em;
        display: block;
        max-width: calc(var(--section-grid-width) * 1.6);
        margin: 1em 0 1em;
        line-height: 1.1;

        @include screen("mobile") {
          margin: 0.5em 0 0.5em;
        }
      }

      &:hover {
        --border-color: hsla(
          var(--primary-color-h),
          var(--primary-color-s),
          var(--primary-color-l),
          0.6
        );

        & ~ .read-more {
          opacity: 1;
        }
      }
    }

    &::before {
      content: "";
      top: 0;
      left: 0;
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: #0004;
      z-index: calc(var(--zIndex) - 1);
      pointer-events: none;
      opacity: 0;
      transition: all 0.225s 0.1s ease-in;
    }

    &:focus {
      --zIndex: #{$focus-z-index};
      z-index: var(--zIndex);
      overflow: visible;

      .fade {
        display: none;
      }

      strong {
        color: var(--primary-color);
      }

      .content {
        --border-color: var(--primary-color);
        height: auto;
        min-height: 100%;
        overflow: hidden;
        transform: scale(1.0125) translateY(-2px);
        box-shadow: 0 2px 8px #0003, 0 4px 20px #0002;
        cursor: auto;
        z-index: inherit;
      }

      &::before {
        opacity: 1;
      }
    }

    .banner {
      --overlay-height: 200px;

      :global(img) {
        margin-top: 1em;
        width: 100px;

        @include screen("mobile") {
          margin-top: -0.4em;
          width: 64px;
        }
      }
    }
  }
</style>
