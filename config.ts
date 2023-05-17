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
      ...config,
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
          element: 'components/NotFount',
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
              form: '/',
              to: '/layout/one/one',
            },
          ],
        },
      ],
    },
  ],
});
