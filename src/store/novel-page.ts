import { derived, Readable, Writable, writable } from "svelte/store";
import { currentNovel, novelsData, siteMetadata } from "./states";

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
    return metadata?.[novel]?.discord_group_id || "";
  },
);

export const FORBIDDEN_NOVEL_ID = ["all"];

export const showRevshareStats: Writable<boolean> = writable(false);
export const showAffiliateReferrer: Writable<boolean> = writable(false);
export const showDownload: Writable<boolean> = writable(false);
