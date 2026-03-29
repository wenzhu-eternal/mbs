/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly SSR: boolean;
  readonly BASE_URL: string;
  [key: string]: string | boolean | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface routerProps {
  path?: string;
  name?: string;
  icon?: string;
  form?: string;
  to?: string;
  element?: React.ReactNode;
  children?: Array<routerProps>;
}

declare const __CONFIG__: {
  IP: {
    [key: string]: string;
    development: string;
    production: string;
  };
  routers: routerProps[];
};
