import { useEffect, useState } from "react";
import { authorize } from "../services/auth.service";

export function useAuthorize() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const performAuthorization = async () => {
            const response = await authorize();
            setIsAuthorized(response.success);
            setIsLoading(false);
        };
        performAuthorization();
    }, []);

    return { isLoading, isAuthorized };
}
