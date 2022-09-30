import { derived, Readable, writable, Writable } from "svelte/store";
import type { User, UserProfile } from "$typings/user";

export const user: Writable<User | null> = writable(null);
export const avatarUrl: Readable<string | null> = derived([user], ([$user]) => {
  let avatar = $user?.user?.profile?.avatar;
  if (avatar) {
    const url = new URL(import.meta.env.POCKETBASE_URL);
    url.pathname = `/api/files/profiles/${$user?.user?.profile?.id}/${avatar}`;

    return url.href;
  }

  return $user?.meta?.avatarUrl;
});
export const profile: Readable<UserProfile | null> = derived([user], ([$user]) => {
  return $user?.user?.profile;
});
