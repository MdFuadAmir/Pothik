import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Card from "../Card/Card";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import CompoLoading from "../../../../Components/CompoLoading/CompoLoading";

const MyShop = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: products = [], isLoading,refetch } = useQuery({
    queryKey: ["product", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleUpdate = (product) => {
    navigate(`/dashboard/update-product/${product._id}`);
    refetch();
  };

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/products/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["product", user?.email]);
      toast.success("Product deleted successfully!");
      refetch()
    },
    onError: () => {
      toast.error("Failed to delete product");
    },
  });
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
    refetch()
  };
  if (isLoading) {
    return <CompoLoading />;
  }
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-1">My Shop ({products.length})</h2>
        <p className="text-sm text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
          necessitatibus tempore saepe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <Card
            key={product._id}
            product={product}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default MyShop;
