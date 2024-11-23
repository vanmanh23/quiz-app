import axios from "axios"

interface TestCompletedResponse {
    score: number
    timeTaken: string
    correctAnswers: number
    userId: string
    testNameId: string
}

export const testCompleted = async (data: TestCompletedResponse) => {
    try {
        await axios.post('https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/users/test', data)
    } catch (error) {
        throw error;
    }
}

export const getTestByUserId = async (userId: string) => {
    try {
        const res = await axios.get(`https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/users/achievement?userId=${userId}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}