import React, { Suspense } from 'react';
import RoutesSetting from './utils/route/Routes';

function App() {
  return (
    
    <Suspense fallback={<div />}>
      <RoutesSetting />
    </Suspense>
    
  );
}

export default App;

