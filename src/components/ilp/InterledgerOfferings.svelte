<script lang="ts">
  import ButtonOpenPayments from "./ButtonOpenPayments.svelte";
  import Option from "./InterledgerOfferingsOption.svelte";
  import Modal from "components/Modal.svelte";
  import Icon from "components/Icon.svelte";
  import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
  import type { IlpOfferings } from "./ilp-offerings";

  export let title = "";
  export let background = "#fff";

  // DEVELOPMENT ONLY
  export let showComingSoonModal = false;

  let show = true;
  let currentOffer: IlpOfferings = {};
  $: containerDisplay = Object.keys(currentOffer).length ? 1 : 0;
  function pickOffer({ detail }) {
    currentOffer = detail as IlpOfferings;
  }

  $: hasTwoButtonsOrMore = currentOffer.price && currentOffer.iswebmonetization;
  $: buttonSize = hasTwoButtonsOrMore ? "13px" : "16px";
</script>

{#if show}
  <div class="ilp-container" style="opacity: {containerDisplay};">
    <article style="background: {background};">
      <strong>{title}</strong>
      <div class="close" on:click={() => (show = false)}>
        <Icon size="20px" icon={faTimesCircle} />
      </div>
      <section class="options">
        <Option on:picked={pickOffer} price="$0.29/week" selected iswebmonetization>+2 chapter</Option>
        <Option on:picked={pickOffer} price="$0.49/week">+4 chapter</Option>
        <Option on:picked={pickOffer} price="$0.59/week">+5 chapter</Option>
        <Option on:picked={pickOffer} price="$0.99/week">+7 chapter</Option>
      </section>
      <section class="pay-buttons">
        {#if currentOffer.price}
          <ButtonOpenPayments size={buttonSize} on:click={() => (showComingSoonModal = true)}>
            Pay{currentOffer.price ? " " + currentOffer.price : ""}
          </ButtonOpenPayments>
        {/if}
        {#if currentOffer.iswebmonetization}
          <ButtonOpenPayments
            size={buttonSize}
            theme="webmonetization"
            on:click={() => (showComingSoonModal = true)}
          >
            Subscribe to Coil
          </ButtonOpenPayments>
        {/if}
      </section>
    </article>
    <small
      >powered by
      <img src="/img/svg/open-payments/logomark.svg" width="18px" height="18px" alt="Open Payments" />
      Open Payments</small
    >
  </div>
  <Modal
    header="Interledger Payment is coming soon..."
    showModal={showComingSoonModal}
    on:close={() => {
      showComingSoonModal = false;
    }}
  >
    We're currently exploring the possibility of sending payments and micro-tippings through Interledger. In
    the meantime, please enjoy premium features with Web Monetization.
  </Modal>
{/if}

<style lang="scss">
  @font-face {
    font-family: Rubik;
    src: url("/fonts/Rubik-regular.woff2");
    font-weight: 400;
    font-display: swap;
  }
  .ilp-container {
    position: fixed;
    bottom: 12px;
    right: 12px;
    font-family: Rubik, sans-serif;
    z-index: 14;
  }

  article {
    position: relative;
    padding: 8px;
    align-items: center;
    border-radius: 4px;
    box-shadow: 0 12px 13px 52px #0001, 0 8px 16px 4px #0002;

    // width is temporary...
    width: 345px;

    section.options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 6px 12px;
      margin-bottom: 12px;
      margin-top: 12px;
    }

    section.pay-buttons {
      display: flex;
      :global(button) {
        flex-grow: 2;

        &:not(:first-child) {
          margin-left: 4px;
        }
      }
    }
  }
  small {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-top: 6px;

    img {
      margin: 0 4px;
    }
  }

  .close {
    position: absolute;
    top: 6px;
    right: 8px;
    border-radius: 50%;
    outline: none;
    opacity: 0.66;

    &:hover {
      opacity: 1;
    }
  }
</style>
