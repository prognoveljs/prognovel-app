<script lang="ts">
  import PostCanvas from "$lib/components/write-page/post/PostCanvas.svelte";
  import PostsTable from "$lib/components/write-page/PostsTable.svelte";

  let postData = null;

  function post(e) {
    postData = e.detail;
  }
</script>

<h1>📻 My community posts</h1>
<PostsTable on:postevent={post} filter={'novel_parent = "" && is_news = false'} />

{#if postData}
  <PostCanvas data={postData} on:close={() => (postData = null)} />
{/if}
