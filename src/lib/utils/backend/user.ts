import { browser } from "$app/environment";
import { profile, userData } from "$lib/store/user";
import Cookies from "js-cookie";
import { get as getStore } from "svelte/store";
import { backend } from "$lib/store/backend";
import type { User, UserProfile } from "$typings/user";

export async function refreshUser(): Promise<User> {
  const newUserData = (await getStore(backend).users.refresh()) as unknown as User;
  userData.set(newUserData);

  console.log(getStore(userData));

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

  userData.update(($userData: User) => {
    $userData.user.profile = result || profileData;
    return $userData;
  });
}

export async function loadUserFromCookies() {
  const cookie = Cookies.get("pb_auth");
  const pb = getStore(backend);
  pb.authStore.loadFromCookie(`pb_auth=${cookie}`);
  await refreshUser();
}

if (browser) {
  userData.subscribe(async ($userData) => {
    if (!$userData || !browser) return;

    if ($userData?.user?.profile && $userData?.user?.profile?.name === undefined) {
      const newData: unknown = await getStore(backend).users.refresh();
      updateProfile((newData as User).user.profile);
    }

    if ($userData?.user?.profile) {
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
  userData.set(null);
}
