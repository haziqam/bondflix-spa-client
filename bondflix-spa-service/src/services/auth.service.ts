import axiosInstance from "../lib/axios/axios";
import axios from "axios";

export async function login(data: LoginFormData): Promise<ResponseData> {
    try {
        const response = await axiosInstance.post("/auth/login", data, {
            withCredentials: true,
        });
        return response.data as ResponseData;
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

export async function authorize(): Promise<ResponseData> {
    try {
        const response = await axiosInstance.get("/auth/autologin", {
            withCredentials: true,
        });
        return response.data as ResponseData;
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

export async function logout(): Promise<ResponseData> {
    try {
        const response = await axiosInstance.get("/auth/logout", {
            withCredentials: true,
        });
        return response.data as ResponseData;
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

export async function register(data: RegisterFormData): Promise<ResponseData> {
    try {
        const response = await axiosInstance.post("/auth/register", data, {
            withCredentials: true,
        });
        return response.data as ResponseData;
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
