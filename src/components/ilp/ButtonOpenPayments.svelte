<script lang="ts">
  export let padding = "8px 14px";
  export let iconSize = "24";
  export let size = "16px";
  export let iconSrc = "/img/svg/open-payments/logomark.svg";
  export let theme = "";

  $: additionalStyles = getTheme(theme);
  $: calculatedIconSize = (parseInt(size) / 16) * parseInt(iconSize);

  function getTheme(theme) {
    switch (theme) {
      case "webmonetization":
        return `
          color: #111;
          background-color: #fff;
          border: 2px solid #222e;
        `;
      default:
        return "";
    }
  }
</script>

<button style="padding: {padding}; font-size: {size}; {additionalStyles}" on:click>
  <img width={calculatedIconSize} height={calculatedIconSize} src={iconSrc} alt="Open Payments" />
  <slot />
</button>

<style lang="scss">
  @import "_button-base.scss";
</style>
