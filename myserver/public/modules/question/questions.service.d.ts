import { Image, Option, Question } from '@prisma/client';
export declare class QuestionsService {
    static getAll(): Promise<{
        id: string;
        question: string;
        hint: string;
        answerDescription: string;
        testNameId: string;
    }[]>;
    static createQuestion(data: Question): Promise<{
        id: string;
        question: string;
        hint: string;
        answerDescription: string;
        testNameId: string;
    }>;
    static createOptions(data: Option): Promise<void>;
    static createImage(data: Image): Promise<void>;
}
