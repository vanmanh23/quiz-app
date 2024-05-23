import axios from "axios"

interface Image {
    url: string
    alt: string
    testid: string
}

export const createImage = async (data: Image) => {
    const res = await axios.post('https://quiz-app-server-omega.vercel.app/api/questions/image', data)
    return res.data
}