import axiosInstance from "../lib/axios/axios";
import axios from "axios";

export async function getAllSponsors(): Promise<ResponseData> {
    try {
        const response = await axiosInstance.get("/sponsors", {
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

export async function deleteSponsor(sponsorId: number): Promise<ResponseData> {
    try {
        const response = await axiosInstance.delete(`/sponsors/${sponsorId}`, {
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

export type SponsorStatus =
    | "COMPANY"
    | "GOVERNMENT"
    | "INDIVIDUAL"
    | "ORGANIZATION";
export async function addSponsor(
    name: string,
    sponsorStatus: SponsorStatus,
    link: string
): Promise<ResponseData> {
    try {
        const response = await axiosInstance.post(
            "/sponsors",
            {
                name: name,
                sponsor_status: sponsorStatus,
                link: link,
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
