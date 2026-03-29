import { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import type { routerProps } from '@/components/Router/types';
import { MyIcon } from '@/utils';

import styles from './styles.module.less';

import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const renderMenu = (routes: routerProps[]): MenuItem[] => {
  const items = routes
    ?.filter((route: routerProps) => route.name && route.path)
    .map((route: routerProps) => {
      if (route.element || route.children) {
        return route.children
          ? {
              key: route.path as string,
              label: route.name,
              icon: route.icon && <MyIcon type={route.icon as string} />,
              children: renderMenu(route.children),
            }
          : {
              key: route.path as string,
              label: <Link to={route.path as string}>{route.name}</Link>,
              icon: route.icon && <MyIcon type={route.icon as string} />,
            };
      }
      return null;
    });
  return (items?.filter(Boolean) as MenuItem[]) || [];
};

export default function SiderMenu({ routes }: { routes: routerProps[] }) {
  const { pathname } = useLocation();
  const [openKey, setOpenKey] = useState<string[]>();

  useEffect(() => {
    const openKeys = pathname.split('/').filter((i) => i);
    setOpenKey(
      openKeys.map((_, index) => `/${openKeys.slice(0, index + 1).join('/')}`),
    );
  }, [pathname]);

  const onChangeOpenKeys = (openkeys: string[]) => {
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
