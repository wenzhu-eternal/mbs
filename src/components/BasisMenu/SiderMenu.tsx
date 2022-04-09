import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MyIcon } from '@/utils';
import { routerProps } from '@/routers/routerConfig';
import styles from './styles.module.less';

const renderMenu = (routes: routerProps[] | undefined) =>
  routes
    ?.filter((route: routerProps) => route.name && route.path)
    .map((route: routerProps) => {
      if (route.element || route.children) {
        if (route.children) {
          return (
            <Menu.SubMenu
              key={route.path}
              title={route.name}
              icon={route.icon && <MyIcon type={route.icon as string} />}
            >
              {renderMenu(route.children)}
            </Menu.SubMenu>
          );
        }
        return (
          <Menu.Item
            key={route.path}
            icon={route.icon && <MyIcon type={route.icon as string} />}
          >
            <Link to={route.path as string}>{route.name}</Link>
          </Menu.Item>
        );
      }
      return null;
    });

export default function SiderMenu({ routes }: { routes: routerProps[] | undefined }) {
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
      >
        {renderMenu(routes)}
      </Menu>
    </Layout.Sider>
  );
}
