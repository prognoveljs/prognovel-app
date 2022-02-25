import path from "path";
import fs from "fs";

export const PUBLISH_FOLDER = path.resolve("static/");
// export const SAPPER_EXPORT_FOLDER = path.resolve("__sapper__/export/");
export const CACHE_FOLDER = path.resolve(".cache/");

export function checkCacheFolderExist() {
  if (!fs.existsSync(CACHE_FOLDER)) fs.mkdir(CACHE_FOLDER);
}
