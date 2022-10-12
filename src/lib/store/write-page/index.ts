import { writable, Writable } from "svelte/store";

export const volumeRefreshKey: Writable<number> = writable(1);
