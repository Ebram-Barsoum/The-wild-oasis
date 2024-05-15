import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useCheckOut() {
    const queryClient = useQueryClient();

    const { mutate: checkOut, status } = useMutation({
        mutationKey: ['bookings'],
        mutationFn: (id) => updateBooking(id, { status: 'checked-out' }),

        onSuccess: ({ data }) => {
            toast.success(`Booking #${data.id} checked out successfully`);

            queryClient.invalidateQueries({
                active: true
            });

        },
        onError: () =>
            toast.error("Booking couldn't be checked out..!")

    });


    return { checkOut, isCheckingOut: status === 'pending' };
}