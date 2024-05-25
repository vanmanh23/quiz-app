"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const hono_1 = require("hono");
const categories_service_1 = require("./categories.service");
exports.router = new hono_1.Hono();
exports.router
    .get("/", async (c) => {
    const categories = await categories_service_1.CategoriesService.getAll();
    return c.json({ message: "Get all categories", data: categories });
})
    .post("/", async (c) => {
    const data = await c.req.json();
    const category = await categories_service_1.CategoriesService.create(data);
    return c.json({
        data: category,
        status: 200,
    });
});
//# sourceMappingURL=categories.controler.js.map