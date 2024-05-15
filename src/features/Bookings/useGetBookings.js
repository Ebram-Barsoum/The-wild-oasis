
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { RESULTS_PER_PAGE } from "../../ui/Pagination";

export default function useGetBookings() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    // FILTER
    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue, method: "eq" };

    // SORT
    const sortQuery = searchParams.get("sortBy") || "startDate-asc";
    const [sortField, direction] = sortQuery.split("-");
    const sortBy = { sortField, direction };

    // PAGINATION
    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
    const { data: { bookings, count } = {}, isLoading } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    // PRE-FETCHING
    const pageCount = Math.ceil(count / RESULTS_PER_PAGE);
    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
        });

    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filter, sortBy, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
        });
    }

    return { bookings, count, isLoading };
}
