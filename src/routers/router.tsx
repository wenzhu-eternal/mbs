/* eslint-disable @typescript-eslint/no-var-requires */
import { FC, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import routerConfig, { routerProps } from './routerConfig';
import Loading from '@/components/Loading';

const renderDetail = (pageType: string) => {
  try {
    require(`@/${pageType}`)
  } catch (err) {
    return require('@/components/NotFount').default;
  }
  return require(`@/${pageType}`).default;
}

const renderRouter: FC<routerProps[]> = (routers) => {
  if (!Array.isArray(routers)) return null;

  return (
    <Switch>
      {routers.map((route, index) => {
        if (route.redirect) {
          return (
            <Redirect
              key={`${route.path}${index}`}
              exact={route.exact}
              strict={route.strict}
              from={route.path}
              to={route.redirect}
            />
          );
        }

        return (
          <Route
            key={`${route.path}${index}`}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={routeProps => {
              const renderChildRoutes = renderRouter(route.children as routerProps[]);
              const dynamicDetailRoute = {
                ...routeProps,
                children: route.children
              }

              if (route.component) {
                const DynamicDetail = renderDetail(route.component);
                return (
                  <Suspense fallback={<Loading />}>
                    <DynamicDetail route={dynamicDetailRoute}>{renderChildRoutes}</DynamicDetail>
                  </Suspense>
                )
              }

              return renderChildRoutes;
            }}
          />
        );
      })}
    </Switch>
  )
}

const RouterComponents: FC = () => {
  return (
    <Router>
      {renderRouter(routerConfig)}
    </Router>
  )
}

export default RouterComponents;