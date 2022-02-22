interface ImportMetaEnv {
  readonly BACKEND_API: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
