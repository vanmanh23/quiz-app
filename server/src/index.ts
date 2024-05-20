import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { serve } from "@hono/node-server";
import { router as categories } from './modules/categories/categories.controler';
import { router as questions } from './modules/question/questions.controler';
import { handle } from "@hono/node-server/vercel";

const app = new Hono().basePath("/api");

app.use("*", logger());
app.use(
    "*",
    cors({
        origin: ["http://localhost:5173", "https://airbnbapp-web.vercel.app","exp://192.168.32.105:8081"],
        credentials: true,
    })
);

app.route("/categories", categories);
app.route("/questions", questions);
app.notFound((c) => {
    return c.json(
      {
        message: "Not found",
        statusCode: 404,
      },
      404,
    );
  });

serve(app, () => {
    console.log("Server is running on http://localhost:3000");
  });

  export default handle(app)