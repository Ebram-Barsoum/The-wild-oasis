/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useDeleteBooking() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate, status } = useMutation({
        mutationFn: (id) => deleteBooking(id),
        onSuccess: () => {
            toast.success(`Booking deleted successfully`);
            queryClient.invalidateQueries({
                active: true
            });
            navigate('/bookings');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });


    return { deleteBooking: mutate, isDeletingBooking: status === 'pending' };
}