import { useNavigate } from "react-router-dom";
import { useAuthorize } from "./useAuthorize";

export function useAutoLogin() {
    const isAuthorized = useAuthorize();
    const navigate = useNavigate();
    if (isAuthorized === true) {
        setTimeout(() => {
            navigate("/dashboard");
        }, 3000);
    } else if (isAuthorized === false) {
        setTimeout(() => {
            navigate("/login");
        }, 3000);
    }
}
