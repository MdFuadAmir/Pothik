import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { FaCheck, FaEye, FaTimes } from "react-icons/fa";
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

  const handleView = (seller) => {
    Swal.fire({
      title: seller.shopName,
      html: `
          <div class="text-gray-700 text-start mb-2"><b>Owner:</b> ${
            seller.ownerName || "—"
          }</div>
          <div class="text-gray-700 text-start mb-2"><b>Email:</b> ${
            seller.email || "—"
          }</div>
          <div class="text-gray-700 text-start mb-2"><b>Phone:</b> ${
            seller.phone || "—"
          }</div>
          <div class="text-gray-700 text-start mb-2"><b>Category:</b> ${
            seller.category || "—"
          }</div>
          <div class="text-gray-700 text-start mb-2"><b>National Id:</b> ${
            seller.nidNo || "—"
          }</div>
          <div class="text-gray-700 text-start mb-2"><b>Bank Account:</b> ${
            seller.bankAccount || "—"
          }</div>
          <div class="text-gray-700 text-start mb-2"><b>Role:</b> ${
            seller.role || "—"
          }</div>
          <div class="text-gray-700 text-start mb-2"><b>Joined:</b> ${new Date(
            seller.created_at
          ).toLocaleDateString("en-GB")}</div>
        `,
      confirmButtonText: "Close",
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  // Handle approve/reject action
  const handleDecision = async (id, status, email) => {
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
      email,
    });
    Swal.fire("Updated!", `Seller has been ${status} successfully.`, "success");
    refetch();
  };

  return (
    <div className="p-6 bg-indigo-200 h-full">
      <SectionTitle
        sectionTitle={"Pending Sellers Aplications"}
        sectionSubTitle={"All Seller Applications"}
      ></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table w-full text-center border border-gray-200">
          <thead className="bg-gray-900 text-white">
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
          <tbody className="bg-indigo-950 text-white">
            {sellers.map((seller, index) => (
              <tr key={seller._id} className="hover:bg-indigo-900">
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
                  {/* 👁 View button - always active */}
                  <button
                    onClick={() => handleView(seller)}
                    className="btn btn-xs btn-info  flex items-center gap-1"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() =>
                      handleDecision(seller._id, "active", seller.email)
                    }
                    className="btn btn-success btn-xs flex items-center gap-1"
                  >
                    <FaCheck /> Active
                  </button>
                  <button
                    onClick={() =>
                      handleDecision(seller._id, "rejected", seller.email)
                    }
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
