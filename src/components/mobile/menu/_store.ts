import { derived, Readable, writable, Writable } from "svelte/store";
import { path } from "store/states";
// import type { Page } from "@sapper/common";

// const { page } = stores() as { page: any };

// importing Sapper type too anoying
// visit this later
interface Page {
  host: string;
  path: string;
  params: Record<string, string>;
  query: Record<string, string | string[]>;
  error?: Error;
}

export const menuVariance: Readable<string> = derived([path], ([$path]: [string]) => {
  if (!$path) return MenuVariance.General;

  if ($path.startsWith("/read/")) return MenuVariance.ReadPage;
  if ($path.startsWith("/novel/")) return MenuVariance.NovelPage;

  return MenuVariance.General;
});

export const menuReadPageShow: Writable<boolean> = writable(true);

export const menuState: Readable<string> = derived(
  [menuVariance, menuReadPageShow],
  ([variance, readPageShow]) => {
    if (variance !== MenuVariance.ReadPage) return MenuState.Shown;

    // inside read page
    return readPageShow ? MenuState.Shown : MenuState.Hidden;
  },
);

export enum MenuVariance {
  General = "general",
  NovelPage = "novel-page",
  ReadPage = "read-page",
}

export enum MenuState {
  Shown = "shown",
  Hidden = "hidden",
  Loading = "loading",
  Error = "error",
}
