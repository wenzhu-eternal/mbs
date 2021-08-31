import type { ReactNode } from 'react';
import { Card, Layout } from 'antd';
import type { routeProps } from '@/routers/routerConfig';

import SiderMenu from '@/components/BasisMenu/SiderMenu';
import HeaderMenu from '@/components/BasisMenu/HeaderMenu';
import FooterMenu from '@/components/BasisMenu/FooterMenu';

import styles from './BasisLayout.module.less';

export default function BasisLayout({
  route,
  children
}: {
  route: routeProps,
  children: ReactNode
}) {
  return (
    <Layout
      className={styles.BasisLayout}
    >
      <SiderMenu
        routes={route.children}
      />
      <Layout>
        <HeaderMenu />
        <Layout.Content>
          <Card className={styles.content}>
            {children}
          </Card>
        </Layout.Content>
        <FooterMenu />
      </Layout>
    </Layout>
  );
}
