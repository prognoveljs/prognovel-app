<script lang="ts">
  import PostsTable from "$lib/components/write-page/PostsTable.svelte";
</script>

<h1>📻 My community posts</h1>
<PostsTable filter={'novel_parent = "" && is_news = false'} />
