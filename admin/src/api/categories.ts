import axios from "axios"

interface test{
    id?: string
    duration: number
    numOfQuestions: number
    title: string
    testName: string
}
interface Image{
    uri: string
    alt: string
    testnameId?: string
    questionId?: string
}
export const createtest = async (data: test) => {
     
     try {
        await axios.post('https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/test', data)
     } catch (error) {
        console.log(error)
     }
}
export const findtest = async (name: string) => {
   try {
      const  res =await axios.get(`https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/test`, {
         params: {
            name
         }
      })
      return res.data
   } catch (error) {
      console.log(error)
   }
}
export const createtestpicture = async (data: Image) => {
   try {
      await axios.post('https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/tests/images', data)
   } catch (error) {
      console.log(error)
   }
}
export const getAllTest = async () => {
   try{
      const res = await axios.get("https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/test");
      return res.data.testNames;
   }catch(error){
      console.log(error)
   }
}  
export const deleteTest = async (id: string) => {
   try {
      await axios.delete(`https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/test?testid=${id}`)
   } catch (error) {
      console.log(error)
   }
}