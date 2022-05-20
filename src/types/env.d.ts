/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly WDYW_APP_TITLE: string
  readonly WDYW_DB_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}