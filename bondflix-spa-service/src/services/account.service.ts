import axiosInstance from "../lib/axios/axios";
import axios from "axios";

export async function getAccountInfo(userId: number): Promise<ResponseData> {
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

export async function updateAccount(
    userId: number,
    updateAccountFormData: FormData
): Promise<ResponseData> {
    try {
        const response = await axiosInstance.put(
            `/users/${userId}`,
            updateAccountFormData,
            {
                withCredentials: true,
            }
        );
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
