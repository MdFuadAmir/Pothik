import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { FaCheck, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Shared/Loading/Loading";

const AssignSeller = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();


  // Get all seller applications (sorted by latest)
  const { data: applications = [], refetch,isLoading } = useQuery({
    queryKey: ["sellerApplications",user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/seller-application");
      return res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
  });
  if(isLoading){
    return <Loading></Loading>
  }

  // Handle approve/reject action
  const handleAction = async (id, status) => {
    const confirm = await Swal.fire({
      title: `Are you sure to ${status} this seller?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/seller-application/${id}`, { status });
      Swal.fire(
        "Updated!",
        `Seller has been ${status} successfully.`,
        "success"
      );
      refetch();
    }
  };

  return (
    <div className="p-6 bg-base-100 min-h-screen">
        <SectionTitle sectionTitle={'Assign Sellers'} sectionSubTitle={'Seller Applications'}></SectionTitle>

      {/* Grid view */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="card bg-indigo-50 shadow-md rounded-xl overflow-hidden border border-gray-200"
          >
            {/* Shop logo */}
            <figure className="bg-indigo-50">
              <img
                src={app.image}
                alt={app.shopName}
                className="w-full h-32 object-contain  mx-auto"
              />
            </figure>

            {/* Shop details */}
            <div className="card-body">
              <h3 className="font-bold text-lg">{app.shopName}</h3>
              <p className="text-sm text-gray-600">
                <b>Owner Name:</b> {app.ownerName}
              </p>
              <p className="text-sm text-gray-600">
                <b>Email:</b> {app.email}
              </p>
              <p className="text-sm text-gray-600">
                <b>Phone:</b> {app.phone}
              </p>
              <p className="text-sm text-gray-600">
                <b>NationalId:</b> {app.nidNo}
              </p>
              <p className="text-sm text-gray-600">
                <b>Bank Account:</b> {app.bankAccount}
              </p>
              <p className="text-sm text-gray-600">
                <b>Category:</b> {app.category}
              </p>
              <p className="text-sm text-gray-600">
                <b>Address:</b> {app.address}
              </p>
              <p className="text-sm text-gray-500">
                <b>Applied:</b>{" "}
                {new Date(app.createdAt).toLocaleDateString("en-GB")}
              </p>
              <div className="mt-3 flex items-center justify-between">
                {/* Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    app.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : app.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {app.status}
                </span>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(app._id, "accepted")}
                    disabled={app.status === "accepted"}
                    className="btn btn-success btn-xs flex items-center gap-1"
                  >
                    <FaCheck /> Accept
                  </button>
                  <button
                    onClick={() => handleAction(app._id, "rejected")}
                    disabled={app.status === "rejected"}
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

      {applications.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No seller applications found.
        </p>
      )}
    </div>
  );
};

export default AssignSeller;
