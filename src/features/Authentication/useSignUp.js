import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignUp() {
    const { mutate, status } = useMutation({
        mutationFn: signUpApi,
        onSuccess: (user) => {
            console.log(user);
            toast.success(
                "Account created successfully! Please verify your account from the email address"
            );
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { signUp: mutate, isLoading: status === "pending" };
}
