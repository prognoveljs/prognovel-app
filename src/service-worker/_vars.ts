import { version, files, build } from "$service-worker";
import { validInstallAssets, validAssets } from "./_validity";

export const ASSETS: string = `prognovel${version}`;
const routesToCache: string[] = [
  "/",
  "/explore/",
  "/offline-mode/",
  "/bookmark/",
  "/help/",
  "/read/",
  "/novel/",
];

export const SW_HOST: string = "";
export const cachedRoutes = routesToCache.concat(
  (import.meta.env.NOVEL_LIST || []).map((novel) => `/novel/${novel}/`).filter((f) => !!f),
);
const cachedFiles = build.concat(files).concat(cachedRoutes);

let filesCache: string[];
export const cacheFileFiltered = (): string[] => {
  return filesCache || (filesCache = cachedFiles.filter(validAssets).filter(validInstallAssets));
};

export const assets = {
  name: ASSETS,
  cache: {
    files: (): string[] => {
      return cacheFileFiltered().map((asset) => SW_HOST + asset);
    },
    fonts: (): string[] => {
      return cachedFiles.filter((value) => {
        return value.includes("/fonts/");
      });
    },
  },
};

export const preload = {
  home: (): string[] => {
    return build.filter((value) => value.includes("home"));
  },
};
