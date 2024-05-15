import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export default function useCurrentUser() {
    const { data, isLoading } = useQuery({
        queryKey: ["current-user"],
        queryFn: getCurrentUser,
    });

    return {
        user: data,
        isLoading,
        isAuthenticated: data?.role === 'authenticated'
    };
}
