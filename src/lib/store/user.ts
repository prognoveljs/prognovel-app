import { derived, Readable, writable, Writable } from "svelte/store";
import type { User, UserProfile } from "$typings/user";
import { getPocketBaseAvatar } from "$lib/utils/users/avatar";

export const userData: Writable<User | null> = writable(null);
export const avatarUrl: Readable<string | null> = derived([userData], ([$userData]) => {
  let avatar = $userData?.user?.profile?.avatar;
  if (avatar) {
    return getPocketBaseAvatar($userData?.user?.profile?.id, avatar);
  }

  return $userData?.meta?.avatarUrl;
});

export const profile: Readable<UserProfile | null> = derived([userData], ([$userData]) => {
  return $userData?.user?.profile;
});
