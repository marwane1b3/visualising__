import React, { ComponentType, lazy, Suspense, ComponentProps } from 'react';

const loadable = (
  importFunc: () => Promise<{ default: ComponentType<any> }>,
  { fallback = null }: { fallback: React.ReactElement<any> | null },
) => {
  const LazyComponent = lazy(importFunc);

  return (props: ComponentProps<any>) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
