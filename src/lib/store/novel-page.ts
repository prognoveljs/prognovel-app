import { derived, Readable, Writable, writable, get as getStore } from "svelte/store";
import { currentNovel, novelsData, siteMetadata, showSettings } from "./states";
import { showTOC } from "./read-page/state";
import { createDerivedNovelsMetadata } from "$lib/utils/novel-page";
// export let revenueSharing = writable([]);
export let genreFilter: Writable<string[]> = writable([]);
export let entireSiteGenres: Readable<string[]> = derived([siteMetadata], ([metadata]) => {
  if (!metadata?.novelsMetadata) return [];
  return [
    ...new Set(
      ...metadata?.novelsMetadata.map((novel) => {
        return novel.genre as string[];
      }),
    ),
  ];
});

export let discordGroupId: Readable<string> = derived(
  [novelsData, currentNovel],
  ([metadata, novel]) => {
    return metadata?.[novel]?.discord_group_id || metadata?.[novel]?.discord_group_id !== "null"
      ? metadata?.[novel]?.discord_group_id
      : "";
  },
);

export const FORBIDDEN_NOVEL_ID = ["all"];

export const showRevshareStats: Writable<boolean> = writable(false);
export const showAffiliateReferrer: Writable<boolean> = writable(false);
export const showDownload: Writable<boolean> = writable(false);

export const liteNovelsMetadata: Readable<any> = derived(siteMetadata, ($meta: SiteMetadata) => {
  return createDerivedNovelsMetadata($meta);
});

const novelPageState = [
  showTOC,
  showAffiliateReferrer,
  showRevshareStats,
  showSettings,
  showDownload,
];
export function showNovelPageWindow(state: any): void {
  novelPageState
    .filter((s) => s !== state)
    .forEach((show) => {
      show.set(false);
    });
  state.set(!Boolean(getStore(state)));

  // test
}
