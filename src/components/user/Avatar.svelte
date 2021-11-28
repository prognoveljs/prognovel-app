<script>
  import { onMount } from "svelte";
  // import Placeholder from "./AvatarPlaceholder.svelte";

  export let gender = "male";
  export let name = "User";
  export let size = 32;
  export let round = true;
  export let src = "";
  let visible = false;
  $: img = src || `/img/svg/avatar-${gender}.svg`;

  const fetchImage = async () => {
    const res = await fetch(img);
    return res.url;
  };

  onMount(() => {
    visible = true;
  });
</script>

<div class="avatar" style="width: {size}px; height: {size}px;" class:round>
  <!-- <Placeholder /> -->
  {#if img && visible}
    {#await fetchImage() then src}<img {src} alt={name} />{/await}
  {/if}
</div>

<style lang="scss">
  div {
    overflow: hidden;
    background-color: var(--foreground-color);
    display: inline-block;
    position: relative;
  }

  .round {
    border-radius: 50%;
  }

  img {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
  }
</style>
