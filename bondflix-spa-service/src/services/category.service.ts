import axiosInstance from "../lib/axios/axios";
import axios from "axios";

export async function getAllCategories(): Promise<ResponseData> {
    try {
        const response = await axiosInstance.get("/categories", {
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
