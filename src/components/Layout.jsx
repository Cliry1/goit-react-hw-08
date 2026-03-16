import { Suspense } from 'react';
import css from './Layout.module.css';
import  {ModalManager}  from './ModalManager'

export const Layout = ({ children }) => {
  return (
    <div className={css.layout}>
      <Suspense fallback={null}>{children}</Suspense>
      <ModalManager/>
    </div>
  );
};
