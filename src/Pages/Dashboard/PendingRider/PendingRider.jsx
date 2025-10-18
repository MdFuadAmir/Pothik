import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";
import Swal from "sweetalert2";
import { FaCheckCircle, FaEye, FaTimesCircle } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Shared/Loading/Loading";

const PendingRider = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // Get all Riders applications (sorted by latest)
  const {
    data: riders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["pending-riders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending-riders");
      return res.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  const handleDecision = async (id,status,email) => {
    const confirm = await Swal.fire({
      title: `Are you sure to ${
        status === "active" ? "Active" : "Reject"
      } this seller?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${status}`,
    });
    if (!confirm.isConfirmed) return;
    await axiosSecure.patch(`/riders/${id}/status`, {
      status: status === "active" ? "active" : "rejected", 
      email
    });
    Swal.fire("Updated!", `Riders has been ${status} successfully.`, "success");
    refetch();
  };

  const handleView = (rider) => {
    Swal.fire({
      title: rider.name,
      html: `
        <div class="text-gray-700 text-start mb-2"><span class="text-gray-950 font-bold">Email:</span> ${
          rider.email || "—"
        }</div>
        <div class="text-gray-700 text-start mb-2"><span class="text-gray-950 font-bold">Contact:</span> ${
          rider.contact || "—"
        }</div>
        <div class="text-gray-700 text-start mb-2"><span class="text-gray-950 font-bold">District:</span> ${
          rider.workLocation || "—"
        }</div>
        <div class="text-gray-700 text-start mb-2"><span class="text-gray-950 font-bold">Region:</span> ${
          rider.region || "—"
        }</div>
        <div class="text-gray-700 text-start mb-2"><span class="text-gray-950 font-bold">Nid no:</span> ${
          rider.nid || "—"
        }</div>
        <div class="text-gray-700 text-start mb-2"><span class="text-gray-950 font-bold">Age:</span> ${
          rider.age || "—"
        }</div>
        
              
      `,
      confirmButtonText: "Close",
    });
  };

  return (
    <div className="p-6 bg-indigo-200 h-full">
      <SectionTitle
        sectionTitle="Pending Rider Applications"
        sectionSubTitle="Review rider applications and approve or reject them."
      ></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table w-full text-center">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Apply Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="bg-indigo-950 text-white">
            {riders.map((rider, index) => (
              <tr key={rider._id} className="hover:bg-indigo-900">
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.age}</td>
                <td>{new Date(rider.created_at).toLocaleDateString("en-GB")}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      rider.status === "active"
                        ? "bg-green-100 text-green-700"
                        : rider.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {rider.status}
                  </span>
                </td>
                <td className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleView(rider)}
                    className="btn btn-success btn-xs flex items-center gap-1"
                  >
                    <FaEye color="white" />
                  </button>
                  <button
                    onClick={() =>
                      handleDecision(rider._id, "active",rider.email)
                    }
                    className="btn btn-success btn-xs flex items-center gap-1"
                  >
                    <FaCheckCircle /> Active
                  </button>
                  <button
                    onClick={() =>
                      handleDecision(rider._id, "rejected",rider.email)
                    }
                    className="btn btn-error btn-xs flex items-center gap-1"
                  >
                    <FaTimesCircle /> Rejected
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {riders.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No Rider applications found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PendingRider;
