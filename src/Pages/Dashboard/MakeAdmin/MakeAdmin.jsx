import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaUserMinus, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../../Shared/Loading/Loading";

const MakeAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [emailQuery, setEmailQuery] = useState("");

  const { data: users = [],refetch,isLoading } = useQuery({
    queryKey: ["searchUsers", emailQuery],
    enabled: !!emailQuery,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
      return res.data;
    },
  });

     const { mutateAsync: updateRole } = useMutation({
    mutationFn: async ({ id, role }) => {
      await axiosSecure.patch(`/users/${id}/role`, { role });
    },
    onSuccess: () => {
      refetch();
    },
  });

   // Handle make admin
  const handleMakeAdmin = async (id, currentRole) => {
    const action = currentRole === "admin" ? "Remove Admin" : "Make Admin";
    const newRole = currentRole === "admin" ? "user" : "admin";

    const confirm = await Swal.fire({
      title: `${action}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
    if (!confirm.isConfirmed) return;
    try {
      await updateRole({ id, role: newRole });
      Swal.fire("Success!", `${action} successful`, "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update user role", error);
    }
  };
  if(isLoading){
    return <Loading></Loading>
  }

  return (
    <div className="p-6">
      <SectionTitle
        sectionTitle={"Make Admin"}
        sectionSubTitle={
          "Search users by email and grant or remove admin access easily."
        }
      ></SectionTitle>
      <div className="w-full md:w-1/2 mx-auto mb-4">
        <input
          type="text"
          value={emailQuery}
          onChange={(e) => setEmailQuery(e.target.value)}
          placeholder="Search with email ..."
          className="w-full input"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full text-center border border-gray-200">
          <thead className="bg-indigo-950 text-white">
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>CreatedAt</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user,index) => (
                <tr key={user._id} className=" hover:bg-indigo-50">
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded font-medium text-xs ${
                        user.role === "admin"
                          ? "bg-green-300 text-green-700"
                          : user.role === "seller"
                          ? "bg-indigo-300 text-indigo-700"
                          : user.role === "rider"
                          ? "bg-cyan-300 text-cyan-700"
                          : "bg-amber-300 text-amber-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="flex justify-center gap-2">
                    {
                      user.role === 'admin' ? (
                      <button
                        onClick={() => handleMakeAdmin(user._id, user.role)}
                        className="btn btn-xs btn-error flex items-center gap-2"
                      >
                        <FaUserMinus /> Remove Admin
                      </button>
                      ) : (
                      <button
                        onClick={() => handleMakeAdmin(user._id, user.role)}
                        className="btn btn-xs btn-success flex items-center gap-2"
                      >
                        <FaUserShield /> Make Admin
                      </button>
                      )
                    }
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-red-500">
                  No user found 😥
                </td>
              </tr>
            )}

            <tr className="hover:bg-indigo-50"></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MakeAdmin;
