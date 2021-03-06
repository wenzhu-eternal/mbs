import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import routerConfig from './routerConfig';

import Loading from '@/components/Loading';

const modules = import.meta.glob('../**/**.tsx');

const renderRouter = (routers: any[]) => {
  if (!Array.isArray(routers)) return null;

  return routers.map((route, index) => {
    const Compontents = React.lazy(
      modules[
        Object.keys(modules).find((i) => i.includes(route.element)) ||
          '../components/NotFount/index.tsx'
      ] as any,
    );

    return route.path ? (
      <Route
        key={`${route.path}${index}`}
        path={route.path}
        element={
          route.element && (
            <React.Suspense fallback={<Loading />}>
              <Compontents routes={route} />
            </React.Suspense>
          )
        }
      >
        {renderRouter(route.children)}
      </Route>
    ) : (
      <Route
        key={`${route.form}${index}`}
        path={route.form}
        element={<Navigate to={route.to} />}
      />
    );
  });
};

export default () => (
  <Router>
    <Routes>{renderRouter(routerConfig)}</Routes>
  </Router>
);
