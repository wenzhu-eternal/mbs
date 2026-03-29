import { ReactNode } from 'react';

interface routerProps {
  path?: string;
  name?: string;
  icon?: string;
  form?: string;
  to?: string;
  element?: ReactNode;
  children?: Array<routerProps>;
}

const defaultConfig = (
  config: Partial<{
    IP: Partial<{
      development: string;
      production: string;
    }>;
    routers: routerProps[];
  }>,
) => {
  return JSON.stringify({
    ...config,
    IP: {
      ...config.IP,
      development: config?.IP?.development || 'http://localhost:9000/',
    },
  });
};

export default defaultConfig({
  IP: {
    production: '',
  },
  routers: [
    {
      path: '/',
      element: 'layouts/BlankLayout',
      children: [
        {
          path: '/404',
          element: 'components/NotFound',
        },
        {
          path: '/login',
          element: 'pages/login',
        },
        {
          path: '/',
          element: 'layouts/BasisLayout',
          children: [
            {
              path: '/layout',
              name: '边栏1',
              icon: 'iconhear-full',
              children: [
                {
                  path: '/layout/one',
                  name: '边栏1-1',
                  icon: 'iconhear-full',
                  children: [
                    {
                      path: '/layout/one/one',
                      name: '边栏1-1',
                      icon: 'iconhear-full',
                      element: 'pages/home',
                    },
                  ],
                },
                {
                  path: '/layout/two',
                  name: '边栏1-2',
                  element: 'pages/about',
                  icon: 'iconhear-full',
                },
              ],
            },
            {
              path: '/map',
              name: '边栏2',
              element: 'pages/map',
              icon: 'iconhear-full',
            },
            {
              path: '/monitor',
              name: '系统监控',
              icon: 'iconhear-full',
              children: [
                {
                  path: '/monitor/error-log',
                  name: '错误日志',
                  element: 'pages/monitor/errorLog',
                  icon: 'iconhear-full',
                },
              ],
            },
            {
              form: '/',
              to: '/layout/one/one',
            },
            {
              form: '*',
              to: '/',
            },
          ],
        },
      ],
    },
  ],
});
