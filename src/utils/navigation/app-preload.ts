import { siteMetadata } from "store/states";
import { prefetch } from "@sapper/app";
import type { SiteMetadata } from "typings";

const PRELOAD_NOVELS = 3; // prefetch first 3 novel found in metadata

// TODO- wait for connection idle
siteMetadata.subscribe(($metadata: SiteMetadata) => {
  if (($metadata?.novels ?? []).length) {
    sliceNovelList($metadata.novels).forEach((novel: string) => prefetch(novel));
    return () => {
      console.log("");
    };
  }
});

function sliceNovelList(novels: string[]): string[] {
  return novels.slice(0, PRELOAD_NOVELS - 1).map((novel: string) => `/novel/${novel}`);
}
