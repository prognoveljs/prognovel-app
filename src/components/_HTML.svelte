<script context="module">
  export async function preload(page, session) {
    const { query } = page;

    load = query.load;
  }
</script>

<script>
</script>

<div style="display:none">
  <a href="explore">Read</a>
  <a href="read">Read</a>
  <a href="novel">Read</a>
  <a href="help">Read</a>
  <a href="settings">Read</a>
  <a href="offline-mode">Read</a>
  <a href="bookmark">Read</a>
  <a href="announcement">Read</a>
  <a href="404">Read</a>
  <!-- {#each novels as novel}
    <a href="read/{novel}">{novel}</a>
  {/each} -->
</div>
