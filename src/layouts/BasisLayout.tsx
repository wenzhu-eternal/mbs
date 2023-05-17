import { Card, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import type { routerProps } from '@/routers/types.d.ts';

import SiderMenu from '@/components/BasisMenu/SiderMenu';
import HeaderMenu from '@/components/BasisMenu/HeaderMenu';
import FooterMenu from '@/components/BasisMenu/FooterMenu';

import styles from './BasisLayout.module.less';

export default function BasisLayout({ routes }: { routes: routerProps }) {
  return (
    <Layout className={styles.BasisLayout}>
      <SiderMenu routes={routes.children as routerProps[]} />
      <Layout>
        <HeaderMenu />
        <Layout.Content>
          <Card className={styles.content}>
            <Outlet />
          </Card>
        </Layout.Content>
        <FooterMenu />
      </Layout>
    </Layout>
  );
}
