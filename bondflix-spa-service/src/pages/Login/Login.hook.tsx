import { useNavigate } from "react-router-dom";
import { autoLogin } from "../../services/auth.service";
import { useQuery } from "@tanstack/react-query";

export function useAutoLogin() {
    const navigate = useNavigate();
    const query = useQuery({ queryKey: ["AUTO-LOGIN"], queryFn: autoLogin });
    query.data?.success ? navigate("/dashboard") : navigate("/login");
}
