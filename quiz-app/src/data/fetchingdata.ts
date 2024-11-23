import { request } from "../utils/requests";
import { Test } from "./types";

export const  fetchData = async () => {
    try {
        const res = await request.get("/categories/clwavzdw400005auqfbptcur8");
        return res.data.data;
    } catch (error) {
        console.log("error when get data: ", error);
        throw error;
    }
}