/* Built-in modules */

/* Third-party modules */
import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ReactLenis } from 'lenis/react';

/* Components */
import Header from '@/components/layout/header';

const RootLayout = () => {
  return (
    <>
      <ReactLenis root />

      <div className='p-3 size-full flex flex-col'>
        <Header />
        <div className='flex-1 h-full'>
          <Outlet />
        </div>
      </div>

      <TanStackRouterDevtools />
    </>
  );
};

export default RootLayout;
