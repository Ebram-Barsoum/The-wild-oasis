import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useSignOut() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate, status } = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate('/login', { replace: true });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { logOut: mutate, isLoading: status === 'pending' };
}