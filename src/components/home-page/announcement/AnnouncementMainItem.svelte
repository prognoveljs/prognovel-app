<script lang="ts">
  export let title = "Announcement here";
  export let bodyText = "";
</script>

<article>
  <h2>{title}</h2>
  {bodyText}
</article>

<style lang="scss">
  article {
    width: 100%;
    min-height: 4em;
    border: {
      bottom: 2px solid #fff4;
    }
  }
</style>
