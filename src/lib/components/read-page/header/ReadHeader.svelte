<script lang="ts">
  import ChapterTitle from "./ReadHeaderChapterTitle.svelte";

  $: banner = "";
  export let title: string;
</script>

<section style="background-image: url('{banner}');">
  <ChapterTitle {title} />
</section>

<style lang="scss">
  section {
    background-color: #0004;
    width: 100%;
    min-height: 400px;
    display: flex;
    align-items: flex-end;
  }
</style>
