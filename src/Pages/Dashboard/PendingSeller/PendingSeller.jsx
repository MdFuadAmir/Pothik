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
      const res = await axiosSecure.get("/seller-application/pending-seller");
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
      title: `Are you sure to ${status === 'accepted' ? 'Accepted' : 'Rejected'} this seller?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
    });
    if (!confirm.isConfirmed) return;
    await axiosSecure.patch(`/seller-application/${id}/status`, { status: status === 'accepted' ? 'accepted' : 'rejected' });
    Swal.fire("Updated!", `Seller has been ${status} successfully.`, "success");
    refetch();
  };

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <SectionTitle
        sectionTitle={"Pending Sellers Aplications"}
        sectionSubTitle={"All Seller Applications"}
      ></SectionTitle>

      {/* Grid view */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sellers.map((seller) => (
          <div
            key={seller._id}
            className="card bg-indigo-50 shadow-md rounded-xl overflow-hidden border border-gray-200"
          >
            {/* Shop logo */}
            <figure className="bg-indigo-50">
              <img
                src={seller.image}
                alt={seller.shopName}
                className="w-full h-32 object-contain  mx-auto"
              />
            </figure>

            {/* Shop details */}
            <div className="card-body">
              <h3 className="font-bold text-lg">{seller.shopName}</h3>
              <p className="text-sm text-gray-600">
                <b>Owner Name:</b> {seller.ownerName}
              </p>
              <p className="text-sm text-gray-600">
                <b>Email:</b> {seller.email}
              </p>
              <p className="text-sm text-gray-600">
                <b>Phone:</b> {seller.phone}
              </p>
              <p className="text-sm text-gray-600">
                <b>NationalId:</b> {seller.nidNo}
              </p>
              <p className="text-sm text-gray-600">
                <b>Bank Account:</b> {seller.bankAccount}
              </p>
              <p className="text-sm text-gray-600">
                <b>Category:</b> {seller.category}
              </p>
              <p className="text-sm text-gray-600">
                <b>Address:</b> {seller.address}
              </p>
              <p className="text-sm text-gray-500">
                <b>sellerlied:</b>{" "}
                {new Date(seller.created_at).toLocaleDateString("en-GB")}
              </p>
              <div className="mt-3 flex items-center justify-between">
                {/* Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    seller.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : seller.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {seller.status}
                </span>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision(seller._id, "accepted")}
                    disabled={seller.status === "accepted"}
                    className="btn btn-success btn-xs flex items-center gap-1"
                  >
                    <FaCheck /> Accept
                  </button>
                  <button
                    onClick={() => handleDecision(seller._id, "rejected")}
                    disabled={seller.status === "rejected"}
                    className="btn btn-error btn-xs flex items-center gap-1"
                  >
                    <FaTimes /> Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sellers.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No seller applications found.
        </p>
      )}
    </div>
  );
};

export default PendingSeller;
