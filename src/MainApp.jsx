import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import FallbackSpinner from './components/FallbackSpinner';
import NavBar from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';

// Keep lazy factories stable across renders — creating React.lazy() inside
// render makes every update a new component type and Suspense never settles.
const SECTION_COMPONENTS = {
  Projects: React.lazy(() => import('./components/Projects.jsx')),
  Journey: React.lazy(() => import('./components/Journey.jsx')),
  Creator: React.lazy(() => import('./components/Creator.jsx')),
  About: React.lazy(() => import('./components/About.jsx')),
  Education: React.lazy(() => import('./components/Education.jsx')),
  Experience: React.lazy(() => import('./components/Experience.jsx')),
  Skills: React.lazy(() => import('./components/Skills.jsx')),
};

function AnimatedRoutes({ data }) {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-enter">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        {data?.sections?.map((route) => {
          const SectionComponent = SECTION_COMPONENTS[route.component];
          if (!SectionComponent) return null;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={<SectionComponent header={route.headerTitle} />}
            />
          );
        })}
      </Routes>
    </div>
  );
}

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="MainApp">
      <NavBar />
      <main className="main">
        <Suspense fallback={<FallbackSpinner />}>
          <AnimatedRoutes data={data} />
        </Suspense>
      </main>
    </div>
  );
}

export default MainApp;
