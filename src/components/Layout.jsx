import { Suspense } from 'react';

import  {ModalManager}  from './ModalManager'
export const Layout = ({ children }) => {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>

      <Suspense fallback={null}>{children}</Suspense>
      <ModalManager/>
    </div>
  );
};
