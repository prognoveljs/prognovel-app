<script lang="ts">
  import { browser } from "$app/environment";
  import { profile, user } from "$lib/store/user";
  import { refreshUser } from "$lib/utils/backend";
  import { tick } from "svelte";
  import { Button } from "carbon-components-svelte";
  import type { UserProfile } from "$typings/user";
  import { backend } from "$lib/store/backend";

  // $: profile = ($user?.user?.profile || {}) as UserProfile;
  // $: profileId = profile?.id;
  async function getDailyCoin() {
    forceDisableCoinButton = true;
    await refreshUser();
    await tick();
    // if (!$profile.id) return;
    const result: unknown = await $backend.records.update("profiles", $profile.id, {
      coin: ($profile.coin || 0) + 40,
      lastTimeCoinAcquired: new Date(),
    });
    user.update((u) => {
      u.user.profile = result as UserProfile;
      return u;
    });
  }

  $: lastCoinAcquired =
    new Date($profile?.lastTimeCoinAcquired).getTime() -
    (new Date().getTimezoneOffset() / 60) * 36e5; // convert timezone offset
  let dateNow = Date.now();
  $: lastCoinTimeDifference = Math.abs(dateNow - lastCoinAcquired) / 36e5;
  $: disabledCoinButton = lastCoinTimeDifference < 1;
  let forceDisableCoinButton = false;

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

<Button size="small" on:click={getDailyCoin} disabled={disabledCoinButton || forceDisableCoinButton}
  >Get more</Button
>
