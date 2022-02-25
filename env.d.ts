/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BACKEND_API: string;
  readonly SITE_TITLE: string;
  readonly BASE_PATH: string;
  readonly CACHE_PATH: string;
  readonly IMAGE_RESIZER_SERVICE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
