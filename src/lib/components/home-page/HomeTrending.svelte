<script lang="ts">
  import { delay } from "$lib/utils/misc";
  import { ChevronDownIcon } from "svelte-feather-icons";
  import ShowcaseContainer from "./novel-showcase/ShowcaseContainer.svelte";

  type Period = "day" | "week" | "all time";
  let period: Period = "week";
  let el: HTMLElement;

  $: getLabel = () => {
    let periodLabel = "this week";

    if (period === "day") {
      periodLabel = "today";
    } else if (period === "all time") {
      periodLabel = "all time";
    }

    return `Trending novels ${periodLabel}`;
  };

  async function changeSortPeriod(time: Period) {
    period = time;
    await delay(66);
    el.blur();
  }
</script>

<ShowcaseContainer label={getLabel()}>
  <slot>
    <div bind:this={el} tabindex="0" class="droppable">
      <span class="label">by {period}</span>
      <ChevronDownIcon />
      <div class="pick">
        <em> sort content by </em>
        <span class:selected={period === "day"} on:click={() => changeSortPeriod("day")}>day</span>
        <span class:selected={period === "week"} on:click={() => changeSortPeriod("week")}
          >week</span
        >
        <span class:selected={period === "all time"} on:click={() => changeSortPeriod("all time")}
          >all time</span
        >
      </div>
    </div>
  </slot>
</ShowcaseContainer>

<style lang="scss">
  .droppable {
    --opacity: 0.25;
    position: relative;
    display: flex;
    border: 2px dashed hsla(#{$hsl}, var(--opacity));
    background-color: var(--foreground-color);
    padding: 1em 0.5em;
    // padding-right: 1.4em;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1em;
    width: 150px;
    text-align: right;

    .label {
      opacity: 0.8;
    }

    .pick {
      display: none;
      flex-direction: column;
      background-color: #fff;
      color: #000e;
      z-index: 9;
    }

    &:active,
    &:focus,
    &:hover {
      outline: none;
      --opacity: 0.6;

      .label {
        opacity: 1;
      }
    }

    &:focus {
      .pick {
        display: flex;
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;

        em {
          text-align: center;
          padding: 1em;
          font-weight: 700;
          cursor: auto;
        }

        span {
          display: block;
          padding: 1em;

          &:hover {
            background-color: hsla(#{$hsl}, 0.2);
          }

          &.selected,
          &:active {
            background-color: hsla(#{$hsl}, 1);
            font-weight: 700;
            color: #fff;
          }
        }
      }
    }
  }
</style>
