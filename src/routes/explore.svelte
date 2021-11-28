<script>
  import { scale } from "svelte/transition";
  import ComingSoon from "../components/ComingSoon.svelte";
  const mockNovels = [
    "--primary-color-darken-1",
    "--primary-color-darken-2",
    "--primary-color-darken-3",
    "--primary-color-darken-4",
    "--primary-color-lighten-1",
    "--primary-color-lighten-2",
    "--primary-color-lighten-3",
    "--primary-color-lighten-4",
  ];
</script>

<svelte:head>
  <title>Explore Novels</title>
</svelte:head>
<div class="container-center">
  <h1>All novels</h1>
  <button>All Novel</button>
  <button>Ongoing</button>
  <button>Completed</button>
  <div class="hr" />
  <a href="explore">Xianxia</a>
  <a href="explore">Magical Realism</a>
  <a href="explore">Trope</a>
  <a href="explore">Ancient</a>
  <a href="explore">Politics</a>
  <a href="explore">Don't Know</a>
  <a href="explore">Somekinnd of Genre</a>
  <div class="grid">
    {#each mockNovels as novel, i}
      <div
        class="novel"
        style="background-color: var({novel});"
        in:scale={{ duration: 333, delay: 170 * i }}
      />
    {/each}
  </div>
</div>

<ComingSoon marginTop={48} />

<style>
  .grid {
    --cover-size: 150px;
    display: grid;
    grid-template-columns: repeat(auto-fill, var(--cover-size));
    grid-gap: 12px;
    margin-top: 24px;
  }
  .novel {
    width: var(--cover-size);
    height: var(--cover-size);
    background: var(--foreground-color);
    border-radius: 4px;
  }
  h1 {
    margin-bottom: 8px;
  }
  button {
    margin-bottom: 8px;
  }
  .hr {
    width: 85%;
    height: 1px;
    background-color: var(--text-body-color);
    opacity: 0.15;
    margin: 4px 0;
  }
</style>
