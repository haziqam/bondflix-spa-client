import { useEffect } from "react";
import { autoLogin } from "../../services/auth.service";

export function useAutoLogin() {
    useEffect(() => {
        autoLogin().then((response) => {
            if (response.success) {
                // redirect to main
            }
        });
    }, []);
}
