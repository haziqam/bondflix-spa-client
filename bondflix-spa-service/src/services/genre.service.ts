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

export async function deleteGenre(genreId: number): Promise<ResponseData> {
    try {
        const response = await axiosInstance.delete(`/genres/${genreId}`, {
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

export async function addGenre(genreName: string): Promise<ResponseData> {
    try {
        const response = await axiosInstance.post(
            "/genres",
            {
                name: genreName,
            },
            {
                withCredentials: true,
            }
        );
        console.log(response.data);
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
