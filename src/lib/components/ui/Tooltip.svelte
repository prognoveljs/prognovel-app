<script lang="ts">
  export let text: string;
  export let position: "top" | "bottom" | "left" | "right";
  export let arrowStyle: string = "";
  export let backgroundColor: string = "var(--foreground-color)";
  export let textColor: string = "var(--text-body-color)";
  export let width: string = "10em";
  export let style: string = "";

  $: getLocation = function () {
    switch (position) {
      case "top":
        return "top: 100%;";
        break;
      default:
        return "bottom: -32px;";
        break;
    }
  };
</script>

<div class="tooltip-container" style="--bg:{backgroundColor};">
  <slot />
  <span
    class={position}
    style="color: {textColor};{arrowStyle}; 
  width: {width};{getLocation()};
  {style};"
  >
    {text}
  </span>
</div>

<style lang="scss">
  $arrowSize: 7px;
  .tooltip-container {
    span {
      pointer-events: none;
      position: absolute;
      // bottom: -32px;
      right: 4px;
      padding: 4px 8px;
      border-radius: 2px;
      background-color: var(--bg);
      // border: 2px solid hsla(#{$h}, 55%, 32%, 0.3);
      opacity: 0;
      transition: all 0.2s ease-out;
      font-size: 0.75rem;
      line-height: 1.2;
      box-shadow: 0 1px 3px #0003, 0 3px 12px #0002;
      font-weight: 300;

      // Tooltip triangle
      &.top::after {
        @include css-triangle(var(--bg), top, $arrowSize);
        top: -$arrowSize;
        right: var(--right, calc(50% - #{$arrowSize / 2}));
        left: var(--left, auto);
      }
      &.bottom::after {
        @include css-triangle(var(--bg), top, $arrowSize);
        bottom: -$arrowSize;
        right: var(--right, calc(50% - #{$arrowSize / 2}));
        left: var(--left, auto);
      }
      &.right::after {
        @include css-triangle(var(--bg), top, $arrowSize);
        right: -$arrowSize;
        top: var(--top, calc(50% - #{$arrowSize / 2}));
        bottom: var(--bottom, auto);
      }
      &.left::after {
        @include css-triangle(var(--bg), top, $arrowSize);
        left: -$arrowSize;
        top: var(--top, calc(50% - #{$arrowSize / 2}));
        bottom: var(--bottom, auto);
      }
    }

    &:hover span {
      opacity: 1;
      transform: translateY(8px);
    }
  }
</style>
