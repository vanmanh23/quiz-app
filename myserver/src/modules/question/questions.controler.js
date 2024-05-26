import { Hono } from "hono";
import { QuestionsService } from "./questions.service";
export const router = new Hono();
router
    .get("/", async (c) => {
    try {
        const questions = await QuestionsService.getAll();
        return c.json({ message: "Get all questions", data: questions });
    }
    catch (error) {
        console.error('Error fetching questions:', error);
        return c.json({ message: "Error fetching questions", error: error }, 500);
    }
})
    .post("/question", async (c) => {
    try {
        const data = await c.req.json();
        await QuestionsService.createQuestion(data);
        return c.json({ message: "Create new question successfully", data: data });
    }
    catch (error) {
        console.error('Error creating question:', error);
        return c.json({ message: "Error creating question", error: error }, 500);
    }
})
    .post("/options", async (c) => {
    try {
        const data = await c.req.json();
        await QuestionsService.createOptions(data);
        return c.json({ message: "Create new option successfully" });
    }
    catch (error) {
        console.error('Error creating options:', error);
        return c.json({ message: "Error creating options", error: error }, 500);
    }
})
    .post("/image", async (c) => {
    try {
        const data = await c.req.json();
        await QuestionsService.createImage(data);
        return c.json({ message: "Create new image successfully" });
    }
    catch (error) {
        console.error('Error creating image:', error);
        return c.json({ message: "Error creating image", error: error }, 500);
    }
});
