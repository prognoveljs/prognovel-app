<script lang="ts">
  import SkeletonShell from "$lib/components/SkeletonShell.svelte";
  import { currentContent } from "$lib/store/read-page/vars";
  import StaffAvatar from "./StatsStaffAvatar.svelte";

  let wrapper: HTMLElement;
  $: roles = Object.keys($currentContent?.contributors ?? {});
  $: contributors = $currentContent.contributors;

  const getBackgroundColor = (role: string, alpha: boolean = false) => {
    switch (role) {
      case "author":
        return "#e67e22" + (alpha ? "55" : "");
      case "editor":
        return "#e74c3c" + (alpha ? "55" : "");
      case "proofreader":
        return "#2ecc71" + (alpha ? "55" : "");
      default:
        return "#bdc3c7" + (alpha ? "55" : "");
    }
  };

  function onScroll(e: WheelEvent) {
    wrapper.scrollLeft += e.deltaY;

    e.preventDefault();
  }
</script>

<section bind:this={wrapper} on:wheel={onScroll}>
  {#if $currentContent?.meta?.status !== "loading"}
    {#if roles.length}
      {#each roles as role}
        <span style="background-color:{getBackgroundColor(role, true)};">
          {#each contributors[role] as data}
            <StaffAvatar {...data} {role} />
          {/each}
          <div class="badge" style="background-color: {getBackgroundColor(role)};">
            {role}
          </div>
        </span>
      {/each}
    {:else}
      <!-- TODO: create UI if no staff seen in chapter -->
      <!-- nothing to see here.... -->
    {/if}
  {:else}
    {#each [1, 2, 3, 4] as item, i}
      <SkeletonShell width="120" height="152" primaryColor="#EBECEF77" secondaryColor="#F5F5F799">
        <rect width={(i + 1) * 120} height="152" x={i ? 8 : 0} y="0" rx="2" ry="2" />
      </SkeletonShell>
    {/each}
  {/if}
</section>

<style lang="scss">
  section {
    // position: relative;
    display: flex;
    // gap: 1em;
    // width: max-content;
    min-height: 152px;

    overflow-x: scroll;
    scrollbar-width: none;
    white-space: nowrap;

    &::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
      width: 0;
      height: 0;
    }
    // overflow-x: scroll;

    span {
      display: flex;
      gap: 1em;
      padding: 1em;
      position: relative;
      overflow: visible;
      filter: grayscale(40%);

      .badge {
        opacity: 0;
        position: absolute;
        top: 0.2em;
        left: 0.4em;
        padding: 0 4px;
        // padding: 0.1em 1em;
        // border-radius: 1.2em;
        transition: all 0.13s ease-in;
      }

      &:hover {
        filter: grayscale(0%);
        .badge {
          opacity: 1;
          transform: translateY(-0.2em);
        }
      }
    }
  }
</style>
