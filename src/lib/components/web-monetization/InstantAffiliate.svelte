<script lang="ts">
  import Modal from "$lib/components/Modal.svelte";

  import { showAffiliateReferrer } from "$lib/store/novel-page";
  import { fade } from "svelte/transition";
  import { isMobileScreen } from "$lib/utils/mobile";

  import { generateAffiliateLink } from "$lib/utils/web-monetization/affiliate-link";
  import { windowLock, windowUnlock } from "$lib/utils/window/lock";
  import InstantAffiliateModal from "./InstantAffiliateModal.svelte";
  import { browser } from "$app/environment";

  export let title = "";
  let body;
  let label = "Generate your affiliate link";

  let generatedLink = "";

  function createAffiliateLink() {
    if (!browser) return;
    generatedLink = generateAffiliateLink(
      (document.getElementById("generate-link-input") as HTMLInputElement).value,
    );
  }

  showAffiliateReferrer.subscribe((show) => {
    if (!show) generatedLink = "";
    if (!browser) return;
    if (show) {
      windowLock(body);
    } else {
      windowUnlock();
    }
  });
</script>

{#if $showAffiliateReferrer}
  <div
    in:fade={{ duration: 400 }}
    out:fade={{ duration: 150 }}
    class="overlay"
    on:click={() => ($showAffiliateReferrer = false)}
  />
{/if}

<article bind:this={body} id="instant-affiliate-link" class:show={$showAffiliateReferrer}>
  <div>
    <img src="/img/svg/laptop.svg" width="100%" height="auto" alt="Instant affiliate link." />
  </div>
  <section>
    <h3>Instant affiliate link</h3>
    <p>
      Promote
      <strong>{title}</strong>
      and enjoy ~10% of Coil subscription revenue from paying visitors you bring.
      <em>No sign-up or paperwork required.</em>
    </p>
    <div class="referrer-generator">
      <input
        id="generate-link-input"
        autocomplete="off"
        type="text"
        placeholder="Enter your Interledger payment pointer address"
      />
      <button on:click={createAffiliateLink}>{label}</button>
    </div>
  </section>
  {#if isMobileScreen()}
    <InstantAffiliateModal show={Boolean(generatedLink)} link={generatedLink} />
  {/if}
</article>
{#if !isMobileScreen()}
  <!-- content here -->
  <Modal showModal={Boolean(generatedLink)} on:close={() => (generatedLink = "")}>
    <InstantAffiliateModal link={generatedLink} />
  </Modal>
{/if}

<style lang="scss">
  article {
    --padding: 24px;
    --width: 1000px;
    width: var(--width);
    margin: 0 auto;
    margin-bottom: 128px;
    padding: var(--padding, 24px);
    background-color: var(--foreground-color);
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 128px;
    border-radius: 8px;

    @include screen("tablet") {
      --width: clamp(80vw, 850px, 1000px);
    }
    @include screen("small-tablet") {
      --width: clamp(750px, 850px, 80vw);
      // padding: 80vw;
    }

    img {
      transform: scale(1.8);
    }

    section {
      --bold-color: hsl(#{$h}, #{$s}, var(--color-light));
      --color-light: 72%;

      strong {
        color: var(--bold-color);
      }

      em {
        font-weight: 300;
      }
    }

    :global(html.light) & {
      box-shadow: 0 12px 24px #0002;

      .referrer-generator > button {
        background: hsl($h, $s, 38%);
        filter: none;
      }
    }

    .referrer-generator {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr auto;
      grid-gap: 8px;

      input[type="text"] {
        padding: 6px;
      }

      button {
        $padding: 18px;
        font-family: inherit;
        padding: {
          left: $padding;
          right: $padding;
        }
        border-radius: 2px;
        background: hsl($h, $s, 42%);
        color: #fffd;
        border: none;
        user-select: none;

        &:not([disabled]) {
          cursor: pointer;
        }

        &:focus {
          outline: none;
        }
      }
      // button[disabled] {
      //   filter: grayscale(46%);
      // }
    }

    @include screen("mobile") {
      @include mobile-modal();
      grid-template-columns: 1fr;
      grid-template-rows: 150px 1fr;
      grid-gap: 2em;
      padding-bottom: 1.5em;
      margin-bottom: 0;
      overflow-y: scroll;

      section {
        background-color: var(--foreground-color);
        position: relative;
        margin: {
          left: -0.75em;
          right: -0.75em;
          top: -1em;
        }
        padding: {
          left: 0.75em;
          right: 0.75em;
          top: 0.5em;
        }

        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 72px;
          width: 100%;
          transform: translateY(-100%);
          background: linear-gradient(
            to top,
            var(--foreground-color),
            var(--foreground-color-alpha)
          );
        }
      }

      img {
        height: 100%;
        width: auto;
        margin: -2em auto 0;
        z-index: -1;
      }

      input {
        display: block;
      }

      .referrer-generator {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
      }
    }
  }

  .overlay {
    @include overlay();
  }
</style>
