<script lang="ts">
  import { browser } from "$app/environment";
  import { profile } from "$lib/store/user";
  import { coin, coinGetDelay, lastTimeCoinAcquired } from "$lib/store/user-data/coin";
  import { Button } from "carbon-components-svelte";
  import { ClockIcon } from "svelte-feather-icons";

  async function getDailyCoin() {
    forceDisableCoinButton = true;
    coin.getCoin();
  }

  // $: lastCoinAcquired =
  //   new Date($lastTimeCoinAcquired).getTime() - (new Date().getTimezoneOffset() / 60) * 36e5; // convert timezone offset
  $: lastCoinAcquired = new Date($lastTimeCoinAcquired).getTime();
  let dateNow = Date.now();
  $: lastCoinTimeDifference = Math.abs(dateNow - lastCoinAcquired) / 36e5;
  $: remainingTime = $coinGetDelay - lastCoinTimeDifference;
  $: disabledCoinButton = remainingTime > 0;
  let forceDisableCoinButton = false;

  $: console.log($profile);

  $: getLabel = disabledCoinButton ? remainingTime.toFixed(2) + " hr" : "Get more";

  if (browser) {
    setInterval(() => {
      dateNow = Date.now();
    }, 1000);
  }

  // $: console.log({
  //   user: $user,
  //   disabledCoinButton,
  //   now: new Date(Date.now()),
  //   last: new Date(lastCoinAcquired),
  //   difference: Math.abs(dateNow - lastCoinAcquired) / 36e5,
  // });
</script>

<section>
  <Button
    size="small"
    on:click={getDailyCoin}
    disabled={disabledCoinButton || forceDisableCoinButton}
    class="btn"
  >
    {#if remainingTime > 0}
      <ClockIcon size="18" class="clock" />
    {/if}
    {getLabel}</Button
  >
</section>

<style lang="scss">
  section {
    :global {
      .clock {
        margin-right: 4px;
      }

      .bx--btn {
        padding: 0.25em 1em;
        padding-right: 1em !important;
        background: #f0932b;
        color: #000a !important;
        font-weight: 700;
        transition: box-shadow 0.25s ease-in-out;
        box-shadow: 0px 0.6px 0.9px -4px rgba(0, 0, 0, 0.028),
          0px 1.5px 2.1px -4px rgba(0, 0, 0, 0.04), 0px 2.9px 4px -4px rgba(0, 0, 0, 0.05),
          0px 5.1px 7.1px -4px rgba(0, 0, 0, 0.06), 0px 9.6px 13.4px -4px rgba(0, 0, 0, 0.072),
          0px 23px 32px -4px rgba(0, 0, 0, 0.1);

        &:hover {
          filter: brightness(105%);
          box-shadow: 0px 0.4px 0.9px -4px rgba(0, 0, 0, 0.02),
            0px 0.9px 2.1px -4px rgba(0, 0, 0, 0.028), 0px 1.8px 4px -4px rgba(0, 0, 0, 0.035),
            0px 3.1px 7.1px -4px rgba(0, 0, 0, 0.042), 0px 5.8px 13.4px -4px rgba(0, 0, 0, 0.05),
            0px 14px 32px -4px rgba(0, 0, 0, 0.07);
        }
      }

      .bx--btn:disabled {
        background: #f0932b;
        color: #333b !important;
        border: none;
        filter: brightness(73%) saturate(34%);
        opacity: 0.85;
      }
    }
  }
</style>
