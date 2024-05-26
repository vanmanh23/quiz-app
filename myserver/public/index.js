"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const cors_1 = require("hono/cors");
const logger_1 = require("hono/logger");
const node_server_1 = require("@hono/node-server");
const categories_controler_1 = require("./modules/categories/categories.controler");
const questions_controler_1 = require("./modules/question/questions.controler");
const vercel_1 = require("@hono/node-server/vercel");
const categories_service_1 = require("./modules/categories/categories.service");
const app = new hono_1.Hono().basePath("/api");
app.use("*", (0, logger_1.logger)());
app.use("*", (0, cors_1.cors)({
    origin: "*",
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.route("/categories", categories_controler_1.router);
app.route("/questions", questions_controler_1.router);
app.notFound((c) => {
    return c.json({
        message: "Not found",
        statusCode: 404,
    }, 404);
});
app.get('/test', (c) => c.json({ message: "hello world", statusCode: 200 }));
app.get('/test2', (c) => c.json({ message: "hello world", statusCode: 200 }));
app.post('/test', (c) => c.text('POST /'));
app.post("/createcate", async (c) => {
    const data = {
        id: "some-id",
        title: "some-title",
        testName: "some-test-name",
        numOfQuestions: 10,
        duration: 60,
    };
    await categories_service_1.CategoriesService.create(data);
    return c.json({
        message: "create category successfully",
        status: 200,
    });
});
app.post("/test3", async (c) => {
    try {
        const rawBody = await c.req.json();
        return c.json({
            message: 'create category successfully',
            data: rawBody,
            status: 200,
        });
    }
    catch (error) {
        return c.json({ error: 'Invalid JSON' }, 400);
    }
});
app.post("/test2", async (c) => {
    try {
        const data = {
            id: "some-id",
            title: "some-title",
            testName: "some-test-name",
            numOfQuestions: 10,
            duration: 60,
        };
        return c.json({
            message: 'create category successfully',
            data: data,
            status: 200,
        });
    }
    catch (error) {
        return c.json({ error: 'Invalid JSON' }, 400);
    }
});
(0, node_server_1.serve)(app, () => {
    console.log("Server is running on http://localhost:3000");
});
exports.default = (0, vercel_1.handle)(app);
//# sourceMappingURL=index.js.map