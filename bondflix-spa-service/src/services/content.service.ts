import axios from "../lib/axios/axios";

export async function getAllContents(): Promise<ResponseData> {
    const response = await axios.get("/contents");
    return response.data;
}

export async function getContent(content_id: number): Promise<ResponseData> {
    const response = await axios.get(`/contents/${content_id}`, {
        withCredentials: true,
    });
    return response.data;
}
