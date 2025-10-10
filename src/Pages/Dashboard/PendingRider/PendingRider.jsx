import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";
import Swal from "sweetalert2";
import { FaCheckCircle, FaEye, FaTimesCircle } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Shared/Loading/Loading";

const PendingRider = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  // Get all Riders applications (sorted by latest)
  const { data: riders = [],isLoading } = useQuery({
    queryKey: ["ridersApplications",user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders-application");
      return res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
  });
  if(isLoading){
    return <Loading></Loading>
  }
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
  // Handle approve/reject action
  const handleStatusChange = () => {};

  return (
    <div className="p-6">
      <SectionTitle
        sectionTitle="Prnding Rider"
        sectionSubTitle="Review rider applications and approve or reject them."
      />

      <div className="overflow-x-auto">
        <table className="table w-full text-center">
          <thead className="bg-indigo-950 text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id} className="hover:bg-indigo-50">
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.age}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      rider.status === "accepted"
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
                    className="btn  btn-info"
                  >
                    <FaEye color="white" />
                  </button>
                  <button
                    onClick={() => handleStatusChange(rider._id)}
                    className="btn bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                  >
                    <FaCheckCircle /> Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(rider._id)}
                    className="btn bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
                  >
                    <FaTimesCircle /> Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRider;
