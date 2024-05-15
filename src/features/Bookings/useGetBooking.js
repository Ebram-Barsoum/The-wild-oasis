/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export default function useGetBooking() {
    const { id } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ['booking', id],
        queryFn: () => getBooking(id),
    });

    return { data: data?.data, isLoading };
}