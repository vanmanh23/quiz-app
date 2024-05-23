// import { Hono } from "hono";
// import { cors } from "hono/cors";
// import { logger } from "hono/logger";
// import { serve } from "@hono/node-server";
// import { router as categories } from './modules/categories/categories.controler';
// import { router as questions } from './modules/question/questions.controler';
// import { handle } from "@hono/node-server/vercel";

// const app = new Hono().basePath("/api");

// app.use("*", logger());
// app.use(
//     "*",
//     cors({
//         origin: "http://localhost:5173",
//         allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
//         allowMethods: ['POST', 'GET', 'OPTIONS'],
//         exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
//         maxAge: 600,
//         credentials: true,
//     })
// );

// app.route("/categories", categories);
// app.route("/questions", questions);
// app.notFound((c) => {
//     return c.json(
//       {
//         message: "Not found",
//         statusCode: 404,
//       },
//       404,
//     );
//   });

// serve(app, () => {
//     console.log("Server is running on http://localhost:3000");
//   });

//   export default handle(app)

import { Hono } from 'hono';
import { serve } from "@hono/node-server";
import { cors } from 'hono/cors';
import { router as categories } from './modules/categories/categories.controler';
import { router as questions } from './modules/question/questions.controler';
const app = new Hono();

const corsOptions = {
  origin: 'http://localhost:5173',
  allowHeaders: ['Content-Type', 'Authorization'], // Add other headers if needed
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
};

app.use('/api/*', cors(corsOptions));

app.route("/api/categories", categories);
app.route("/api/questions", questions);

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

// export default app;
