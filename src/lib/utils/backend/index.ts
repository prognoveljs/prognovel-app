import { browser } from "$app/environment";
import { backend } from "$lib/store/backend";
import { loadUserFromCookies } from "./user";
// import { writable, Writable, get as getStore } from "svelte/store";
// import Surreal from "pocketbase";

export let backendReady = new Promise(() => {});
const URL: string = import.meta.env.POCKETBASE_URL;
const db_url = URL.endsWith("/") ? URL.slice(-1) : URL;
const HAS_DB_ENV = browser && db_url;

export let PocketBase;
let pbModule;

export async function connectDatabase() {
  if (!HAS_DB_ENV) return;
  pbModule = await import("pocketbase");
  PocketBase = pbModule.default as Client;
  backend.set(new PocketBase("http://127.0.0.1:8090"));
  backendReady = Promise.resolve("");
  console.log("Finish connecting to database.");
  loadUserFromCookies();
}

export { refreshUser } from "./user";
