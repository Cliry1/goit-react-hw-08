import { Suspense } from 'react';

import  {ModalManager}  from './ModalManager'
export const Layout = ({ children }) => {
  return (
    <div style={{ maxWidth: 1024, margin: '0 auto'}}>
      <Suspense fallback={null}>{children}</Suspense>
      <ModalManager/>
    </div>
  );
};
