import { useState } from "react";
import {
  FaUserCircle,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [edit, setEdit] = useState(false);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: dbUser } = useQuery({
    queryKey: ["dbUser"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user.email}`);
      return data;
    },
  });

  const onSubmit = async (formData) => {
    try {
      const res = await axiosSecure.put(`/users/${user.email}`, formData);
      if (res.data.modifiedCount > 0) {
        toast.success("Profile Updated Successfully!");
        queryClient.invalidateQueries(["dbUser"]);

        setEdit(false);
      }
    } catch (error) {
      toast.error("Profile Updated Failed!",error.message);
    }

    console.log(formData);
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl w-full p-4 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-6 border-b dark:border-b-gray-200 pb-6">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              className="w-24 h-24 rounded-full border"
            />
          ) : (
            <FaUserCircle className="text-gray-500 w-24 h-24" />
          )}

          <div>
            <h1 className="text-2xl font-bold uppercase dark:text-white">{user.displayName}</h1>
            <button
              onClick={() => setEdit(!edit)}
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded-lg flex items-center gap-2"
            >
              <FaEdit /> Edit Profile
            </button>
          </div>
        </div>
        {/* Info Section */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <FaEnvelope className="text-blue-600 text-xl" />
            <p className="text-gray-700 dark:text-gray-200">{user.email}</p>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <FaPhone className="text-green-600 text-xl" />
            <p className="text-gray-700 dark:text-gray-200">
              {dbUser?.phone ? dbUser?.phone : "01xxxxxxxxx"}
            </p>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <FaMapMarkerAlt className="text-red-600 text-xl" />
            <p className="text-gray-700 dark:text-gray-200">
              {dbUser?.address ? dbUser?.address : "Update your address"}
            </p>
          </div>
        </div>

        {/* Edit Mode */}
        {edit && (
          <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-inner">
            <h2 className="font-bold text-xl mb-4 dark:text-gray-200">Edit Your Info</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <div className="flex flex-col space-y-1">
                <input
                  {...register("phone", { required: true })}
                  type="tel"
                  placeholder="your phone no ...."
                  className="input w-full dark:bg-gray-700 dark:placeholder-gray-300 dark:text-white"
                />
                {errors?.phone?.type === "required" && (
                  <span className="text-red-500 text-sm">
                    Phone no is Required
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-1">
                <input
                  {...register("address", { required: true })}
                  type="text"
                  placeholder="your address ...."
                  className="input w-full dark:bg-gray-700 dark:placeholder-gray-300 dark:text-white"
                />
                {errors?.address?.type === "required" && (
                  <span className="text-red-500 text-sm">
                    Address is Required
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="btn w-full bg-green-500 text-white"
              >
                U P D A T E
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
