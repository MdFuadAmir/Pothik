import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdStorefront } from "react-icons/md";
import Loading from "../../../Shared/Loading/Loading";
import ErrorePage from "../../../Shared/ErrorPage/ErrorePage";
import Swal from "sweetalert2";
import { FaTimesCircle } from "react-icons/fa";
import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";

const ActiveSellers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: sellers = [],
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["active-seller"],
    queryFn: async () => {
      const res = await axiosSecure.get("/seller-application/accepted");
      return res.data;
    },
  });
  const handleDeactivate = async (id,) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "This rider will be deactivated!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, deactivate!",
      });
      if (!confirm.isConfirmed) return;

      await axiosSecure.patch(`/seller-application/${id}/status`, { status: "deactivated" });
      Swal.fire("Done!", "this Shop has been deactivated.", "success");
      refetch(); // refresh list
    } catch (error) {
      Swal.fire("Error", "Could not deactivate This Shop", error);
    }
  };

  if (isLoading)
    return <Loading></Loading>;
  if (isError)
    return (
      <ErrorePage></ErrorePage>
    );

  return (
    <div className="p-6">
        <div className="flex justify-center gap-2">
        <MdStorefront className="text-green-400 text-3xl" />
      <SectionTitle sectionTitle={'Active Sellers'}></SectionTitle>
        </div>
      {/* 🧾 Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              <th>#</th>
              <th>Shop Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Category</th>
              <th>Joined</th>
              <th>Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {sellers.length > 0 ? (
              sellers.map((seller, index) => (
                <tr key={seller._id} className="hover:bg-gray-700 hover:text-white duration-300">
                  <td>{index + 1}</td>
                  <td>{seller.shopName}</td>
                  <td>{seller.email}</td>
                  <td>{seller.phone}</td>
                  <td>{new Date(seller.created_at).toLocaleDateString()}</td>
                  <td>{seller.status}</td>
                  <td>
                    <button
                  onClick={() => handleDeactivate(seller._id)}
                  className="btn btn-xs btn-error text-white"
                >
                  <FaTimesCircle color="white" /> Deactivate
                </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No active sellers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveSellers;
