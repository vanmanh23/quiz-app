import { type TestName } from "@prisma/client";
export declare class CategoriesService {
    static getAll(): Promise<({
        image: {
            uri: string;
            alt: string;
        } | null;
    } & {
        id: string;
        title: string;
        testName: string;
        numOfQuestions: number;
        duration: number;
    })[]>;
    static create(data: TestName): Promise<{
        id: string;
        title: string;
        testName: string;
        numOfQuestions: number;
        duration: number;
    }>;
}
