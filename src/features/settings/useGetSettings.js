import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export default function useGetSettings() {
    const { data: settings, status } = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings
    });

    return { settings, isLoading: status === 'pending' };
}