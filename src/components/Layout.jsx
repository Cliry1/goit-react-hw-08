import { Suspense } from 'react';
import { AppBar } from './AppBar/AppBar';
import  {ModalManager}  from './ModalManager'
export const Layout = ({ children }) => {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
      <ModalManager/>
    </div>
  );
};
