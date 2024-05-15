import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
    const queryClient = useQueryClient();
    const { mutate: createCabin, status: creatingStatus } = useMutation({
        mutationFn: addCabin,
        onSuccess: () => {
            toast.success("The new cabin added successfully");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (error) => toast.error(error.message),
    });

    return { createCabin, creatingStatus };
}