import { writable, Writable } from "svelte/store";

export const activeNovels: Writable<string[]> = writable([]);
