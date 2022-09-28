import { browser } from "$app/environment";
import { profile, user } from "$lib/store/user";
import Cookies from "js-cookie";
import { get as getStore } from "svelte/store";
import { backend } from "$lib/store/backend";
import type { User, UserProfile } from "$typings/user";

export async function refreshUser(): Promise<User> {
  const newUserData = (await getStore(backend).users.refresh()) as unknown as User;
  user.set(newUserData);

  console.log(getStore(user));

  return newUserData;
}

export async function updateProfile(
  profileData: UserProfile | any,
  updateDatabase: boolean = false,
): Promise<void> {
  let result;
  const $profile = getStore(profile);
  if (updateDatabase) {
    result = await getStore(backend).records.update("profiles", $profile.id, profileData);
  }

  user.update(($user: User) => {
    $user.user.profile = result || profileData;
    return $user;
  });
}

export async function loadUserFromCookies() {
  const cookie = Cookies.get("pb_auth");
  const pb = getStore(backend);
  pb.authStore.loadFromCookie(`pb_auth=${cookie}`);
  await refreshUser();
}

if (browser) {
  user.subscribe(async ($user) => {
    if (!$user || !browser) return;

    if ($user?.user?.profile && $user?.user?.profile?.name === undefined) {
      const newData: unknown = await getStore(backend).users.refresh();
      updateProfile((newData as User).user.profile);
    }

    if ($user?.user?.profile) {
      const cookie = getStore(backend).authStore.exportToCookie();
      Cookies.set("pb_auth", cookie.split("=")[1]);
      // console.log({ cookie });
    }
  });
}

export function logoutUser() {
  const pb = getStore(backend);
  pb.authStore.clear();

  Cookies.remove("pb_auth");
  user.set(null);
}
