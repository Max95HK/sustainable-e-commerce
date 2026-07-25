/* Third-party modules */
import { createMiddleware } from "hono/factory";

/* Custom modules */
import { auth } from "@/auth";

/* Types */
import type { HonoEnv } from "@/types";

const authMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }

  c.set("user", session.user);
  c.set("session", session.session);

  await next();
});

export default authMiddleware ;
