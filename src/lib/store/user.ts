import { derived, Readable, writable, Writable } from "svelte/store";
import type { User } from "$typings/user";

export const user: Writable<User | null> = writable(null);
export const avatarUrl: Readable<string | null> = derived([user], ([$user]) => {
  console.log($user);
  return $user?.user?.profile?.avatar || $user?.meta?.avatarUrl;
});
