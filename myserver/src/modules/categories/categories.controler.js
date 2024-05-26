import { Hono } from "hono";
import { CategoriesService } from "./categories.service";
export const router = new Hono();
router
    .get("/", async (c) => {
    const categories = await CategoriesService.getAll();
    // return c.json({message: "Get all categories"});
    return c.json({ message: "Get all categories", data: categories });
})
    .post("/", async (c) => {
    const data = await c.req.json();
    const category = await CategoriesService.create(data);
    return c.json({
        data: category,
        status: 200,
    });
});
// .get("/:id", async (c) => {
//     const id = c.req.param("id") ;
//     const category = await CategoriesService.getById(id);
//     return c.json({message: "Get category by id", data: category});
// })
// .post("/", async (c) => {
//     const data = await c.req.json();
//     console.log(data);
//     await CategoriesService.create(data);
//     return c.json({message: "Create new category successfully"});
// })
// .post("/image", async (c) => {
//     const data = await c.req.json();
//     await CategoriesService.imagecreate(data);
//     return c.json({message: "Create new image successfully"});
// })
// .delete("/:id", async (c) => {
//     const id = c.req.param("id") ;
//     await CategoriesService.deleteById(id);
//     return c.json({message: "Delete category by id"});
// })
// .get("/getbytestname/:testName", async (c) => {
//     const testName = c.req.param("testName") ;
//     const categories = await CategoriesService.getByTestName(testName);
//     return c.json({message: "Get categories by test name", data: categories});
// })
