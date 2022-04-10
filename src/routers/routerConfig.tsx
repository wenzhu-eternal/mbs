import { ReactNode } from 'react';

export interface routerProps {
  path?: string;
  name?: string;
  icon?: string;
  form?: string;
  to?: string;
  element?: ReactNode;
  children?: Array<routerProps>;
}

export interface routeProps {
  children: routerProps[];
}

const routerConfig: routerProps[] = [
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
            path: '/layout2',
            name: '边栏2',
            element: 'pages/home',
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
];

export default routerConfig;
