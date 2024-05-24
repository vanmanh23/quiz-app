"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const db_1 = require("../../lib/db");
class CategoriesService {
    static async getAll() {
        const data = await db_1.db.testName.findMany({ include: { image: {
                    select: {
                        uri: true,
                        alt: true
                    }
                } } });
        return data;
    }
    static async getById(id) {
        const data = await db_1.db.testName.findUnique({ where: { id }, include: { image: {
                    select: {
                        uri: true,
                        alt: true
                    }
                } } });
        return data;
    }
    static async create(data) {
        try {
            const result = await db_1.db.testName.create({ data });
            return result;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async getByTestName(testName) {
        const data = await db_1.db.testName.findFirst({ where: { testName: testName }, include: {
                image: {
                    select: {
                        uri: true,
                        alt: true
                    }
                },
                question: {
                    select: {
                        id: true,
                        question: true,
                        answerDescription: true,
                        hint: true,
                        options: true,
                        image: true
                    }
                }
            } });
        return data;
    }
    static async deleteById(id) {
        try {
            const result = await db_1.db.testName.delete({ where: { id }, include: { image: {
                        select: {
                            uri: true,
                            alt: true
                        }
                    } } });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async imagecreate(data) {
        try {
            const result = await db_1.db.image.create({ data });
            return result;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map