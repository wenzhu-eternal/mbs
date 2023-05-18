import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MyIcon } from '@/utils';
import type { routerProps } from '@/routers/types.d.ts';

import styles from './styles.module.less';

const renderMenu = (routes: routerProps[]): any =>
  routes
    ?.filter((route: routerProps) => route.name && route.path)
    .map((route: routerProps) => {
      if (route.element || route.children) {
        return route.children
          ? {
              key: route.path,
              label: route.name,
              icon: route.icon && <MyIcon type={route.icon as string} />,
              children: renderMenu(route.children),
            }
          : {
              key: route.path,
              label: <Link to={route.path as string}>{route.name}</Link>,
              icon: route.icon && <MyIcon type={route.icon as string} />,
            };
      }
      return null;
    });

export default function SiderMenu({ routes }: { routes: routerProps[] }) {
  const { pathname } = useLocation();
  const [openKey, setOpenKey] = React.useState<string[]>();

  React.useEffect(() => {
    const openKeys = pathname.split('/').filter((i) => i);
    setOpenKey(
      openKeys.map((_, index) => `/${openKeys.slice(0, index + 1).join('/')}`),
    );
  }, [pathname]);

  const onChangeOpenKeys = (openkeys: any) => {
    setOpenKey(openkeys);
  };

  return (
    <Layout.Sider className={styles.SiderMenu} collapsed={false}>
      <div className={styles.logo}>文竹</div>
      <Menu
        theme="dark"
        mode="inline"
        openKeys={openKey}
        selectedKeys={[pathname]}
        onOpenChange={onChangeOpenKeys}
        items={renderMenu(routes)}
      />
    </Layout.Sider>
  );
}
