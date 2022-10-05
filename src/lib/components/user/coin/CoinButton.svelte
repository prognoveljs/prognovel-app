<script lang="ts">
  import { browser } from "$app/environment";
  import { profile, userData } from "$lib/store/user";
  import { refreshUser } from "$lib/utils/backend";
  import { tick } from "svelte";
  import { Button } from "carbon-components-svelte";
  import type { UserProfile } from "$typings/user";
  import { backend } from "$lib/store/backend";
  import { ClockIcon } from "svelte-feather-icons";

  // $: profile = ($user?.user?.profile || {}) as UserProfile;
  // $: profileId = profile?.id;
  async function getDailyCoin() {
    forceDisableCoinButton = true;
    await refreshUser();
    await tick();
    // if (!$profile.id) return;
    const result: unknown = await $backend.send("/api/get-coin/" + $userData.user.id, {});
    console.log(result);

    // const result: unknown = await $backend.records.update("profiles", $profile.id, {
    //   coin: ($profile.coin || 0) + 40,
    //   lastTimeCoinAcquired: new Date(),
    // });

    userData.update((u) => {
      u.user.profile = result as UserProfile;
      return u;
    });
  }

  $: lastCoinAcquired =
    new Date($profile?.lastTimeCoinAcquired).getTime() -
    (new Date().getTimezoneOffset() / 60) * 36e5; // convert timezone offset
  let dateNow = Date.now();
  $: lastCoinTimeDifference = Math.abs(dateNow - lastCoinAcquired) / 36e5;
  $: remainingTime = $profile.coinGetDelay - lastCoinTimeDifference;
  $: disabledCoinButton = remainingTime > 0;
  let forceDisableCoinButton = false;

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
