import axiosInstance from "../lib/axios/axios";
import axios from "axios";

export async function getSubscribers(userId: number): Promise<ResponseData> {
    try {
        const response = await axiosInstance.get(
            `/subscriptions/subscribers/${userId}`,
            {
                withCredentials: true,
            }
        );
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

export async function isUserSubscribed(
    creatorId: number
): Promise<ResponseData> {
    try {
        const response = await axiosInstance.get(
            `/subscriptions/is_subscribed/${creatorId}`,
            {
                withCredentials: true,
            }
        );
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

export async function subscribe(creatorId: number): Promise<ResponseData> {
    try {
        const response = await axiosInstance.post(
            `/subscriptions/subscribe/${creatorId}`,null, {withCredentials: true}
        );
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
