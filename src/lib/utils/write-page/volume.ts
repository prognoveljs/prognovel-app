import { volumeRefreshKey } from "$lib/store/write-page";

export function refreshVolumeChapterList() {
  volumeRefreshKey.update((i) => ++i);
}
