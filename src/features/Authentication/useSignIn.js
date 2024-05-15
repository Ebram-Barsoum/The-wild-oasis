/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signIn } from "../../services/apiAuth";

export default function useSignIn() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: logIn, status } = useMutation({
        mutationFn: (user) => signIn(user),
        onSuccess: ({ user }) => {
            queryClient.setQueryData(['current-user'], user);
            navigate('/dashboard');
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    return { logIn, isLogingIn: status === 'pending' };
}