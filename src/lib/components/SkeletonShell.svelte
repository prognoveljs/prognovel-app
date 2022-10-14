<script lang="ts">
  export let secondaryColor = "#EBECEFAA"; // do not use rgba() - not working in Safari on iOS 11
  export let primaryColor = "#F5F5F766";
  export let height: number | string = 200;
  export let width: number | string = "100%";
  export let speed = 2;
  export let animate = true;
  export let secondaryColorPercentWidth = 100;
  export let ariaLabel = null;
  export let style = "";

  let idClip = getUniqueId();
  let idGradient = getUniqueId();
  export let elClass = "";

  function getUniqueId() {
    return Math.random().toString(36).substring(2);
  }
</script>

<svg class={elClass} {width} {height} aria-label={ariaLabel} preserveAspectRatio="none" {style}>
  <rect fill="url(#{idGradient})" clip-path="url(#{idClip})" {width} {height} x="0" y="0" />
  <defs>
    <clipPath id={idClip}>
      <slot>
        <rect {width} {height} x="0" y="0" rx="8" ry="8" />
      </slot>
    </clipPath>
    <linearGradient id={idGradient} x1="-{secondaryColorPercentWidth}%" y1="50%" x2="0%" y2="50%">
      {#if animate}
        <animate
          attributeName="x1"
          from="-{secondaryColorPercentWidth}%"
          to="100%"
          dur="{speed}s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="x2"
          from="0%"
          to="{100 + secondaryColorPercentWidth}%"
          dur="{speed}s"
          repeatCount="indefinite"
        />
      {/if}

      <stop stop-color={primaryColor} offset="0%" />
      <stop stop-color={secondaryColor} offset="50%" />
      <stop stop-color={primaryColor} offset="100%" />
    </linearGradient>
  </defs>
</svg>

<style lang="scss">
  svg {
    opacity: var(--opacity, 1);
  }
</style>
