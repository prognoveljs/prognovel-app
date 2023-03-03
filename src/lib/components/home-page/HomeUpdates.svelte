<script lang="ts">
  import { NOVEL_COVER_HEIGHT } from "$lib/_setting";
  import DisplayList from "./novel-list/DisplayList.svelte";
  import SectionHeaderLabel from "./misc/SectionHeaderLabel.svelte";

  export let grid;
</script>

<section
  class="container contain"
  style="grid-area: {grid}; min-height: {NOVEL_COVER_HEIGHT + 50}px;"
>
  <SectionHeaderLabel label="New updates" emoji="🌟" />

  <section class="list">
    <DisplayList />
  </section>
</section>

<style lang="scss">
  .container {
    // margin-top: 5em;
    padding-top: 3em;
    // background-color: #0002;
    position: relative;
    margin-bottom: 7em;

    .list {
      position: relative;
    }
  }
</style>
