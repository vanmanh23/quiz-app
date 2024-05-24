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
    .get("/:id", async (c) => {
    const id = c.req.param("id");
    const category = await categories_service_1.CategoriesService.getById(id);
    return c.json({ message: "Get category by id", data: category });
})
    .post("/", async (c) => {
    const data = await c.req.json();
    console.log(data);
    await categories_service_1.CategoriesService.create(data);
    return c.json({ message: "Create new category successfully" });
})
    .post("/image", async (c) => {
    const data = await c.req.json();
    await categories_service_1.CategoriesService.imagecreate(data);
    return c.json({ message: "Create new image successfully" });
})
    .delete("/:id", async (c) => {
    const id = c.req.param("id");
    await categories_service_1.CategoriesService.deleteById(id);
    return c.json({ message: "Delete category by id" });
})
    .get("/getbytestname/:testName", async (c) => {
    const testName = c.req.param("testName");
    const categories = await categories_service_1.CategoriesService.getByTestName(testName);
    return c.json({ message: "Get categories by test name", data: categories });
});
//# sourceMappingURL=categories.controler.js.map