import type { RouteChildrenProps } from 'react-router-dom';

export interface routerProps {
  path: string,
  name?: string,
  icon?: string,
  redirect?: string,
  exact?: boolean,
  strict?: boolean,
  component?: string,
  children?: Array<routerProps>,
}

export interface routeProps extends RouteChildrenProps {
  children: routerProps[]
}

const routerConfig: routerProps[] = [
  {
    path: '/',
    component: 'layouts/BlankLayout',
    children: [
      {
        path: '/404',
        component: 'components/NotFount'
      },
      {
        path: '/',
        component: 'layouts/BasisLayout',
        children: [
          {
            path: '/layout',
            name: '边栏1',
            icon: 'iconhear-full',
            strict: true,
            children: [
              {
                path: '/layout/one',
                name: '边栏1-1',
                icon: 'iconhear-full',
                strict: true,
                children: [
                  {
                    path: '/layout/one/one',
                    name: '边栏1-1',
                    icon: 'iconhear-full',
                    strict: true,
                    component: 'pages/home',
                  },
                  {
                    path: '/layout/one',
                    exact: true,
                    redirect: '/layout/one/one'
                  },
                  { path: '*', exact: true, redirect: '/404' }
                ]
              },
              {
                path: '/layout/two',
                name: '边栏1-2',
                strict: true,
                icon: 'iconhear-full',
                component: 'pages/about',
              },
              { path: '/layout', exact: true, redirect: '/layout/one' },
              { path: '*', exact: true, redirect: '/404' }
            ]
          },
          {
            path: '/layout2',
            name: '边栏2',
            icon: 'iconhear-full',
            component: 'pages/home'
          },
          { path: '/', exact: true, redirect: '/layout' },
          { path: '*', exact: true, redirect: '/404' }
        ]
      },
    ]
  }
]

export default routerConfig;