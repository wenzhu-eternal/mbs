import { ReactNode, Fragment } from 'react';

export default function BlankLayout({ children }: { children: ReactNode }) {
  return <Fragment>{children}</Fragment>;
}
