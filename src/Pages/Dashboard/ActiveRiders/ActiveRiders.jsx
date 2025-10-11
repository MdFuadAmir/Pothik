import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaCheckCircle, FaEye, FaTimesCircle } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";
import ErrorePage from "../../../Shared/ErrorPage/ErrorePage";
import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";
const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  // Fetch active riders
  const {
    data: riders = [],
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["active-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active-riders");
      return res.data;
    },
  });

  const handleDeactivate = async (id, status) => {
    try {
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: `${
          status === "active"
            ? "This rider will be deactivated!"
            : "This rider will be Active!"
        }`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: `Yes, ${status} `,
      });
      if (!confirm.isConfirmed) return;

      await axiosSecure.patch(`/riders/${id}/status`, {
        status: status === "active" ? "active" : "inActive",
      });
      Swal.fire("Done!", "Rider has been deactivated.", "success");
      refetch(); // refresh list
    } catch (error) {
      Swal.fire("Error", "Could not deactivate rider", error);
    }
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

  if (isLoading) return <Loading></Loading>;
  if (isError) return <ErrorePage></ErrorePage>;

  return (
    <div className="overflow-x-auto p-6">
      <SectionTitle
        sectionTitle={"Active Riders"}
        sectionSubTitle={
          "Manage and monitor all active riders in the delivery network."
        }
      ></SectionTitle>
      <table className="table w-full">
        <thead className="bg-indigo-950 text-white">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
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
              <td>{rider.contact}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    rider.status === "active"
                      ? "bg-green-100 text-green-700"
                      : rider.status === "inActive"
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
                  onClick={() => handleDeactivate(rider._id, "active")}
                  className="btn btn-success btn-xs flex items-center gap-1"
                  disabled={rider.status === "active"}
                >
                  <FaCheckCircle /> Active
                </button>
                <button
                  onClick={() => handleDeactivate(rider._id,'inActive')}
                  className="btn btn-error btn-xs flex items-center gap-1"
                  disabled={rider.status === "inActive"}
                >
                  <FaTimesCircle /> InActive
                </button>
              </td>
            </tr>
          ))}
          {riders.length === 0 && (
            <tr>
              <td colSpan="9" className="text-center text-gray-500 py-6">
                No active riders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveRiders;
