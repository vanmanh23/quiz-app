"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsService = void 0;
const db_1 = require("../../lib/db");
class QuestionsService {
    static async getAll() {
        const data = await db_1.db.question.findMany();
        return data;
    }
    static async createQuestion(data) {
        const dd = await db_1.db.question.create({ data });
        return dd;
    }
    static async createOptions(data) {
        try {
            await db_1.db.option.createMany({ data });
        }
        catch (error) {
            throw error;
        }
    }
    static async createImage(data) {
        try {
            await db_1.db.image.create({ data });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=questions.service.js.map