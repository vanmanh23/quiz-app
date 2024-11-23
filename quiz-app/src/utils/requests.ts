import axios from "axios";

const BASE_URL = process.env.QUIZ_APP_API || 'http://localhost:3000/api'

export const request = axios.create({
    baseURL: "http://quiz-app-api-one.vercel.app/api",
    timeout: 30000,
    withCredentials: true
  })