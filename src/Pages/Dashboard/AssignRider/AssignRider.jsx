import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";



const AssignRider = () => {
    return (
        <div className="p-6">
            <SectionTitle sectionTitle={'Assign Riders'} sectionSubTitle={'Manage and allocate riders efficiently for smooth delivery.'}></SectionTitle>
             <div className="p-6 bg-white rounded-lg shadow-lg overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Rider Applications</h2>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Age</th>
            <th className="px-4 py-2 border">Contact</th>
            <th className="px-4 py-2 border">NID</th>
            <th className="px-4 py-2 border">Region</th>
            <th className="px-4 py-2 border">Vehicle</th>
            <th className="px-4 py-2 border">Work Location</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Applied At</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider) => (
            <tr key={rider._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{rider.name}</td>
              <td className="px-4 py-2 border">{rider.email}</td>
              <td className="px-4 py-2 border">{rider.age}</td>
              <td className="px-4 py-2 border">{rider.contact}</td>
              <td className="px-4 py-2 border">{rider.nid}</td>
              <td className="px-4 py-2 border">{rider.region}</td>
              <td className="px-4 py-2 border">{rider.vehicle}</td>
              <td className="px-4 py-2 border">{rider.workLocation}</td>
              <td className="px-4 py-2 border">
                <span
                  className={`px-2 py-1 rounded text-white ${
                    rider.status === "approved"
                      ? "bg-green-500"
                      : rider.status === "rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {rider.status}
                </span>
              </td>
              <td className="px-4 py-2 border">
                {new Date(rider.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

        </div>
    );
};

export default AssignRider;