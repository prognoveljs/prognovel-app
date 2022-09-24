import { derived, get as getStore, Readable, writable, Writable } from "svelte/store";
import { browser } from "$app/environment";
import type { User, UserProfile } from "$typings/user";
import { backend, updateProfile } from "$lib/utils/backend";

export const user: Writable<User | null> = writable(null);
export const avatarUrl: Readable<string | null> = derived([user], ([$user]) => {
  return $user?.user?.profile?.avatar || $user?.meta?.avatarUrl;
});
export const profile: Readable<UserProfile | null> = derived([user], ([$user]) => {
  return $user?.user?.profile;
});
