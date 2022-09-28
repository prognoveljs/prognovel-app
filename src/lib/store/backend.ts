import { writable, Writable } from "svelte/store";
import type Client from "pocketbase";

export let backend: Writable<Client> = writable(null);
