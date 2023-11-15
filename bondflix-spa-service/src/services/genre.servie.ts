import axiosInstance from "../lib/axios/axios";
import axios from "axios";

export async function getAllGenres(): Promise<ResponseData> {
    try {
        const response = await axiosInstance.get("/genres", {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        }
        return {
            success: false,
            message: (error as Error).message,
            data: null,
        };
    }
}
