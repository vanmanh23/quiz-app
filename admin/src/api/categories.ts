import axios from "axios"

interface test{
    id?: string
    duration: number
    numOfQuestions: number
    title: string
    testName: string
}

export const createtest = async (data: test) => {
    const req = await axios.post('https://quiz-app-server-omega.vercel.app/api/categories', data)
    return req.data;
}