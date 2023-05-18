/// <reference types="vite/client" />

declare const __CONFIG__: {
  IP: {
    [key: string]: string;
    development: string;
    production: string;
  };
  routers: routerProps[];
};
