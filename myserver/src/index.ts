import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { serve } from "@hono/node-server";
import { router as categories } from './modules/categories/categories.controler';
import { router as questions } from './modules/question/questions.controler';
import { handle } from "@hono/node-server/vercel";
import { CategoriesService } from "./modules/categories/categories.service";
const app = new Hono().basePath("/api");

app.use("*", logger());
app.use(
    "*",
    cors({
        origin: "*",
        credentials: true,
        allowHeaders: ["Content-Type", "Authorization"],
        exposeHeaders: ["Content-Type", "Authorization"],
        maxAge: 600,
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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
  app.get('/test', (c) => c.json({message: "hello world", statusCode: 200}))
  app.post('/test', (c) => c.text('POST /'))
  app.post("/createcate", async (c) => {
    const data = {
      id: "some-id",
      title: "some-title",
      testName: "some-test-name",
      numOfQuestions: 10,
      duration: 60,
    };
    await CategoriesService.create(data);
    return c.json({
      message: "create category successfully",
      status: 200,
    });
  })
  app.post("/test2", async (c) => {
    const data = await c.req.json();
    return c.json({
      message: "create category successfully",
      data: data,
      status: 200,
    });
  })
serve(app, () => {
    console.log("Server is running on http://localhost:3000");
  });

  export default handle(app)