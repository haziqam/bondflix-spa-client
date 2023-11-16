import axiosInstance from "../lib/axios/axios";
import axios from "axios";

export async function getAllContents(): Promise<ResponseData> {
    const response = await axiosInstance.get("/contents");
    return response.data;
}

export async function getContent(content_id: number): Promise<ResponseData> {
    try {
        const response = await axiosInstance.get(`/contents/${content_id}`, {
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

export async function createContent(
    uploadFormData: FormData
): Promise<ResponseData> {
    try {
        const response = await axiosInstance.post(`/contents`, uploadFormData, {
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

export async function getContentsByCreatorId(
    creatorId: number
): Promise<ResponseData> {
    try {
        const response = await axiosInstance.get(
            `contents/creator/${creatorId}`,
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

export async function deleteContent(contentId: number): Promise<ResponseData> {
    try {
        const response = await axiosInstance.delete(`contents/${contentId}`, {
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
