import HeaderMenu from './core/header';
import { ReactNode } from 'react';
import Meta from './core/meta';
import Footer from './core/footer';

export interface Props {
  preview?: boolean;
  children?: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Meta />
      <HeaderMenu />

      <main>{children}</main>
      
      <Footer />
    </>
  );
}
