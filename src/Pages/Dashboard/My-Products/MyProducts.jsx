import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";
import Loading from "../../../Shared/Loading/Loading";
import Swal from "sweetalert2";

const MyProducts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: products,isLoading,refetch} = useQuery({
    queryKey: ["my-products", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products?email=${user.email}`);
      return res.data;
    },
  });
  if(isLoading){
    return <Loading/>
  }
  const handleDelete = async(id) =>{
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      axiosSecure.delete(`/products/${id}`)
      .then((res) => {
        if (res.data.deletedCount) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      });
    }

  }
  return (
    <div className="p-4 md:p-8">
      <SectionTitle
        sectionTitle={"My Products"}
        sectionSubTitle={"Hear is my products"}
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products?.map((product) => (
        <div
          key={product._id}
          className="rounded-xl shadow-lg overflow-hidden border border-gray-700 ">
          <div className="relative">
            <img src={product.image} className="w-full h-40 object-cover" />
            <span className="absolute top-2 left-2 bg-blue-600 text-white  text-xs font-semibold px-3 py-1 rounded-full">
              {product.condition}
            </span>
            <span className="absolute top-2 right-2 bg-red-600 text-white  text-xs font-semibold px-3 py-1 rounded-full">
              {product.discount}%
            </span>
          </div>

          <div className="p-2 space-y-1">
            <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
              <p className="text-sm"><b>Category:</b> {product.category}</p>
            <p className="text-sm"><b>Brand:</b> {product.brand}</p>
            <div className="flex items-center justify-between">
              <div>
                <p>
                  <b>Discount Price:</b> <span className="text-lg font-bold text-green-500">৳{product.discountPrice}</span>
                </p>
                <p className="text-sm"> <b>Reguler Price:</b> <span className="text-red-500 line-through">৳{product.price}</span>
                </p>
              </div>
            </div>
            <div className="text-sm space-y-1">
              <p>
                <b>Stock:</b> {product.stock} pcs
              </p>
              <p className="flex flex-wrap gap-2">
                <b>Colors:</b> {product.color.split(",").map((clr,index) => <p key={index} className="bg-gray-700 text-white px-2 py-1 rounded-sm w-fit">{clr.trim()}</p>)} 
              </p>
              <p className="flex gap-2">
                <b>Sise:</b> {product.size.split(",").map((siz,index) => <p key={index} className="px-2 py-1 text-xs font-semibold bg-gray-700 text-white rounded-sm w-fit">{siz.trim()}</p>)} 
              </p>
              <p>
                <b>Warranty:</b> {product.warranty} months
              </p>
              <p>
                <b>Delivery:</b> {product.deliveryTime} days 
              </p>
              <p>
                <b>Return Policy:</b> {product.returnPolicy} days Easy Return
              </p>
            </div>

            <button onClick={() => handleDelete(product._id)} className="w-full bg-indigo-950 text-white py-2 mt-2 rounded-lg transition-colors duration-300 font-semibold"> Delete Product</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default MyProducts;
