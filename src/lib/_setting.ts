/**
 *  Import this module with shorthand "settings"
 *  For example:
 *
 *      import { SITE_TITLE } from "$lib/_setting.ts"
 *
 */

// novel settings
export const NOVEL_COVER_WIDTH = 250;
export const NOVEL_COVER_HEIGHT = 250;

// novel banner
export const NOVEL_BANNER_HEIGHT = 350;

export const SITE_TITLE = parse(import.meta.env.SITE_TITLE) || "A ProgNovel App";

export const BACKEND_API =
  parse(import.meta.env.BACKEND_API) || "https://api-v2.prognovel.workers.dev/";
export const IMAGE_RESIZER_SERVICE = parse(import.meta.env.IMAGE_RESIZER_SERVICE) || "";
export const WEB_MONETIZATION_VERIFY: boolean | undefined =
  parse(import.meta.env.WEB_MONETIZATION_VERIFY, false) || false;

/** Parsing process.env variable safely. Set true for string variables. */
function parse(env, isString = true): any {
  let parsed;

  if (isString) return env;

  try {
    parsed = JSON.parse(env);
  } catch (error) {
    // console.error("Error parsing env.", { env: JSON.stringify(env) });
  }

  return parsed;
}
