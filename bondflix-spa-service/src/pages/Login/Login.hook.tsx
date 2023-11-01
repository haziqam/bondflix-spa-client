import { autoLogin } from "../../services/auth.service";
import { usePageNavigation } from "../../contexts/PageNavigation";
import { UserDashboard } from "../UserDashboard/UserDashboard";
import { useQuery } from "@tanstack/react-query";

export function useAutoLogin() {
    const { navigateTo } = usePageNavigation();
    const query = useQuery({ queryKey: ["AUTO-LOGIN"], queryFn: autoLogin });
    if (query.data?.success) {
        navigateTo(<UserDashboard />);
    }
    return query;
}
