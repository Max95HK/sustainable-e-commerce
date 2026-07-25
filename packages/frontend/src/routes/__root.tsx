/* Third-party modules */
import { createRootRouteWithContext } from '@tanstack/react-router';

/* Custom modules */
import { authClient } from '@/lib/auth-client';

interface RouterContext {
  auth: ReturnType<typeof authClient.useSession>;
}

/* Components */
import RootLayout from '@/components/layout/root-layout';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});
