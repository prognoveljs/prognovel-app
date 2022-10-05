import { Writable, writable } from "svelte/store";

export let novelIndex: Writable<number> = writable(1);
