import { db } from '../../lib/db';
export class QuestionsService {
    static async getAll() {
        const data = await db.question.findMany();
        return data;
    }
    static async createQuestion(data) {
        // try {
        const dd = await db.question.create({ data });
        return dd;
        // }catch(error) {
        //     throw error;
        // }
    }
    static async createOptions(data) {
        try {
            await db.option.createMany({ data });
        }
        catch (error) {
            throw error;
        }
    }
    static async createImage(data) {
        try {
            await db.image.create({ data });
        }
        catch (error) {
            throw error;
        }
    }
}
