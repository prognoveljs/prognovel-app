<script lang="ts">
  import DisqusThread from "./action.js";

  export let src;
  export let container = "disqus_container";
  export let url = window.location.href;
  export let identifier = window.location.pathname;
</script>

<div
  use:DisqusThread={{
    identifier,
    url,
    src,
  }}
  class={container}
/>
