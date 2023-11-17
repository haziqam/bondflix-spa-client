import { useEffect, useState } from "react";
import { authorize } from "../services/auth.service";

export function useAuthorize() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        authorize().then((response) => {
            setIsAuthorized(response.success);
            setIsLoading(false);
        });
    }, []);

    return { isLoading, isAuthorized };
}
