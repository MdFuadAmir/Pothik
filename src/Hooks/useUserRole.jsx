import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: role = {},//"user"
    refetch,
    isLoading:roleLoading
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading,//!roleLoading && !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/role/${user?.email}`);
        return res?.data?.role
      } catch (err) {
        console.error("Failed to fetch user role:", err);
        throw err;
      }
    },
    retry: 1,
  });
  return { role,refetch,roleLoading };
};

export default useUserRole;
