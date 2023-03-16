import Header from './header';
import { Box } from './Box';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box css={{ maxW: '100%' }}>
      <Header />
      {children}
    </Box>
  );
}
