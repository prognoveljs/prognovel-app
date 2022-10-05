import { derived, Readable, writable, Writable } from "svelte/store";
import type { User, UserProfile } from "$typings/user";

export const userData: Writable<User | null> = writable(null);
export const avatarUrl: Readable<string | null> = derived([userData], ([$userData]) => {
  let avatar = $userData?.user?.profile?.avatar;
  if (avatar) {
    const url = new URL(import.meta.env.POCKETBASE_URL);
    url.pathname = `/api/files/profiles/${$userData?.user?.profile?.id}/${avatar}`;

    return url.href;
  }

  return $userData?.meta?.avatarUrl;
});
export const profile: Readable<UserProfile | null> = derived([userData], ([$userData]) => {
  return $userData?.user?.profile;
});
