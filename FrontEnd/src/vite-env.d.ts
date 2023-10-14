/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
