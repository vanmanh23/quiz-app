import axios from "axios"

interface Imagequestion {
    uri: string
    alt: string
    questionId: string
}

export const createImage = async (data: Imagequestion) => {
    const res = await axios.post('https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/questions/image', data)
    return res.data
}