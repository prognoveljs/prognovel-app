import { writable, Writable } from "svelte/store";

export let childData: Writable<any> = writable({});
export const showIndex: Writable<boolean> = writable(false);
