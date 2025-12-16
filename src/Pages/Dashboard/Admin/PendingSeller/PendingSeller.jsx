import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";

const PendingSeller = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["pending-sellers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/pending");
      return res.data.users;
    },
  });

  if (isLoading) return <Loading />;
  return (
    <div className="">
      <h2 className="text-2xl font-bold">Pending Seller Requests</h2>
      <p className="mb-6 text-sm text-gray-500">
        When you accept the seller request to coppy this emai. and go to manage
        users page and search the email and update to seller.
      </p>

      <div className="overflow-x-auto bg-white p-4 rounded-xl">
        <table className="table">
          <thead>
            <tr className="bg-gray-100">
              <th>#</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Requested Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No pending seller requests
                </td>
              </tr>
            ) : (
              data.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>
                    <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-700">
                      {user.status}
                    </span>
                  </td>
                  <td>
                    {user.sellerRequestedAt
                      ? new Date(user.sellerRequestedAt).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingSeller;
