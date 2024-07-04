import axios from "axios";

interface questionProps {
    question: string;
    hint: string;
    answerDescription: string;
    testNameId: string;
}
interface optionProps {
    text: string;
    isCorrect: boolean;
    questionId: string
}

export const createQuestion = async (data: questionProps) => {     
    try {
       const questionmaked = await axios.post('https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/questions/question', data)
        return questionmaked.data;
    } catch (error) {
       console.log(error)
    }
}
export const getQuestion = async () => {
    try {
        const res = await axios.get('https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/questions/question')
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const createOption = async (data: optionProps) => {
     
    try {
       await axios.post('https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/questions/options', data)
    } catch (error) {
       console.log(error)
    }
}