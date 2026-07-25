/* Third-party modules */
import { Hono } from "hono";
import { cors } from "hono/cors";

/* Custom modules */
import { auth } from "@/auth";
import { env } from "@/env";

/* Middlewares */
import authMiddleware from "@/middlewares/auth.middleware";

/* Types */
import type { HonoEnv } from "@/types";

const app = new Hono<HonoEnv>();

app.use(
  "/api/auth/*",
  cors({
    origin: env.CLIENT_URL,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use("*", authMiddleware);

const router = app
  .basePath("/api")
  .on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));


export type AppType = typeof router;  
export default app;
