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
// TODO refactor this later and get from cache/sitemetadata.json
export const IPFS_USE_PREFIX: string = "%USE__IPFS%";

export const SW_HOST: string = "";
export const cachedRoutes = routesToCache.concat(NOVEL_LIST.map((novel) => `/novel/${novel}/`));
const cachedFiles = shell.concat(files).concat(cachedRoutes);

let filesCache: string[];
export const preIPFSfiles = (): string[] => {
  return filesCache || (filesCache = cachedFiles.filter(validAssets));
};

export const assets = {
  name: ASSETS,
  cache: {
    files: (): string[] => {
      return preIPFSfiles().map((asset) => SW_HOST + asset);
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
