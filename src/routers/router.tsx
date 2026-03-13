import { lazy, createElement, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Loading from '@/components/Loading';

import { routerProps } from './types';

const modules = import.meta.glob('../**/**.tsx');

const renderRouter = (routers?: routerProps[]) => {
  if (!Array.isArray(routers)) return null;

  return routers.map((route, index) => {
    const Compontents = lazy(
      () =>
        modules[
          Object.keys(modules).find((i) =>
            i.match(`.*${route.element}(/index)?.(ts|tsx)$`),
          ) || '../components/NotFount/index.tsx'
        ]() as Promise<{ default: React.ComponentType<unknown> }>,
    );

    // 判断是否为布局组件，只有布局组件需要 routes 属性
    const isLayoutComponent = String(route.element).includes('layouts/');

    return route.path ? (
      <Route
        key={`${route.path}${index}`}
        path={route.path}
        element={
          route.element && (
            <Suspense fallback={<Loading />}>
              {isLayoutComponent ? (
                // 使用类型断言来传递 routes 属性
                createElement(
                  Compontents as React.ComponentType<{ routes: routerProps }>,
                  { routes: route },
                )
              ) : (
                <Compontents />
              )}
            </Suspense>
          )
        }
      >
        {renderRouter(route.children)}
      </Route>
    ) : route.to ? (
      <Route
        key={`${route.form}${index}`}
        path={route.form}
        element={<Navigate to={route.to} />}
      />
    ) : null;
  });
};

const RouterComponents = () => (
  <Router>
    <Routes>{renderRouter(__CONFIG__.routers)}</Routes>
  </Router>
);

export default RouterComponents;
