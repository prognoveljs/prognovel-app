import { backend } from "$lib/store/backend";
import { get } from "svelte/store";

let loadNovelQueue: string[] = [];
let timer = null;
export async function loadNovelStats(id: string) {
  loadNovelQueue.push(id);
  if (!timer) timer = setTimeout(fetchStatsData, 50);
}

async function fetchStatsData() {
  get(backend);
}
