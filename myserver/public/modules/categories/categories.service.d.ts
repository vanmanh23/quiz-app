import { Image, type TestName } from "@prisma/client";
export declare class CategoriesService {
    static getAll(): Promise<({
        image: {
            uri: string;
            alt: string;
        };
    } & {
        id: string;
        title: string;
        testName: string;
        numOfQuestions: number;
        duration: number;
    })[]>;
    static getById(id: string): Promise<{
        image: {
            uri: string;
            alt: string;
        };
    } & {
        id: string;
        title: string;
        testName: string;
        numOfQuestions: number;
        duration: number;
    }>;
    static create(data: TestName): Promise<{
        id: string;
        title: string;
        testName: string;
        numOfQuestions: number;
        duration: number;
    }>;
    static getByTestName(testName: string): Promise<{
        image: {
            uri: string;
            alt: string;
        };
        question: {
            id: string;
            image: {
                id: string;
                uri: string;
                alt: string;
                testnameId: string;
                questionId: string;
            };
            question: string;
            hint: string;
            answerDescription: string;
            options: {
                id: string;
                text: string;
                isCorrect: boolean;
                questionId: string;
            }[];
        }[];
    } & {
        id: string;
        title: string;
        testName: string;
        numOfQuestions: number;
        duration: number;
    }>;
    static deleteById(id: string): Promise<void>;
    static imagecreate(data: Image): Promise<{
        id: string;
        uri: string;
        alt: string;
        testnameId: string;
        questionId: string;
    }>;
}
