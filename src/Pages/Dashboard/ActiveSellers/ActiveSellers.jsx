import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { MdStorefront } from "react-icons/md";
import Loading from "../../../Shared/Loading/Loading";
import ErrorePage from "../../../Shared/ErrorPage/ErrorePage";
import Swal from "sweetalert2";
import { FaCheckCircle, FaEye, FaTimesCircle } from "react-icons/fa";
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
      const res = await axiosSecure.get("/sellers/active-sellers");
      return res.data;
    },
  });
  const handleDeactivate = async (id, status) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: `${status === 'active' ? "This Seller will be deactivated!" : "This Seller will be Active!"}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: `Yes, ${status}!`,
      });
      if (!confirm.isConfirmed) return;

      await axiosSecure.patch(`/sellers/${id}/status`, {
        status: status === "active" ? "active" : "inActive",
      });
      Swal.fire("Done!", "this Shop has been deactivated.", "success");
      refetch(); // refresh list
    } catch (error) {
      Swal.fire("Error", "Could not deactivate This Shop", error);
    }
  }; // 🔹 View Seller Info
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

  if (isLoading) return <Loading></Loading>;
  if (isError) return <ErrorePage></ErrorePage>;

  return (
    <div className="p-6">
      <SectionTitle
        sectionTitle={"Active Sellers"}
        sectionSubTitle={
          "Manage and monitor all active sellers in the marketplace."
        }
      ></SectionTitle>

      {/* 🧾 Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-indigo-950 text-white">
            <tr>
              <th>#</th>
              <th>Shop Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.length > 0 ? (
              sellers.map((seller, index) => (
                <tr key={seller._id} className="hover:bg-indigo-50">
                  <td>{index + 1}</td>
                  <td>{seller.shopName}</td>
                  <td>{seller.email}</td>
                  <td>{seller.phone}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        seller.status === "active"
                          ? "bg-green-100 text-green-700"
                          : seller.status === "inActive"
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
                    {/* 🟢 Active button - only active when seller is inactive */}
                    <button
                      onClick={() => handleDeactivate(seller._id, "active")}
                      className="btn btn-xs btn-success flex items-center gap-1"
                      disabled={seller.status === "active"}
                    >
                      <FaCheckCircle /> Active
                    </button>
                    {/* in active btn */}
                    <button
                      onClick={() => handleDeactivate(seller._id,'inActive')}
                      className="btn btn-xs btn-error"
                      disabled={seller.status === "inActive"}
                    >
                      <FaTimesCircle  /> InActive
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
