import { timestamp, files, shell, routes } from "@sapper/service-worker";
//@ts-ignore
import { validAssets } from "./utils";
//@ts-ignore
// import siteMetadata from "cache/sitemetadata.json";

export const ASSETS: string = `prognovel${timestamp}`;
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
export const cachedRoutes = routesToCache.concat(NOVEL_LIST.map((novel) => `/novel/${novel}/`));
const cachedFiles = shell.concat(files).concat(cachedRoutes);

let filesCache: string[];
export const cacheFileFiltered = (): string[] => {
  return filesCache || (filesCache = cachedFiles.filter(validAssets));
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
    return shell.filter((value) => value.includes("home"));
  },
};
