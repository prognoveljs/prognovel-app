<script>
  import { fly, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import Icon from "components/Icon.svelte";
  import { faPaypal } from "@fortawesome/free-brands-svg-icons";
  import { onMount } from "svelte";

  export let showDonation;
  onMount(async () => {
    // console.log("Opens donation pop-up.");
  });
</script>

{#if showDonation}
  <!-- content here -->
  <div class="blur" on:click in:fade={{ duration: 125 }} out:fade={{ duration: 425 }} />
  <div class="pop-up" in:fly={{ y: 8, duration: 300, easing: cubicOut }} out:fly={{ y: -4, duration: 200 }}>
    <div class="paypal">
      <Icon icon={faPaypal} size={"120px"} />
    </div>
    <a href="https://www.paypal.me/prognovel" target="_blank"> Donate to our Paypal Account </a>
  </div>
{/if}

<style>
  .pop-up {
    width: 400px;
    height: auto;
    padding: 24px;
    position: fixed;
    top: 128px;
    left: calc(50% - 200px);
    background: var(--foreground-color);
    box-shadow: 0 4px 16px #0008;
    z-index: 999999;
  }

  .blur {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999998;
    background: #000b;
  }

  .paypal {
    margin: 24px auto;
    height: 120px;
    width: 120px;
    display: block;
  }

  a {
    margin-top: 48px;
    text-align: center;
    font-weight: 500;
    color: hsl(var(--primary-color-h), var(--primary-color-s), 38%);
    background: #eee;
    padding: 8px 12px;
    border: 2.5px solid var(--primary-color);
    display: block;
    transition: transform 0.125s ease-in-out;
  }

  a:hover {
    background: var(--primary-color);
    color: #eee;
    box-shadow: 0 4px 18px #0006;
    transform: translateY(-1px);
  }

  a:active {
    transform: translateY(0);
  }
</style>
