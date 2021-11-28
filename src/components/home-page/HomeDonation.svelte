<script>
  import PopUp from "./HomeDonationPopUp.svelte";
  import Icon from "components/Icon.svelte";
  import { donation } from "./_donation.js";
  import { onMount } from "svelte";

  let showDonation = false;
  export let grid;

  const DONATION_ENDPOINT = "https://donation.prognovel.workers.dev";

  onMount(async () => {
    //   const res = await fetch(DONATION_ENDPOINT);
    //   const getDonation = await res.json();
  });
</script>

<figure class="donation" style="grid-area: {grid}">
  <figcaption>
    <!-- <Icon
      style="margin-right: 0;"
      icon={faGem}
      color={'var(--primary-color)'}
      size={'0.95em'} /> -->
    Support dev!
  </figcaption>
  <div class="donation-goal-desc">our current goal:</div>
  <div class="donation-goal">
    ${$donation} /
    <span>$1000</span>
  </div>
  <div class="action">
    <div class="desc">Pledge to make better webnovels.</div>
    <button on:click={() => (showDonation = true)}>Donate now!</button>
  </div>
</figure>

<PopUp {showDonation} on:click={() => (showDonation = false)} />

<style>
  figure {
    margin: 0;
    background-color: var(--foreground-color);
    padding: 12px 16px;
    box-shadow: 0 4px 12px #0002;
    flex: 3;
    box-sizing: border-box;
  }
  figcaption {
    font-weight: 700;
    font-size: 1.5rem;
    margin-bottom: 24px;
  }

  .donation {
    position: relative;
    flex: 1;
    width: 100%;
    height: auto;
    background-color: var(--foreground-color);
    box-shadow: 0 4px 12px #0002;
  }

  .donation-goal-desc {
    margin-left: -30px;
    text-align: center;
    font-size: 0.925rem;
    opacity: 0.72;
  }

  .donation-goal {
    text-align: center;
    font-size: 1.5rem;
    color: hsl(var(--primary-color-h), var(--primary-color-s), 60%);
    text-shadow: 1.5px 1.5px 0 #0003;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 1.25px;
    word-spacing: -5px;
    margin-top: 6px;
  }

  .donation-goal span {
    font-size: 95%;
  }

  .donation .action {
    margin-top: 12px;
    display: flex;
    flex-direction: column;
  }
  .donation .action .desc {
    opacity: 0.85;
    font-size: 0.85rem;
    padding-bottom: 42px;
    font-style: italic;
    text-align: center;
    max-width: 140px;
    margin: 0 auto;
  }
  .action button {
    position: absolute;
    bottom: 12px;
    right: 12px;
    padding: 3px 8px;
    border-radius: 2px;
    border: 1px solid var(--primary-color);
    background: hsl(var(--primary-color-h), var(--primary-color-s), 40%);
    color: rgba(255, 255, 255, 0.933);
    text-decoration: none;
    font-weight: 500;
    user-select: none;
    cursor: pointer;
  }
</style>
