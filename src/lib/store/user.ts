import {
  derived,
  get as getStore,
  Readable,
  Subscriber,
  Unsubscriber,
  writable,
  Writable,
} from "svelte/store";
import type { User, UserData } from "$typings/user";
import { getPocketBaseAvatar } from "$lib/utils/users/avatar";

export const userData: Writable<User | null> = writable(null);
export const avatarUrl: Readable<string | null> = derived([userData], ([$userData]) => {
  let avatar = $userData?.record?.avatar;
  if (avatar) {
    return getPocketBaseAvatar($userData?.record);
  }

  return $userData?.meta?.avatarUrl;
});

export const profile: Readable<UserData | null> = derived([userData], ([$userData]) => {
  return $userData?.record;
});
