import { Suspense, lazy } from 'react';

function LazyLoadComponent({ path }) {
  const LazyComponent = lazy(() => import(`../${path}`));

  return (
    <Suspense>
      <LazyComponent />
    </Suspense>
  );
}

export default LazyLoadComponent;
