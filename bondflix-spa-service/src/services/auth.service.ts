import axios from "../lib/axios/axios";

export async function login(data: LoginFormData): Promise<ResponseData> {
    try {
        const response = await axios.post("/auth/login", data, {
            withCredentials: true,
        });
        return response.data as ResponseData;
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message,
            data: null,
        };
    }
}

export async function authorize(): Promise<ResponseData> {
    try {
        const response = await axios.get("/auth/autologin", {
            withCredentials: true,
        });
        return response.data as ResponseData;
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message,
            data: null,
        };
    }
}

export async function logout(): Promise<ResponseData> {
    try {
        const response = await axios.get("/auth/logout", {
            withCredentials: true,
        });
        console.log(response.data);
        return response.data as ResponseData;
    } catch (error) {
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
        const response = await axios.post("/auth/register", data, {
            withCredentials: true,
        });
        return response.data as ResponseData;
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message,
            data: null,
        };
    }
}
