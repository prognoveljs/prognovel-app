import { writable, Writable } from "svelte/store";

export const volumeRefreshKey: Writable<number> = writable(1);
export const postRefreshKey: Writable<number> = writable(1);

export function refreshPost() {
  postRefreshKey.update((i) => i++);
}
