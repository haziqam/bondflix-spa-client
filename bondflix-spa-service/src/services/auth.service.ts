import axios from "../lib/axios";

export async function login(data: LoginFormData): Promise<ResponseData> {
    try {
        const resposne = await axios.post("/auth/login", data, {
            withCredentials: true,
        });
        return resposne.data as ResponseData;
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message,
            data: null,
        };
    }
}

export async function autoLogin(): Promise<ResponseData> {
    try {
        const resposne = await axios.get("/auth/autologin", {
            withCredentials: true,
        });
        return resposne.data as ResponseData;
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message,
            data: null,
        };
    }
}

export function register() {}
