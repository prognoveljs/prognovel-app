import { browser } from "$app/environment";
import { get as getStore, Writable, writable } from "svelte/store";
import { profile, userData } from "$lib/store/user";
import type { User } from "$typings/user";
import { backend } from "../backend";
import { UserProfile } from "carbon-icons-svelte";

export const coin = createCoin();
export const lastTimeCoinAcquired: Writable<DOMHighResTimeStamp> = writable(Date.now());
export const coinGetDelay: Writable<number> = writable(0);

if (browser) {
  profile.subscribe(($profile) => {
    if ($profile?.id && $profile?.id !== coin.userId) {
      coin.userId = $profile?.id;
      coin.fetchValue();
    }
  });
}

export function createCoin() {
  const { subscribe, set } = writable(0);

  return {
    userId: undefined,
    lastTimeAcquired: null,
    delay: null,
    subscribe,
    setter(data) {
      lastTimeCoinAcquired.set(data?.last_time_acquired);
      coinGetDelay.set(data?.delay);
      set(data?.amount);
    },
    async fetchValue() {
      try {
        const data = await getStore(backend).send("/api/fetch-coin/" + getStore(profile)?.id, {});
        this.setter(data);
      } catch (error) {
        console.error("Coin error:", error);
      }
    },
    async getCoin() {
      const data = await getStore(backend).send("/api/get-coin/" + getStore(profile)?.id, {});
      this.setter(data);
    },
    // set() {},
  };
}
