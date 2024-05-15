import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateSEttings() {
    const queryClient = useQueryClient();

    const { mutate, status } = useMutation({
        mutationFn: updateSettings,
        onSuccess: () => {
            toast.success('Setting updated successfully');
            queryClient.invalidateQueries({
                queryKey: ['settings'],
            });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { updateSettings: mutate, isUpdating: status === 'pending' };
}