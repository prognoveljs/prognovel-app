import { getLocalNovelMetadataCache, fetchNovelMetadata } from "$lib/utils/fetch-metadata";
import { prefetchBannerImage } from "$lib/utils/images";
import { browser } from "$app/environment";
import { error } from "@sveltejs/kit";

export const prerender = true;

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params, fetch }) {
  const { novel } = params;
  let novelMetadata: any = {};
  let status = 200;
  let message = "";
  try {
    const res = await fetch(`/novel/${novel}.json`);
    novelMetadata = await res.json();
  } catch (error) {
    status = 500;
    message = "Error when reading " + novel + " metadata from build cache.";
    console.error(error);
  }

  if (browser) {
    prefetchBannerImage(novel);
    novelMetadata = await getLocalNovelMetadataCache(novel);

    if (!novelMetadata) {
      novelMetadata = await fetchNovelMetadata(novel);
    }
  }

  if (status === 200) {
    return { novelMetadata, novel };
  }

  throw error(status, message);
}
