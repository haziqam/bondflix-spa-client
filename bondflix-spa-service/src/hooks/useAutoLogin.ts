import { useNavigate } from "react-router-dom";
import { useAuthorize } from "./useAuthorize";

export function useAutoLogin(isInLoginPage: boolean = false) {
    const { isAuthorized, isLoading } = useAuthorize();
    const navigate = useNavigate();
    if (!isLoading) {
        if (isAuthorized === true) {
            setTimeout(() => {
                navigate("/dashboard");
            }, 3000);
        } else if (!isInLoginPage && isAuthorized === false) {
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        }
    }
}
