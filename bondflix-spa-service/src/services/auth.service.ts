import axiosInstance from "../lib/axios/axios";
import axios from "axios";
import Cookies from "js-cookie";

export async function login(data: LoginFormData): Promise<ResponseData> {
    try {
        const response = await axiosInstance.post("/auth/login", data, {
            withCredentials: true,
        });
        if (response.data.success) {
            Cookies.set("userId", response.data.data.userId);
        }
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
        if (response.data.success) {
            Cookies.remove("userId");
        }
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
        console.log(data);
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
