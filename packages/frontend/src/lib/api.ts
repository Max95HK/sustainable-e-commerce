import { hc } from "hono/client";

import type { AppType } from '@maximize/shared';

export const client = hc<AppType>("/", {
  init: {
    credentials: "include",
  },
});
