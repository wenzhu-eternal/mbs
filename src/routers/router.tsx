import React from 'react';
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
    const Compontents = React.lazy(
      modules[
        Object.keys(modules).find((i) =>
          i.match(`.*${route.element}(/index)?.(ts|tsx)$`),
        ) || '../components/NotFount/index.tsx'
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

const RouterComponents = () => (
  <Router>
    <Routes>{renderRouter(__CONFIG__.routers)}</Routes>
  </Router>
);

export default RouterComponents;
