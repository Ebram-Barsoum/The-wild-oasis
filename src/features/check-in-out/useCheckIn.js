/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useCheckIn() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: checkIn, status } = useMutation({
        mutationKey: ["bookings"],
        mutationFn: ({ bookingId, breakfast }) =>
            updateBooking(bookingId, { isPaid: true, status: "checked-in", ...breakfast }),

        onSuccess: ({ data }) => {
            toast.success(`Booking #${data.id} is checked in successfully`);

            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });

            navigate("/bookings");
        },

        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { checkIn, isCheckingIn: status === "pending" };
}
