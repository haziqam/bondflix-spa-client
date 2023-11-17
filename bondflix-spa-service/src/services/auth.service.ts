import axios from "../lib/axios";

export async function login(data: LoginFormData) {
    const resposne = await axios.post("/login", data);
}

export function register() {}
