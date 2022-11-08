<script lang="ts">
  import PostCanvas from "$lib/components/write-page/post/PostCanvas.svelte";
  import PostsTable from "$lib/components/write-page/PostsTable.svelte";

  let novel_parent = "";
  let postData = null;

  function post(e) {
    postData = e.detail;
  }
</script>

<h1>📢 Announcement Posts</h1>
<PostsTable on:postevent={post} filter={`novel_parent="${novel_parent}" && is_news = true`} />

{#if postData}
  <PostCanvas data={postData} on:close={() => (postData = null)} />
{/if}
