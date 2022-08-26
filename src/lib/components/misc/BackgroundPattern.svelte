<script lang="ts">
  export let patterGap = 52;
  export let patterSize = 6;
</script>

<div class="bg_bottom">
  <svg width="100%" height="100%">
    <!-- Create mask that we'll use to define a slight gradient -->
    <mask maskUnits="userSpaceOnUse" id="bg_fade">
      <!-- Here's that slight gradient -->
      <linearGradient id="bg_gradient" x1="0" y1="0" x2="0" y2="100%">
        <stop offset="0" style="stop-color: #FFFFFF" />
        <stop offset="1" style="stop-color: #000000" />
      </linearGradient>
      <!-- The canvas for our mask -->
      <rect fill="url(#bg_gradient)" width="100%" height="100%" />
    </mask>

    <!-- Let's define the pattern -->
    <!-- The width and height should be double the circle radius we plan to use -->
    <pattern
      id="pattern-circles"
      x="0"
      y="42"
      width={patterGap}
      height={patterGap}
      patternUnits="userSpaceOnUse"
    >
      <!-- Now let's draw the circle -->
      <!-- We're going to define the `fill` in the CSS for flexible use -->
      <circle mask="url(#bg_fade)" cx={patterSize} cy={patterSize} r={patterSize} />
    </pattern>
    <!-- The canvas with our applied pattern -->
    <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)" />
  </svg>
</div>

<style lang="scss">
  .bg_bottom {
    width: 100%;
    height: 750px;
    position: absolute;
    bottom: 0;
    z-index: -1;
    opacity: 0.2;
    padding-left: 1%;
    overflow: hidden;

    :global {
      svg {
        fill: var(--primary-color);
      }
    }

    &::after {
      content: "";
      background-image: linear-gradient(
        to bottom,
        var(--background-color),
        var(--background-color-alpha)
      );
      width: 100%;
      height: 70%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
