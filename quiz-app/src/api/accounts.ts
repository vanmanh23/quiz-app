import axios from "axios"

interface userType{
    userName: string
    email: string
    password: string
}
interface accountType{
    email: string
    password: string
}

    export const createAccount = async (data: userType) => {
        try{
            await axios.post('https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/users/accounts', data);
        }catch(error){
            throw error;
        }
    }
    export const SignInfunction = async (data: accountType) => {
        try{
            const res = await axios.get(`https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/users/signIn?email=${data.email}&password=${data.password}`)
            return res.data;
        }catch(error){
            throw error;
        }
    }
