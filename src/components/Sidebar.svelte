<script lang="ts">
  import { onMount } from "svelte";
  import { homePageChildren } from "components/navigation/_shared";
  import {
    faHome,
    faBolt,
    faQuestion,
    faCog,
    faCommentAlt,
    faBook,
  } from "@fortawesome/free-solid-svg-icons";
  import Icon from "components/Icon.svelte";
  import NavOptions from "./navigation/NavOptions.svelte";
  import { page, showSettings } from "states";

  export let segment;
  let preload;
  onMount(() => {
    preload = false;
  });
</script>

<nav>
  {#if !preload}
    <a
      rel="prefetch"
      class={segment === undefined || homePageChildren.includes(segment) ? "selected" : ""}
      href="."
    >
      <Icon icon={faHome} size={"24px"} />
      <span class="tooltip" aria-hidden="true">home</span>
    </a>
    <a rel="prefetch" class={segment === "updates" ? "selected" : ""} href="updates">
      <Icon icon={faBolt} size={"24px"} />
      <span class="tooltip" aria-hidden="true">all updates</span>
    </a>
    <a rel="prefetch" class={segment === "discussions" ? "selected" : ""} href="discussions/all">
      <Icon icon={faCommentAlt} size={"24px"} />
      <span class="tooltip" aria-hidden="true">discussions</span>
    </a>
    <a rel="prefetch" class={segment === "novel" ? "selected" : ""} href="novel">
      <Icon icon={faBook} size={"24px"} />
      <span class="tooltip" aria-hidden="true">all novels</span>
    </a>
    <hr />
    <a rel="prefetch" class={segment === "help" ? "selected" : ""} href="help">
      <Icon icon={faQuestion} size={"24px"} />
      <span class="tooltip" aria-hidden="true">help </span>
    </a>
    <a href={$page.path} class="option" on:click|preventDefault={() => ($showSettings = true)}>
      <Icon icon={faCog} size={"24px"} />
      <span class="tooltip" aria-hidden="true"> settings </span>
    </a>
  {/if}
</nav>

<NavOptions open={$showSettings} on:close={() => ($showSettings = false)} />

<style lang="scss">
  $tooltip-border: 1.25px;
  $tooltip-border-color: hsla(var(--primary-color-h), var(--primary-color-s), 33%, 0.4);
  $tooltip-text-color: hsl(var(--primary-color-h), var(--primary-color-s), 52.5%);

  nav {
    position: fixed;
    top: var(--header-height);
    left: 0;
    width: var(--sidebar-width);
    height: 100vh;
    box-shadow: 2px 0 8px #0001;
    z-index: 888;
    background-color: var(--foreground-color);
    transition: background-color 0.22s ease-in-out;
    padding-top: 76px;

    @include screen("small-tablet") {
      display: none;
    }

    :global(html.light) & {
      box-shadow: none;
      border-right: 1px solid #0003;
    }

    a {
      display: flex !important;
      padding: 8px 0;
      justify-content: center;
      position: relative;
      opacity: 0.55;
      cursor: pointer;
      user-select: none;

      &:hover,
      &.selected {
        opacity: 1;
      }

      &:hover > .tooltip {
        transform: translateX(0);
        opacity: 1;
      }

      &::before {
        --width: 3px;
        content: "";
        position: absolute;
        top: 10%;
        left: 0;
        width: var(--width);
        height: 80%;
        background-color: var(--primary-color);
        transform: translateX(calc(var(--width) * -1));
        opacity: 0.33;
        transition: transform 0.135s ease-out;
      }

      &.selected::before {
        opacity: 1;
        transform: translateX(0);
      }

      :global(html.light) & {
        opacity: 1;

        :global(svg) {
          color: var(--primary-color-darken-4) !important;
          opacity: 0.725;
        }

        &:hover {
          background-color: var(--primary-color-lighten-3);
        }
        &.selected {
          background-color: var(--primary-color-lighten-1);

          :global(svg) {
            opacity: 1;
            color: #fff !important;
          }
        }

        &.selected::before {
          height: 100%;
          width: 5px;
          top: 0;
          background-color: var(--primary-color-darken-2);
        }
      }
    }
    hr {
      border-color: #0002;
      display: block;
    }
  }

  .tooltip {
    position: absolute;
    top: calc(50% - 12.4px);
    left: 84%;
    background-color: #000a;
    color: $tooltip-text-color;
    /* change this later to a variable */
    border: $tooltip-border solid $tooltip-border-color;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    padding: 4px 16px;
    /* height: 24px; */
    font-size: 0.75em;
    line-height: 1.4;
    vertical-align: center;
    border-radius: 3px;
    box-shadow: 0 2px 16px #0004;
    display: flex;
    align-self: center;
    margin: auto;
    transform: translateX(2px);
    pointer-events: none;
    opacity: 0;
    transition: all 0.125s ease-out;
    white-space: nowrap;

    :global(html.light) & {
      background-color: #fff;
      font-weight: 500;
      border-width: 1.5px;
    }
  }
</style>
