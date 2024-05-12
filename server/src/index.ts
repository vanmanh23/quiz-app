import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { router as categories } from './modules/categories.controler';

const app = new Hono().basePath('/api');

app.use("*", logger());
app.use(
  "*",
  cors({
    origin: [
      "http://localhost:3000",
      "https://quiz-app-sepia-gamma.vercel.app"
    ],
    credentials: true,
  }),
);

app.route("/categories", categories);
app.notFound((c) => {
  return c.json({
      message: "Not found",
      statusCode: 404,
  }, 404);
});

serve(app, () => {
  console.log('Server is running on http://localhost:3000');
});
