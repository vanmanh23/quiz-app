import { Hono } from "hono";
import { QuestionsService } from "./questions.service";

export const router = new Hono();

router
.get("/", async (c) => {
    const questions = await QuestionsService.getAll();
    return c.json({message: "Get all questions", data: questions});
})
.get("/:testName",async (c) => {
    const testName = c.req.param("testName") ;
    const questions = await QuestionsService.getByTestName(testName);
    return c.json({message: "Get questions by test name", data: questions});
})
.post("/", async (c) => {
    const data = await c.req.json();
    console.log(data);
    await QuestionsService.create(data);
    return c.json({message: "Create new question successfully"});
})
