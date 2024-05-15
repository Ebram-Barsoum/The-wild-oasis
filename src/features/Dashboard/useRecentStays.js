import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getStaysAfter } from "../../services/apiBookings";

export default function useRecentStays() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("last");

    const duration = !query ? 10 : query.split(" ").find((ele) => !isNaN(+ele));
    const date = subDays(new Date(), duration).toISOString();

    const { data, isLoading } = useQuery({
        queryFn: () => getStaysAfter(date),
        queryKey: ["recent-stays", `last-${duration}`],
    });

    const confirmedStays = data?.filter(
        (booking) =>
            booking.status === "checked-in" || booking.status === "checked-out"
    );

    return { recentStays: data, isLoading, confirmedStays, duration };
}
