import axiosInstance from "../lib/axios/axios";
import axios from "axios";

export async function getUser(userId: number): Promise<ResponseData> {
    try {
        const response = await axiosInstance.get(`/users/${userId}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.message,
                data: error.response?.data,
                status: error.response?.status,
            };
        } else {
            return {
                success: false,
                message: (error as Error).message,
                data: null,
            };
        }
    }
}

export async function searchChannel(query: string): Promise<ResponseData> {
    try {
        const uri = encodeURI(`/users/search?name=${query}`)
        const response = await axiosInstance.get(uri, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.message,
                data: error.response?.data,
                status: error.response?.status,
            };
        } else {
            return {
                success: false,
                message: (error as Error).message,
                data: null,
            };
        }
    }
}