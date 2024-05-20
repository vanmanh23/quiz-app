import { Image, Option, Question } from '@prisma/client';
import { db } from '../../lib/db';

export class QuestionsService {
static async getAll() {
    const data = await db.question.findMany();
    return data;
}
static async createQuestion(data: Question) {
    try {
        await db.question.create({data});
        return data;
    }catch(error) {
        throw error;
    }
}
static async createOptions(data: Option) {
    try{
        await db.option.createMany({data})
    }catch(error) {
        throw error;
    }
}
static async createImage(data: Image) {
    try {
        await db.image.create({data})
    }catch (error) {
        throw error;
    }
}
}

