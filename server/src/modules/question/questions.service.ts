import { Questions } from '@prisma/client';
import { db } from '../../lib/db';

export class QuestionsService {
static async getAll() {
    const data = await db.questions.findMany();
    return data;
}
static async getByTestName(testName : string) {
    const data = await db.questions.findFirst({where : {testName: testName}, 
        include: {question: {
            select: {
                image: true,
                answerDescription: true,
                options: true,
                question: true,
                hint: true
                
            }
        } }});
    return data;
}
static async create(data : Questions) {
    try {
        await db.questions.create({data});
    } catch (error) {
        console.log("error when create data: ",error);
        throw error;
    }
}
}

