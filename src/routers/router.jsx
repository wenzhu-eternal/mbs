import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import routerConfig from './routerConfig';

import Loading from '@/components/Loading';

const modules = import.meta.glob('../**/**.jsx');

const renderRouter = (routers) => {
  if (!Array.isArray(routers)) return null;

  return routers.map((route, index) => {
    const Compontents = React.lazy(
      modules[
        Object.keys(modules).find((i) =>
          i.match(`.*${route.element}(/index)?.(js|jsx)$`),
        ) || '../components/NotFount/index.jsx'
      ],
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

export default function RouterFC() {
  return (
    <Router>
      <Routes>{renderRouter(routerConfig)}</Routes>
    </Router>
  );
}
