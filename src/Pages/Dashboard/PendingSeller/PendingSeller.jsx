import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { FaCheck, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Shared/Loading/Loading";

const PendingSeller = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // Get all seller applications (sorted by latest)
  const {
    data: sellers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["pending-seller", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/sellers/pending-sellers");
      return res.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }

  // Handle approve/reject action
  const handleDecision = async (id, status) => {
    const confirm = await Swal.fire({
      title: `Are you sure to ${
        status === "active" ? "Active" : "Reject"
      } this seller?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
    });
    if (!confirm.isConfirmed) return;
    await axiosSecure.patch(`/sellers/${id}/status`, {
      status: status === "active" ? "active" : "rejected",
    });
    Swal.fire("Updated!", `Seller has been ${status} successfully.`, "success");
    refetch();
  };

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <SectionTitle
        sectionTitle={"Pending Sellers Aplications"}
        sectionSubTitle={"All Seller Applications"}
      ></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table w-full text-center border border-gray-200">
          <thead className="bg-indigo-950 text-white">
            <tr>
              <th>#</th>
              <th>Shop Name</th>
              <th>Email</th>
              <th>phone</th>
              <th>Apply Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, index) => (
              <tr key={seller._id} className="hover:bg-indigo-50">
                <td>{index + 1}</td>
                <td>{seller.shopName}</td>
                <td>{seller.email}</td>
                <td>{seller.phone}</td>
                <td>
                  {new Date(seller.created_at).toLocaleDateString("en-GB")}
                </td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      seller.status === "active"
                        ? "bg-green-100 text-green-700"
                        : seller.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {seller.status}
                  </span>
                </td>
                <td className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleDecision(seller._id, "active")}
                    className="btn btn-success btn-xs flex items-center gap-1"
                  >
                    <FaCheck /> Active
                  </button>
                  <button
                    onClick={() => handleDecision(seller._id, "rejected")}
                    className="btn btn-error btn-xs flex items-center gap-1"
                  >
                    <FaTimes /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sellers.length === 0 && (
          <p className="text-center text-gray-500 mt-5">
            No seller applications found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PendingSeller;
