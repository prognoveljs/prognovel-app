<script>
  import { enablePremiumContent } from "utils/web-monetization";
  import { setColor, activeColor } from "./color";
  import Icon from "components/Icon.svelte";
  import { faLock } from "@fortawesome/free-solid-svg-icons";

  export let hue;
  export let saturate;
  export let light;
  export let name;
  export let vip = false;
  export let size = "32px";

  $: hueRotate = vip ? 0 : 0;
  $: saturateDown = vip ? 0 : 12;
  $: lightDown = vip ? 0 : 15;
  $: notVIP = vip && !$enablePremiumContent;
  $: isActive = name === $activeColor;

  let button;
  const active = async () => {
    if (notVIP) return; // check if for VIP only

    setColor(hue, saturate, light, button);
  };
</script>

<div
  bind:this={button}
  data-color-name={name}
  on:click={active}
  class:activeColor={isActive}
  class:vipOnly={notVIP}
  style="background-color: hsl({hue}, {saturate}%, {light}%); border-color: hsl({hue +
    hueRotate}, {saturate - saturateDown}%,
  {light - lightDown}%); height: {size}; width: {size};"
>
  {#if isActive}<span />{/if}
  {#if notVIP}
    <Icon icon={faLock} />
  {/if}
</div>

<style lang="scss">
  div {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    border: 1.5px solid transparent;

    transition: transform 0.125s ease-in-out;

    &:not(.vipOnly) {
      cursor: pointer;
    }

    :global(svg) {
      opacity: 0.775;
      position: absolute;
    }
  }

  $dot-size: 10px;
  span {
    width: $dot-size;
    height: $dot-size;
    border-radius: 50%;
    margin: auto;
    background-color: #0006;
    // mix-blend-mode: color-burn;
  }

  .activeColor {
    outline: 2px solid #fff1;
    transform: scale(1.075);
  }

  .vipOnly {
    filter: grayscale(50%) opacity(0.8);
    border-color: transparent !important;

    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
</style>
