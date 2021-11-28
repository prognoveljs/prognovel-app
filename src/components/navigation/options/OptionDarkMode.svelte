<script lang="ts">
  import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

  import Icon from "components/Icon.svelte";
  import { scale } from "svelte/transition";
  import { onMount } from "svelte";
  import { cubicOut } from "svelte/easing";
  import { get, set } from "idb-keyval";

  const DARK_MODE_DEFAULT = true;

  let darkMode;
  $: icon = darkMode ? faSun : faMoon;

  async function changeMode() {
    darkMode = !darkMode;
    await set("darkMode", darkMode);
    // const carbonCSS = darkMode ? "carbon-css/g90.css" : "carbon-css/g10.css";
    // (document.querySelector("#carbon-css") as HTMLLinkElement).href = `/style/${carbonCSS}`;

    if (darkMode) {
      document.querySelector("html").classList.remove("light");
    } else if (darkMode !== undefined) {
      document.querySelector("html").classList.add("light");
    }
  }

  onMount(async () => {
    const dark = await get("darkMode");
    if (dark !== undefined) {
      darkMode = dark;
    } else {
      darkMode = DARK_MODE_DEFAULT;
    }
  });
</script>

<li on:click={changeMode}>
  <div>Turn {darkMode ? "off" : "on"} dark mode</div>
  {#if darkMode === true}
    <div in:scale={{ start: 0, duration: 275, easing: cubicOut }} class="darkModeIcon">
      <Icon icon={faMoon} size={"28px"} />
    </div>
  {:else if darkMode === false}
    <div in:scale={{ start: 0, duration: 275, easing: cubicOut }} class="darkModeIcon">
      <Icon icon={faSun} size={"28px"} />
    </div>
  {/if}
</li>

<style lang="scss">
  $min-height: 53px;

  li {
    grid-template-columns: 1fr 32px;
    min-height: $min-height;
    cursor: pointer;
    user-select: none;
    width: 100%;
    position: relative;
    display: grid;
    padding: 12px;
    align-items: center;
    font-weight: 500;
    background-color: #0001;
    border-bottom: 1px solid #fff1;
    &:hover {
      background-color: #fff1;
      border-color: hsla(var(--primary-color-h), 75%, 50%, 0.2);
    }
  }
  .darkModeIcon {
    opacity: 0.45;
    /* will-change: transform; */
  }
  .darkModeIcon:hover {
    opacity: 0.7;
  }
</style>
