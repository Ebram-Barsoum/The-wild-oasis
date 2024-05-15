import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserData } from "../../services/apiAuth";

export default function useUpdateUser() {
    const queryClinet = useQueryClient();

    const { mutate, status } = useMutation({
        mutationFn: (newUser) => updateUserData(newUser),
        onSuccess: () => {
            queryClinet.invalidateQueries({
                queryKey: ['current-user'],
            });
            toast.success('User updated successfully');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { updateUser: mutate, isUpdating: status === 'pending' };
}