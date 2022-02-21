<script lang="ts">
  export let value: number | string = 1;
  export let max: number = 100;
  export let size: number = 96;
  export let img: string = "";
  export let label: string = "";
  export let border: number = 16;

  $: progressPath = () => {
    if (value <= 0) {
      return "";
    } else if (value >= max) {
      return "M50,5A45 45 0 1 1 49.9999 5";
    } else {
      const angle = Math.PI * 2 * ((value as number) / max);
      const x = 50 + Math.cos(angle - Math.PI / 2) * 45;
      const y = 50 + Math.sin(angle - Math.PI / 2) * 45;

      let path = "M50,5";

      if (angle > Math.PI) {
        path += "A45 45 0 0 1 50 95";
      }

      path += `A45 45 0 0 1 ${x} ${y}`;

      return path;
    }
  };
</script>

<div style="width: {size}px; height: {size}px;">
  <svg viewBox="0 0 100 100">
    <path d="M50,5A45 45 0 1 1 49.9999 5" />
    <path d={progressPath()} />
  </svg>
  <div class="slot">
    {#if img}
      <img width={size - border} height={size - border} src={img} alt={label} />
    {/if}
    <slot>
      <span>{value}<small>% </small> </span>
    </slot>
  </div>
</div>

<style lang="scss">
  svg {
    fill: var(--progress-fill, transparent);
    height: 100%;
    position: absolute;
    stroke-linecap: var(--progress-linecap, round);
    width: 100%;
    z-index: 2;

    path {
      &:first-child {
        stroke: var(--progress-trackcolor, grey);
        stroke-width: var(--progress-trackwidth, 9px);
      }

      &:last-child {
        stroke: var(--progress-color, lightgreen);
        stroke-width: var(--progress-width, 10px);
      }
    }
  }

  div {
    height: 100%;
    position: relative;
    width: 100%;

    img,
    span {
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 0;
      user-select: none;
    }

    img {
      opacity: var(--image-opacity, 0.8);
      // SCSS somehow conflict with filter grayscale()
      filter: #{"grayscale(var(--image-grayscale, 0.65))"};
      border-radius: 50%;
      transition: all 0.125s ease-out;
    }

    span {
      font-size: 1.225em;
      font-weight: 700;
      white-space: nowrap;

      small {
        font-size: 0.825em;
        display: inline;
        font-weight: 400;
        margin-left: 0.125em;
      }
    }
  }
</style>
