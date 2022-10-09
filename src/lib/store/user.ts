import {
  derived,
  get as getStore,
  Readable,
  Subscriber,
  Unsubscriber,
  writable,
  Writable,
} from "svelte/store";
import type { User, UserProfile } from "$typings/user";
import { getPocketBaseAvatar } from "$lib/utils/users/avatar";
import { backend } from "./backend";
import { browser } from "$app/environment";

export const userData: Writable<User | null> = writable(null);
export const avatarUrl: Readable<string | null> = derived([userData], ([$userData]) => {
  let avatar = $userData?.user?.profile?.avatar;
  if (avatar) {
    return getPocketBaseAvatar($userData?.user?.profile);
  }

  return $userData?.meta?.avatarUrl;
});

export const profile: Readable<UserProfile | null> = derived([userData], ([$userData]) => {
  return $userData?.user?.profile;
});

export const coin = createCoin();

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
      this.lastTimeAcquired = data?.last_time_acquired;
      this.delay = data?.delay;
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
