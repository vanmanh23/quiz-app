import { Hono } from "hono";
import { QuestionsService } from "./questions.service";

export const router = new Hono();

router
.get("/", async (c) => {
    const questions = await QuestionsService.getAll();
    return c.json({message: "Get all questions", data: questions});
})
.post("/question", async (c) => {
    const data = await c.req.json();
    await QuestionsService.createQuestion(data);
    return c.json({message: "Create new question successfully", data: data});
})
.post("/options", async (c) => {
    const data = await c.req.json();
    await QuestionsService.createOptions(data);
    return c.json({message: "Create new option successfully"});
})
.post("/image", async (c) => {
    const data = await c.req.json();
    await QuestionsService.createImage(data);
    return c.json({message: "Create new image successfully"});   
})