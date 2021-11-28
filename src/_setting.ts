/**
 *  Import this module with shorthand "settings"
 *  For example:
 *
 *      import { SITE_TITLE } from "settings"
 *
 */

// novel settings
export const NOVEL_COVER_WIDTH = 250;
export const NOVEL_COVER_HEIGHT = 250;
// -- other versions book cover
export const NOVEL_COVER_THUMBNAIL_RATIO = 0.75;
export const NOVEL_COVER_THUMBNAIL_WIDTH = NOVEL_COVER_WIDTH * NOVEL_COVER_THUMBNAIL_RATIO;
export const NOVEL_COVER_THUMBNAIL_HEIGHT = NOVEL_COVER_HEIGHT * NOVEL_COVER_THUMBNAIL_RATIO;

// novel banner
export const NOVEL_BANNER_HEIGHT = 350;
// misc...
export const preload = true; // is obselette and not working
export const SITE_TITLE = parse(process.env.SITE_TITLE) || "A ProgNovel App";
export const SITE_SUBTITLE = parse(process.env.SITE_SUBTITLE) || "";
export const SITE_SUBTITLE2 = parse(process.env.SITE_SUBTITLE2) || "";
export const SITE_DESCRIPTION = parse(process.env.SITE_DESCRIPTION) || "";

export const BACKEND_API =
  parse(process.env.BACKEND_API) || "https://api-v2.prognovel.workers.dev/";
export const WEB_MONETIZATION_VERIFY: boolean | undefined =
  parse(process.env.WEB_MONETIZATION_VERIFY, false) || false;
export const CONTENT_CDN_ENDPOINT =
  parse(process.env.CONTENT_CDN_ENDPOINT) || "https://cdn.jsdelivr.net/gh";
export const GITHUB_USER = parse(process.env.GITHUB_USER) || "prognovel";
export const GITHUB_SITE = parse(process.env.GITHUB_SITE) || "prognovel.wordpress.com";
export const WORKING_REPO = parse(process.env.WORKING_REPO) || "prognovel-contents";

/** Parsing process.env variable safely. Set true for string variables. */
function parse(env, isString = true): any {
  let parsed;

  if (isString) return env;

  try {
    parsed = JSON.parse(env);
  } catch (error) {
    console.error("Error parsing env.", { env: JSON.stringify(env) });
  }

  return parsed;
}
