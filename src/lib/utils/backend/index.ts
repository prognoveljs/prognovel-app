import { browser } from "$app/environment";
import { user } from "$lib/store/user";
import { User, UserProfile } from "$typings/user";
import type Client from "pocketbase";
import { writable, Writable, get as getStore } from "svelte/store";
// import Surreal from "pocketbase";

const URL: string = import.meta.env.POCKETBASE_URL;
const db_url = URL.endsWith("/") ? URL.slice(-1) : URL;
const HAS_DB_ENV = browser && db_url;

export let backend: Writable<Client> = writable(null);
export let PocketBase;
let pbModule;

export async function connectDatabase() {
  console.log("db", URL);
  console.log("Trying to connect to database...", db_url);
  if (!HAS_DB_ENV) return;
  pbModule = await import("pocketbase");
  PocketBase = pbModule.default as Client;
  backend.set(new PocketBase("http://127.0.0.1:8090"));
  loadUserFromCookies();
}

export async function refreshUser(): Promise<User> {
  const newUserData = (await getStore(backend).users.refresh()) as unknown as User;
  user.set(newUserData);

  return newUserData;
}

export async function updateProfile(profileData: UserProfile): Promise<void> {
  user.update(($user: User) => {
    $user.user.profile = profileData;
    return $user;
  });
}

async function loadUserFromCookies() {
  const pb = getStore(backend);
  pb.authStore.loadFromCookie("pb_auth");
  const token = pb.authStore.token;
  // console.log({ token });
  const user = await pb.users.refresh();
  console.log(user);
}

user.subscribe(async ($user) => {
  if (!$user || !browser) return;

  if ($user?.user?.profile && $user?.user?.profile?.name === undefined) {
    const newData: unknown = await getStore(backend).users.refresh();
    updateProfile((newData as User).user.profile);
  }
});
