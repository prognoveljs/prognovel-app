<script>
  import Avatar from "components/user/Avatar.svelte";
  import Todos1 from "./_Card1Todos.svelte";
  import Todos2 from "./_Card2Todos.svelte";
  import InProgress from "./_CardInProgress.svelte";
  import Completed from "./_CardCompleted.svelte";

  let enableBugs = true;
  let enableFeatures = true;
  let enableImprovements = true;
  let enablePlugins = true;
  let enableMiscs = true;
</script>

<svelte:head>
  <title>ProgNovel Roadmaps</title>
</svelte:head>

<article class="head">
  <div class="flex">
    <section class="author">
      <Avatar size="48" />
      <span>Radhy</span>
    </section>
    <section class="buttons">
      <span class:checked={enableBugs} on:click={() => (enableBugs = !enableBugs)}>🐞 Bugs</span>
      <span class:checked={enableFeatures} on:click={() => (enableFeatures = !enableFeatures)}
        >🎉 Features</span
      >
      <span class:checked={enableImprovements} on:click={() => (enableImprovements = !enableImprovements)}
        >🔨 Improvements</span
      >
      <span class:checked={enablePlugins} on:click={() => (enablePlugins = !enablePlugins)}>🔌 Plugins</span>
      <span class:checked={enableMiscs} on:click={() => (enableMiscs = !enableMiscs)}>Miscs</span>
    </section>
  </div>
</article>

<article
  class="body"
  class:enableBugs
  class:enableFeatures
  class:enableImprovements
  class:enablePlugins
  class:enableMiscs
>
  <section class="todos">
    <h2>Todos 📌</h2>
    <div class="grid">
      <div>
        <Todos1 />
      </div>
      <div>
        <Todos2 />
      </div>
    </div>
  </section>

  <section class="in-progress">
    <h2>In Progress 👷</h2>
    <InProgress />
  </section>

  <section class="completed" tabindex="0">
    <h2>Done ✅</h2>
    <Completed />
  </section>
</article>

<style lang="scss">
  $padding: 48px;
  $maxWidth: 1600px;

  article.head {
    padding: 18px $padding;
    margin: 0 auto;
    position: fixed;
    top: var(--header-height);
    right: 0;
    z-index: 14;
    background: var(--foreground-color);
    width: calc(100% - var(--sidebar-width));
    box-shadow: 0 2px 6px #0001, 0 2px 2px #0001;

    .flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: $maxWidth;
      padding: 0 $padding;
      margin: 0 auto;
      // text-align: right;

      .author {
        display: flex;
        align-items: center;

        span {
          margin-left: 8px;
          font-weight: 500;
        }
      }
      .buttons {
        span {
          $buttonOpacity: 0.33;
          border-radius: 4px;
          padding: 8px 12px;
          margin-left: 4px;
          user-select: none;
          cursor: pointer;

          &:hover {
            background-color: hsla(var(--primary-color-h), 100%, 40%, #{$buttonOpacity/2});
          }

          &.checked {
            background-color: hsla(var(--primary-color-h), 100%, 40%, #{$buttonOpacity});
          }
        }
      }
    }
  }

  article.body {
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    grid-template-areas: "todos todos progress completed";
    grid-gap: 12px;
    padding: $padding;
    max-width: $maxWidth;
    position: relative;

    margin: 72px auto 0;
    font-size: 14px;

    .todos {
      grid-area: todos;

      .grid {
        grid-gap: 0 12px;
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
    }

    .in-progress {
      grid-area: progress;
    }

    .completed {
      grid-area: completed;
      position: absolute;
      cursor: pointer;

      &:focus {
        position: relative;
        outline: none;
      }

      &:not(:focus) {
        :global(.card) {
          // user-select: none;
          filter: contrast(0.8) grayscale(0.3);
        }

        &:hover {
          :global(.card) {
            border-color: #fff3;
          }
        }
      }
    }

    :global(.card) {
      display: none;
    }

    &.enableBugs :global(.card.bug) {
      display: block;
    }
    &.enableFeatures :global(.card.feature) {
      display: block;
    }
    &.enableImprovements :global(.card.improvement) {
      display: block;
    }
    &.enablePlugins :global(.card.plugin) {
      display: block;
    }
    &.enableMiscs :global(.card.misc) {
      display: block;
    }

    &::after {
      content: "";
      width: 100%;
      height: 100px;
      position: absolute;
      left: 0;
      bottom: 0;
      background: linear-gradient(to top, var(--background-color), transparent);
      z-index: 10;
      pointer-events: none;
    }
  }

  @media screen and (max-width: 780px) {
    article {
      grid-template-columns: 1fr;
    }
  }

  section {
    border-radius: 4px;
    h2 {
      border-bottom: 2px solid transparent;
    }
    &:hover {
      h2 {
        // border-bottom-color: hsla(var(--primary-color-h), 85%, 40%, 0.75);
        border-bottom-color: #fffa;
      }
    }
  }
</style>
