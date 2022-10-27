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
export const NOVEL_COVER_ASPECT_RATIO = NOVEL_COVER_WIDTH / NOVEL_COVER_HEIGHT;

// novel banner
export const NOVEL_BANNER_HEIGHT = 350;

export const WEB_MONETIZATION_VERIFY: boolean | undefined =
  import.meta.env.WEB_MONETIZATION_VERIFY || false;
export const IMAGE_RESIZER_SERVICE: string = import.meta.env.IMAGE_RESIZER_SERVICE;
export const SITE_TITLE: string = import.meta.env.SITE_TITLE;
export const STATIC_SITE_METADATA = import.meta.env.SITE_METADATA;
export const IS_BACKEND_POCKETBASE: boolean = !!import.meta.env.POCKETBASE_URL;
