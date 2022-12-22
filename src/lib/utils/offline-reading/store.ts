import { writable, get } from "svelte/store";

export const downloadProgress = writable(undefined);
export const downloadCount = writable(undefined);
export const downloadErrors = writable({});
export const downloadNovel = writable("");

export function clearDownload(clearError = false) {
  downloadProgress.set(undefined);
  downloadCount.set(undefined);
  downloadNovel.set("");
  if (clearError) downloadErrors.set([]);
}

downloadProgress.subscribe(() => {
  const progress = get(downloadProgress);
  const count = get(downloadCount);

  if (progress >= count && progress !== undefined) {
  }
});
