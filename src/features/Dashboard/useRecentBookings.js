import { useQuery } from "@tanstack/react-query";
import { getBookingsAfter } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export default function useRecentBookings() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('last');

    const duration = (!query) ? 10 : query.split(' ').find((ele) => !isNaN(+ele));
    const date = subDays(new Date(), duration).toISOString();

    const { data, isLoading } = useQuery({
        queryFn: () => getBookingsAfter(date),
        queryKey: ['recent-bookings', `last-${duration}`]
    });

    return { recentBookings: data, isLoading };
}