import toast from "react-hot-toast";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";
const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async ({ email, role }) => {
      const { data } = await axiosSecure.patch(`/users/update/${email}`, {
        role,
      });
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("user update successfully");
    },
  });

  const handleRoleChange = async (email, role) => {
    try {
      await mutateAsync({ email, role });
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">Manage Your Users</h2>
        <p className="text-sm text-gray-500">
          A smart, lightweight platform crafted for travelers and explorers.
          Navigate, discover, and manage everything with ease.
        </p>
      </div>
      <div className="overflow-x-auto mt-6  mx-auto bg-gray-100 rounded">
        <table className="table">
          {/* head */}
          <thead className="bg-gray-700 text-white">
            <tr>
              <th>#</th>
              <th>User Id</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user?._id}</td>
                <td>{user?.email}</td>
                <td>
                  {user?.role === "user" ? (
                    <span className="text-amber-700 bg-amber-200 px-2 py-1 rounded-full">
                      {user?.role}
                    </span>
                  ) : user?.role === "seller" ? (
                    <span className="text-red-700 bg-red-200 px-2 py-1 rounded-full">
                      {user?.role}
                    </span>
                  ) : user?.role === "admin" ? (
                    <span className="text-purple-700 bg-purple-200 px-2 py-1 rounded-full">
                      {user?.role}
                    </span>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  {user.status === "verified" ? (
                    <span className="px-2 py-1 rounded-full bg-green-200 text-green-700">
                      Verified
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-red-200 text-red-700">
                      Requested
                    </span>
                  )}
                </td>
                <td>
                  <select
                    onChange={(sellected) =>
                      handleRoleChange(user.email, sellected.target.value)
                    }
                    defaultValue="Update Role"
                    className="select bg-gray-100 text-gray-600 text-xs"
                  >
                    <option disabled={true}>Update Role</option>
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
