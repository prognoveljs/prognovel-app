<script lang="ts">
  import PostsTable from "$lib/components/write-page/PostsTable.svelte";

  let novel_parent = "";
</script>

<h1>📢 Announcement Posts</h1>
<PostsTable filter={`novel_parent="${novel_parent}" && is_news = true`} />
