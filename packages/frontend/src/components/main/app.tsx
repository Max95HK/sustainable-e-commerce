/* Built-in modules */
import { useEffect } from 'react';

/* Third-party modules */
import { RouterProvider, type Register } from '@tanstack/react-router';

/* Custom modules */
import { authClient } from '@/lib/auth-client';

type AppProps = {
  router: Register['router'];
};

function App({ router }: AppProps) {
  const session = authClient.useSession();

  useEffect(() => {
    router.invalidate();
  }, [session.data, router]);

  return (
    <RouterProvider
      router={router}
      context={{ auth: session }}
    />
  );
}

export default App;
