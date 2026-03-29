import React, { createElement, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import AuthGuard from '@/components/AuthGuard';
import Loading from '@/components/Loading';

import { routerProps } from './types';

const modules = import.meta.glob('../../**/**.tsx');

const renderRouter = (routers?: routerProps[]) => {
  if (!Array.isArray(routers)) return null;

  return routers.map((route, index) => {
    const modulePath =
      Object.keys(modules).find((i) =>
        i.match(`.*${route.element}(/index)?.(ts|tsx)$`),
      ) || '../../components/NotFound/index.tsx';

    const Compontents = lazy(
      () =>
        modules[modulePath]() as Promise<{
          default: React.ComponentType<unknown>;
        }>,
    );

    const isLayoutComponent = String(route.element).includes('layouts/');

    return route.path ? (
      <Route
        key={`${route.path}${index}`}
        path={route.path}
        element={
          route.element && (
            <AuthGuard>
              <React.Suspense fallback={<Loading />}>
                {isLayoutComponent ? (
                  createElement(Compontents, {
                    routes: route,
                  } as unknown as React.Attributes)
                ) : (
                  <Compontents />
                )}
              </React.Suspense>
            </AuthGuard>
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
