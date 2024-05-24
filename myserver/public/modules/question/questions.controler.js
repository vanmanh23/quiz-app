"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const hono_1 = require("hono");
const questions_service_1 = require("./questions.service");
exports.router = new hono_1.Hono();
exports.router
    .get("/", async (c) => {
    try {
        const questions = await questions_service_1.QuestionsService.getAll();
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
        await questions_service_1.QuestionsService.createQuestion(data);
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
        await questions_service_1.QuestionsService.createOptions(data);
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
        await questions_service_1.QuestionsService.createImage(data);
        return c.json({ message: "Create new image successfully" });
    }
    catch (error) {
        console.error('Error creating image:', error);
        return c.json({ message: "Error creating image", error: error }, 500);
    }
});
//# sourceMappingURL=questions.controler.js.map