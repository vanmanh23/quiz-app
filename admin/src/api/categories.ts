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
        await axios.post('http://localhost:3000/api/categories', data)
     } catch (error) {
        console.log(error)
     }
}