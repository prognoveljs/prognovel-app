import { browser } from "$app/environment";
import { get as getStore, Writable, writable } from "svelte/store";
import { userData } from "$lib/store/user";
import type { User } from "$typings/user";
import { backend } from "../backend";

export const coin = createCoin();
export const lastTimeCoinAcquired: Writable<DOMHighResTimeStamp> = writable(Date.now());
export const coinGetDelay: Writable<number> = writable(0);

if (browser) {
  userData.subscribe((u: User) => {
    if (u?.user?.id && u?.user?.id !== coin.userId) {
      coin.userId = u?.user?.id;
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
      console.log({ coinData: data });
      lastTimeCoinAcquired.set(data?.last_time_acquired);
      coinGetDelay.set(data?.delay);
      set(data?.amount);
    },
    async fetchValue() {
      try {
        const data = await getStore(backend).send(
          "/api/fetch-coin/" + getStore(userData)?.user?.id,
          {},
        );
        this.setter(data);
      } catch (error) {
        console.error("Coin error:", error);
      }
    },
    async getCoin() {
      const data = await getStore(backend).send(
        "/api/get-coin/" + getStore(userData)?.user?.id,
        {},
      );
      this.setter(data);
    },
    // set() {},
  };
}
