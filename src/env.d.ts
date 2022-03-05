/// <reference types="vite/client" />

import type { SiteMetadata } from "$typings";

interface ImportMetaEnv {
  readonly BACKEND_API: string;
  readonly SITE_TITLE: string;
  readonly BASE_PATH: string;
  readonly CACHE_PATH: string;
  readonly IMAGE_RESIZER_SERVICE: string;
  readonly SITE_METADATA: SiteMetadata;
  readonly NOVEL_LIST: string[];
  readonly NOVEL_TITLES: {
    [novel: string]: string;
  };
  readonly NOVEL_GENRES: {
    [novel: string]: string[];
  };
  readonly NOVEL_DEMOGRAPHICS: {
    [novel: string]: string[];
  };
  readonly NOVEL_TAGS: {
    [novel: string]: string[];
  };
  readonly NOVEL_SYNOPSISES: {
    [novel: string]: string;
  };
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
