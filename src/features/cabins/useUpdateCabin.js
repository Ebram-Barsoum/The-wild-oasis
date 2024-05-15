import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useUpdateCabin() {
    const queryClient = useQueryClient();

    const { mutate, status: updatingStatus } = useMutation({
        mutationFn: ({ data: newCabin, editId, cabinInfo: oldCabin }) =>
            updateCabin(newCabin, editId, oldCabin),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            toast.success("Cabin is updated succesfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { updateCabin: mutate, updatingStatus };
}