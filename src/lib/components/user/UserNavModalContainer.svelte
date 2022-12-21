<script lang="ts">
  import UserNavModalTop from "./user-nav-modal/UserNavModalTop.svelte";
  import UserNavModalLinks from "./user-nav-modal/UserNavModalLinks.svelte";
  import UserNavModalBottom from "./user-nav-modal/UserNavModalBottom.svelte";
  import { fly } from "svelte/transition";

  export let id: string = "user-nav-modal";
</script>

<section
  in:fly={{ duration: 400, y: 12, opacity: 0 }}
  out:fly={{ duration: 400, y: 12, opacity: 0 }}
  on:blur
  tabindex="0"
  {id}
>
  <UserNavModalTop />
  <UserNavModalLinks />
  <div class="opts">
    <UserNavModalBottom />
  </div>
</section>

<style lang="scss">
  section {
    --padding-side: 0.8em;
    // --padding-top: 1.5em;
    --padding-top: 0.8em;
    --padding-bottom: 1em;
    --opacity: 1;
    --border-radius: 4px;
    display: flex;
    position: fixed;
    right: 0.85em;
    top: calc(var(--header-height) - 0.9em);
    // transform: translateY(20%) translateZ(0);
    width: 20em;
    background-color: var(--foreground-color);
    padding: var(--padding-top) var(--padding-side) var(--padding-bottom);
    z-index: 999999999999999;
    opacity: var(--opacity);
    transition: all 0.4s ease-in-out;
    font-weight: 400;
    flex-direction: column;
    border-radius: var(--border-radius);
    box-shadow: 0px 5.1px 4.7px -7px rgba(0, 0, 0, 0.073),
      0px 17.2px 15.9px -7px rgba(0, 0, 0, 0.107), 0px 77px 71px -7px rgba(0, 0, 0, 0.18);

    :global {
      .bx--btn--sm {
        flex-shrink: 0;
        padding-right: 1.6em;
      }
    }
  }
</style>
