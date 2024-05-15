import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export default function useGetCabins() {
    const {
        isLoading,
        data: cabins,
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getCabins,
    });

    return { cabins, isLoading };
}