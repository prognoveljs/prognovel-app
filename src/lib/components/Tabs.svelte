<script lang="ts">
  import { camelCase, snakeCase } from "$lib/utils/string";
  import ca from "date-fns/locale/ca";

  interface Tab {
    label: string;
    icon?: any;
  }
  export let tabs: Tab[] = [];
  export let selected: string = "";
</script>

<div class="tabs">
  {#each tabs as tab, i}
    <div
      on:click={() => {
        selected = snakeCase(tab?.label);
      }}
      class="tab"
      class:selected={selected === snakeCase(tab?.label)}
    >
      {tab?.label}
    </div>
  {/each}
</div>
<slot tab={selected} />

<style lang="scss">
  .tabs {
    display: flex;
    gap: 0.5em;
    margin-bottom: 1em;

    .tab {
      --border-color: #fff4;
      --background-color: transparent;
      padding: 0.5em 1em;
      border-bottom: 2px solid var(--border-color);
      background-color: var(--background-color);
      position: relative;
      cursor: pointer;
      user-select: none;

      &:hover {
        --border-color: hsla(#{$hsl}, 0.6);
        --background-color: hsla(#{$hsl}, 0.075);
      }

      &.selected {
        --border-color: var(--primary-color);
        --background-color: hsla(#{$hsl}, 0.2);
      }
    }
  }
</style>
