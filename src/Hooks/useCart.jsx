import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useCart = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { data: cart = [], isLoading, refetch } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosInstance.get(`/cart?email=${user.email}`);
      return res.data;
    },
  });

  return { cart, isLoading, cartRefetch: refetch };
};

export default useCart;
