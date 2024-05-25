import axios from "axios"

interface test{
    id?: string
    duration: number
    numOfQuestions: number
    title: string
    testName: string
}

export const createtest = async (data: test) => {
     
     try {
        await axios.post('https://quiz-my-server.vercel.app/api/categories', data)
     } catch (error) {
        console.log(error)
     }
}