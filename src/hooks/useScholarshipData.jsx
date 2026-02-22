import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export const useScholarshipData = () => {
    const axiosPublic = useAxiosPublic();

    const { data = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["topScholarships"],
        queryFn: async () => {
            const res = await axiosPublic.get("/top-scholarships");
            return (res.data || []).filter(s => s && s.university_name);
        },
        retry: 2,
        retryDelay: 500,
    });

    return [data, isLoading, isError, refetch];
};

export default useScholarshipData;