import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: roleData,
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email,
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      const role = res?.data?.role || "guest";
      console.log("role check",role);
      return role;
    },
  });


  return { role:roleData, roleLoading, refetch };
};

export default useRole;
