<script lang="ts">
  import { faClipboard } from "@fortawesome/free-solid-svg-icons";
  import Icon from "components/Icon.svelte";
  import { fly } from "svelte/transition";
  import { tick } from "svelte";

  export let show: boolean = false;
  export let rate: string = "10%";
  export let link: string = "";
  let copied: boolean = false;

  let linkElement;
  let hasClickedYet = false;
  let selectedTips = 0;
  let previousSelectedTips = 0;

  function copyLink() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
    } else {
      linkElement.select();
      document.execCommand("copy");
    }
    copied = true;
  }

  function clickTips(index: number) {
    hasClickedYet = true;
    selectedTips = index;
  }

  const transition = {
    In() {
      const isLeft = selectedTips < previousSelectedTips;
      return {
        x: isLeft ? 12 : -12,
        duration: 275,
        // easing: cubicIn,
      };
    },
    Out() {
      const isLeft = selectedTips < previousSelectedTips;
      return {
        x: isLeft ? -6 : 6,
        duration: 125,
        // easing: cubicOut,
      };
    },
  };

  $: if (selectedTips) {
    tick().then(() => {
      previousSelectedTips = selectedTips;
    });
  }

  function tipsSelected(el: HTMLElement) {
    const parent = el.parentElement;
    if (hasClickedYet) parent.style.transition = "height 0.32s ease-in-out";
    const height = el.clientHeight;
    parent.style.height = height + "px";
  }
</script>

<article class:show>
  <div class:copied>
    {#if copied}
      Your affiliate link has been copied to clipboard!
    {:else}
      Here's your affiliate link:
    {/if}
  </div>
  <div class="link">
    <!-- @ts-ignore -->
    <input bind:this={linkElement} onfocus="this.select();" type="text" value={link} readonly />
    <span on:click={copyLink}><Icon size="1em" icon={faClipboard} /></span>
  </div>

  <div class="tips">
    <div class="head">
      <!-- <Icon size="1.4em" paddingBottom="8px" icon={faLightbulb} /> -->
      💡 Tips
      <div>
        {#each Array(4).fill("") as _, index}
          <span class:selected={selectedTips === index} on:click={() => clickTips(index)} />
        {/each}
      </div>
    </div>
    <div class="body">
      {#if selectedTips === 0}
        <div
          class="tips-item"
          use:tipsSelected
          class:selected={selectedTips === 0}
          in:fly={transition.In()}
          out:fly={transition.Out()}
        >
          You will receive {rate} of revenue of Web Monetization subscribers clicking your affiliate
          link. Please note that you are not being paid by how much clicks you get, but instead the time
          spent by subscribers reading the novel you referred. It is recommended to promote good novels
          that you're confident people will follow through, and avoid annoying people with spam to maintain
          trust with fellow readers.
        </div>
      {:else if selectedTips === 1}
        <div
          class="tips-item"
          use:tipsSelected
          class:selected={selectedTips === 1}
          in:fly={transition.In()}
          out:fly={transition.Out()}
        >
          To get the most out of this affiliate link is to write book reviews you'd think people
          will happy reading. Dig hidden gems and start recommend them to fellow readers in the
          community!
        </div>
      {:else if selectedTips === 2}
        <div
          class="tips-item"
          use:tipsSelected
          class:selected={selectedTips === 2}
          in:fly={transition.In()}
          out:fly={transition.Out()}
        >
          The amount of money you'll get at first probably won't satisfy you, since likely there is
          very small of people who aware of the incoming web standard Web Monetization and even
          smaller of people who subscribe for it. <br /><br />But don't give up! There'a a beginning
          for everything - and you, yes you, are the very first people who will vanguard the likely
          shift of web economy with the birth of web standard Web Monetization, which in the future,
          will be a very serious contender of ads economy that currently sustains almost every
          corner of the web out there. And like every industry and community, those who spearhead
          the revolution will definitely be rewarded!
        </div>
      {:else if selectedTips === 3}
        <div
          class="tips-item"
          use:tipsSelected
          class:selected={selectedTips === 3}
          in:fly={transition.In()}
          out:fly={transition.Out()}
        >
          Now you're ready! What are you waiting for? Go promote the novel out there and good luck!
          👍👍👍
        </div>
      {/if}
    </div>
  </div>
</article>

<style lang="scss">
  $borderRadius: 4px;
  article {
    .link {
      display: flex;
      gap: 4px;
      margin-top: 0.6em;
      input {
        padding: 8px;
        border-radius: $borderRadius;
        width: 90%;
        overflow: hidden;
        text-overflow: clip;
        background-color: #999;
        border: 2px solid #555;
        font-family: "Courier New", Courier, monospace;
        font-weight: 700;
      }
      span {
        padding: 4px 12px;
        background-color: var(--primary-color);
        border-radius: $borderRadius;
        user-select: none;
        cursor: pointer;

        &:active {
          filter: contrast(90%);
        }
      }
    }

    .tips {
      position: relative;
      .head {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: {
          top: 1.25em;
          bottom: 1.2em;
        }
        font-weight: 700;
        color: hsla(#{$h}, #{$s}, 60%, 1);
        font-size: 1.4em;
        flex-direction: column;

        div {
          display: flex;
          // gap: 4px;
          margin-top: 0.25em;
          contain: layout;

          span {
            margin-right: 6px;
            $size: 8px;
            border-radius: $size / 2;
            width: $size;
            height: $size;
            background-color: var(--text-head-color);
            opacity: 0.6;
            display: inline-block;
            transition: width 0.3s ease-in-out;
            cursor: pointer;

            &.selected {
              opacity: 1;
              width: 2.5 * $size;
            }
          }
        }
      }

      .body {
        position: relative;
        will-change: height;

        .tips-item {
          position: absolute;
          top: 0;
          left: 0;
          // &.selected {
          //   position: relative !important;
          // }
        }
      }
    }

    @include screen("mobile") {
      $padding: 12px;
      position: absolute;
      top: $padding;
      left: 0;
      width: 100%;
      height: 100%;
      padding: $padding;
      transition: all 0.25s ease-in-out;
      opacity: 0;
      background: var(--foreground-color);
      pointer-events: none;

      &.show {
        pointer-events: visible;
        opacity: 1;
        transform: translateY(#{$padding * -1});
      }
    }
  }

  .copied {
    font-style: italic;
    font-weight: 300;
    color: var(--primary-color);
  }
</style>
