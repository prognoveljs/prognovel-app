<script lang="ts">
  import SkeletonShell from "../SkeletonShell.svelte";
  import { Button } from "carbon-components-svelte";
  import AddFilled from "carbon-icons-svelte/lib/AddFilled.svelte";
  import { backend } from "$lib/store/backend";
  import { profile, userData } from "$lib/store/user";
  import { page } from "$app/stores";
  import { novelIndex } from "./_shared";
  import { showErrorMessage } from "$lib/utils/error";

  $: getNovelsData =
    $backend && $profile?.id && $novelIndex
      ? (getNovelList().catch((err) => {
          showErrorMessage({ message: err });
        }) as Promise<any>)
      : new Promise(() => {});

  function getNovelList() {
    return $backend.collection("novels").getList(1, 30, {
      filter: `author="${$profile?.id}"`,
      sort: "-updated",
    });
  }
</script>

<div class="novel-header">
  <strong>Novels </strong>
  <a class="add-novel" href="/write/create-novel/">Add <AddFilled size="18" /></a>
</div>

{#await getNovelsData}
  <!-- promise is pending -->
  {#each Array(4).fill("") as _}
    <SkeletonShell height="32" style="margin-top: 0.1em;">
      <rect width="100%" height="28" x="0" y="0" rx="4" ry="4" />
    </SkeletonShell>
  {/each}
{:then data}
  {#if data?.items?.length}
    {#each data.items as novel}
      <a
        class="novel-title"
        class:selected={$page.routeId == "write/novel/" + novel.id}
        href="/write/novel/{novel.id}/"
      >
        {novel.title || "--"}</a
      >
    {/each}
  {:else}
    <div class="no-novel">
      <span> you have not created a novel yet </span>
      <!-- <Button>Create novel</Button> -->
      <Button icon={AddFilled} href="/write/create-novel/">Add novel</Button>
    </div>
  {/if}
{/await}

<style lang="scss">
  @import "shared";
  .novel-header {
    margin-top: $section-header-margin-top;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.4em;

    strong {
      margin: 0;
    }

    // span {
    //   display: flex;
    //   align-items: center;
    //   gap: 0.4em;
    // }

    // button {
    //   background-color: hsla(#{$hsl}, 0.1);
    //   outline: none;
    //   border: none;
    //   border-radius: 2px;
    //   cursor: pointer;
    //   user-select: none;
    //   padding: 4px 6px;

    //   &:hover {
    //     background-color: hsla(#{$hsl}, 0.3);
    //   }
    // }
  }

  :global(a.novel-title) {
    img {
      height: 2.5em;
      width: auto;
      margin: {
        left: -1 * $side-padding;
        top: -1 * $v-padding;
        bottom: -1 * $v-padding;
        right: 1em;
      }
    }

    &:not(.selected) {
      img {
        filter: grayscale(70%);
      }
    }

    &:hover {
      img {
        filter: grayscale(30%);
      }
    }

    &.disabled {
      filter: grayscale(0.4);
      opacity: 0.6;
    }
  }

  .add-novel {
    display: flex;
    gap: 0.2em;
    align-items: center;

    :global(svg) {
      margin: 0 !important;
    }
  }

  .no-novel {
    $bleed: 1em;
    width: calc(100% + $bleed * 2);
    padding: 1.5em 2.5em 2em;
    margin: 0 calc(-1 * $bleed);
    background: #0003;
    border-radius: 8px;
    text-align: center;
    // font-weight: 300;

    span {
      opacity: 0.7;
      font-style: italic;
      display: block;
      margin-bottom: 0.7em;
    }
  }
</style>
