import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import CompoLoading from "../../../../Components/CompoLoading/CompoLoading";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState(""); // live search input
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 🔹 Debounce setup (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // 🔹 Fetch users with live search
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", debouncedSearch],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users${debouncedSearch ? `?search=${debouncedSearch}` : ""}`
      );
      return res.data;
    },
  });

  // 🔹 Update user role mutation
  const { mutateAsync } = useMutation({
    mutationFn: async ({ email, role }) => {
      const { data } = await axiosSecure.patch(`/users/update/${email}`, {
        role,
      });
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("User role updated successfully");
    },
  });

  const handleRoleChange = async (email, role) => {
    try {
      await mutateAsync({ email, role });
    } catch (error) {
      toast.error("Failed to update role");
      console.log(error);
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold dark:text-white">Manage Your Users</h2>
        <p className="text-sm text-gray-500">
          A smart, lightweight platform crafted for travelers and explorers.
          Navigate, discover, and manage everything with ease.
        </p>
      </div>

      {/* Search input */}
      <div className="my-4">
        <input
          type="text"
          placeholder="Search by email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/2"
        />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto mt-6 mx-auto bg-gray-500/20 dark:bg-gray-500/10 rounded">
        <table className="table w-full">
          <thead className="text-white bg-gray-500/40 dark:bg-gray-500/40">
            <tr>
              <th>#</th>
              <th>User ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="dark:text-gray-300">
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500 font-bold text-xl"
                >
                  <CompoLoading />
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.role === "user"
                          ? "bg-amber-200 text-amber-700"
                          : user.role === "seller"
                          ? "bg-red-200 text-red-700"
                          : "bg-purple-200 text-purple-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "verified"
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      {user.status === "verified" ? "Verified" : "Requested"}
                    </span>
                  </td>
                  <td>
                    <select
                      onChange={(e) =>
                        handleRoleChange(user.email, e.target.value)
                      }
                      defaultValue="Update Role"
                      className="select bg-gray-100 text-gray-600 text-xs"
                    >
                      <option disabled>Update Role</option>
                      <option value="user">User</option>
                      <option value="seller">Seller</option>
                      <option value="admin">Admin</option>
                    </select>
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

export default ManageUsers;
