import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { MyIcon } from '@/utils';
import PropTypes from 'prop-types';

import styles from './styles.module.less';

const renderMenu = (routes) =>
  routes
    ?.filter((route) => route.name && route.path)
    .map((route) => {
      if (route.element || route.children) {
        return route.children
          ? {
              key: route.path,
              label: route.name,
              icon: route.icon && <MyIcon type={route.icon} />,
              children: renderMenu(route.children),
            }
          : {
              key: route.path,
              label: <Link to={route.path}>{route.name}</Link>,
              icon: route.icon && <MyIcon type={route.icon} />,
            };
      }
      return null;
    });

export default function SiderMenu({ routes }) {
  const { pathname } = useLocation();
  const [openKey, setOpenKey] = React.useState();

  React.useEffect(() => {
    const openKeys = pathname.split('/').filter((i) => i);
    setOpenKey(
      openKeys.map((_, index) => `/${openKeys.slice(0, index + 1).join('/')}`),
    );
  }, [pathname]);

  const onChangeOpenKeys = (openkeys) => {
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

SiderMenu.propTypes = {
  routes: PropTypes.array.isRequired,
};
