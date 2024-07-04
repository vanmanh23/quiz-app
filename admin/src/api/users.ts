import axios from "axios"

export const getAllUsers = async () => {
    try {
        const res = await axios.get('https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/users/accounts');
        return res.data.user;
    } catch (error) {
        console.log(error)
    }
}
export const getAchievements = async () => {
    try {
        const res = await axios.get('https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/users/test');
        return res.data.test;
    } catch (error) {
        console.log(error)
    }
}
export const RemoveAchievement = async (id: string) => {
    try {
        await axios.delete(`https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/users/test?id=${id}`)
    } catch (error) {
        console.log(error)
    }
}
export const RemoveUser = async (id: string) => {
    try {
        await axios.delete(`https://nodejs-serverless-function-express-omega-sepia-99.vercel.app/api/users/accounts?id=${id}`)
    } catch (error) {
        console.log(error)
    }
}