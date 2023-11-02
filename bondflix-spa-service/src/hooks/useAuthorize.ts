import { authorize } from "../services/auth.service";
import { useQuery } from "@tanstack/react-query";

export function useAuthorize() {
    const query = useQuery({ queryKey: ["AUTHORIZE"], queryFn: authorize });
    // console.log(`Query data right now: ${query.data}`);
    return query.data?.success;
}
