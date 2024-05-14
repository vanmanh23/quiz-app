import { Hono } from "hono";
import { CategoriesService } from "./categories.service";

export const router = new Hono();

router
.get("/", async (c) => {
    const categories = await CategoriesService.getAll();
    // return c.json({message: "Get all categories"});
    return c.json({message: "Get all categories", data: categories});
})
.get("/:id", async (c) => {
    const id = c.req.param("id") ;
    const category = await CategoriesService.getById(Number(id));
    return c.json({message: "Get category by id", data: category});
})
.post("/", async (c) => {
    const data = await c.req.json();
    console.log(data);
    await CategoriesService.create(data);
    return c.json({message: "Create new category successfully"});
})
.delete("/:id", async (c) => {
    const id = c.req.param("id") ;
    await CategoriesService.deleteById(Number(id));
    return c.json({message: "Delete category by id"});
})