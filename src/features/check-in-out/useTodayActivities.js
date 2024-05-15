import { useQuery } from "@tanstack/react-query";
import { getTodayActivities } from "../../services/apiBookings";

export default function useTodayActivities() {
    const { data: todayActivities, isLoading } = useQuery({
        queryKey: ['today-activities'],
        queryFn: getTodayActivities
    });

    return { todayActivities, isLoading };
}