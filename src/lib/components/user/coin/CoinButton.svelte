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

  $: lastCoinAcquired =
    new Date($lastTimeCoinAcquired).getTime() - (new Date().getTimezoneOffset() / 60) * 36e5; // convert timezone offset
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
    }
  }
</style>
