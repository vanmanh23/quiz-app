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
    static async create(data) {
        const category = await db_1.db.testName.create({ data });
        return category;
    }
}
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map