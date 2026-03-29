import { ReactNode } from 'react';

declare interface routerProps {
  path?: string;
  name?: string;
  icon?: string;
  form?: string;
  to?: string;
  element?: ReactNode;
  children?: Array<routerProps>;
}
