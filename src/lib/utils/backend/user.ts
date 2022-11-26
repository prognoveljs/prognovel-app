import { browser } from "$app/environment";
import { profile, userData } from "$lib/store/user";
import Cookies from "js-cookie";
import { get as getStore } from "svelte/store";
import { backend } from "$lib/store/backend";
import type { User, UserData } from "$typings/user";

export async function refreshUser(): Promise<User> {
  const newUserData = (await getStore(backend)
    .collection("users")
    .authRefresh()) as unknown as User;
  userData.set(newUserData);

  return newUserData;
}

export async function updateProfile(
  profileData: UserData | any,
  updateDatabase: boolean = false,
): Promise<void> {
  let result;
  const $profile = getStore(profile);
  if (updateDatabase) {
    result = await getStore(backend).collection("users").update($profile?.id, profileData);
  }

  userData.update(($userData: User) => {
    $userData.record = result || profileData;
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

    if ($userData?.record && $userData?.record?.username === undefined) {
      const newData: unknown = await getStore(backend).collection("users").authRefresh();
      updateProfile((newData as User).record);
    }

    if ($userData?.record) {
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
