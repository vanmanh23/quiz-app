import { Image, Option, Question } from '@prisma/client';
import { db } from '../../lib/db';

export class QuestionsService {
static async getAll() {
    const data = await db.question.findMany();
    return data;
}
// static async getByTestName(testName : string) {
//     const data = await db.question.findFirst({where : {}, 
//         include: {question: {
//             select: {
//                 image: true,
//                 answerDescription: true,
//                 options: true,
//                 question: true,
//                 hint: true
                
//             }
//         } }});
//     return data;
// }

static async create(data: Question) {
    try {
        await db.question.create({data});
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
// static async create(data : Questions) {
//     try {
//         await db.questions.create({data});
//     } catch (error) {
//         console.log("error when create data: ",error);
//         throw error;
//     }
// }
}

