<script lang="ts">
  import type { Volume } from "$typings/novel";
  import VolumeChapterList from "./VolumeChapterList.svelte";

  export let volume: Volume;
  export let index: number = 1;
  let showChapterList = false;
</script>

<div class="volume" on:click>
  <small>volume {index + 1}</small>
  <h2>{volume?.title || ""}</h2>
</div>

<style lang="scss">
  .volume {
    background-color: #0002;
    padding: 1.5em 1em;
    border-radius: var(--border-radius);
    position: relative;

    h2 {
      margin-top: 0.3em;
    }

    small {
      position: absolute;
      top: 0.7em;
      right: 1.25em;
      font-style: italic;
      font-weight: 300;
      opacity: 0.8;
      font-size: 0.8em;
    }
    // display: flex;
  }
</style>
