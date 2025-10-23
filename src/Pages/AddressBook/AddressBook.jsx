import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaPlus, FaTrashAlt, FaCheckCircle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";
import { FaLocationPin } from "react-icons/fa6";
import { useForm } from "react-hook-form";

const AddressBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  // Fetch all addresses for current user
  const { data: address = [], isLoading } = useQuery({
    queryKey: ["addresses", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/address/${user.email}`);
      return res.data;
    },
  });

  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be add this address in your book",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it",
    }).then((result) => {
      if (result.isConfirmed) {
        const newAddress = {
          ...data,
          buyerEmail: user?.email,
          createdAt: new Date().toISOString(),
        };
        console.log(newAddress);
        axiosSecure
          .post("/address", newAddress)
          // todo: redirect to my products page
          .then((res) => {
            if (res.data.insertedId) {
              console.log(res.data);
              Swal.fire({
                title: "success!",
                text: "Your product has been added",
                icon: "success",
              });
            }
          });
      }
    });
  };

  // Delete address
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This address will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/address/${id}`);
      queryClient.invalidateQueries(["address", user?.email]);
      Swal.fire("Deleted!", "Address removed successfully.", "success");
    }
  };

  // Set default address
  const handleSetDefault = async (id) => {
    await axiosSecure.patch(`/address/default/${user.email}`, { id });
    queryClient.invalidateQueries(["address", user?.email]);
    Swal.fire("Updated", "Default address updated successfully!", "success");
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-indigo-200 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-900 flex items-center">
          <FaLocationPin /> My Address Book
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="btn bg-indigo-600 text-white hover:bg-indigo-700"
        >
          <FaPlus className="mr-2" /> Add New Address
        </button>
      </div>

      {address.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No address found 😴</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {address.map((addr) => (
            <div
              key={addr._id}
              className={`p-4 rounded-lg border-2 ${
                addr.isDefault
                  ? "border-green-500 bg-green-100"
                  : " bg-indigo-950 border-none"
              } shadow`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1 text-gray-400">
                  <h3>
                    Name: <span className="text-amber-600">{addr.name}</span>
                  </h3>
                  <p className="text-sm">
                    Phone: <span className="text-indigo-400">{addr.phone}</span>
                  </p>
                  <p className="text-sm">
                    City: <span className="text-indigo-400">{addr.city}</span>
                  </p>
                  <p className="text-sm">
                    PostCode:{" "}
                    <span className="text-indigo-400">{addr.postCode}</span>
                  </p>
                  <p className="text-sm">
                    Address:{" "}
                    <span className="text-indigo-400">{addr.address}</span>
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefault(addr._id)}
                      className="btn btn-xs bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Set Default
                    </button>
                  )}
                  {addr.isDefault && (
                    <span className="text-green-600 flex items-center gap-1 text-sm font-semibold">
                      <FaCheckCircle /> Default
                    </span>
                  )}
                  <button
                    onClick={() => handleDelete(addr._id)}
                    className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal for Add New Address */}
      {showModal && (
        <div className="fixed inset-0 bg-indigo-200 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-indigo-950 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-indigo-200">
              Add New Address
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* name */}
              <div>
                <label className="text-gray-400 font-semibold text-sm">
                  Shop Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  value={user?.displayName || "N/A"}
                  readOnly
                  className="input input-bordered w-full"
                />
                {errors.name?.type === "required" && (
                  <span className="text-red-500">shop name is required</span>
                )}
              </div>
              {/*  phone numberv*/}
              <div>
                <label className="text-gray-400 font-semibold text-sm">
                  Phone Number
                </label>
                <input
                  {...register("phone", { required: true })}
                  type="text"
                  placeholder="phone number"
                  className="input input-bordered w-full"
                />
                {errors.phone?.type === "required" && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              {/* city */}
              <div>
                <label className="text-gray-400 font-semibold text-sm">
                  city
                </label>
                <input
                  {...register("city", { required: true })}
                  type="text"
                  placeholder="your city"
                  className="input input-bordered w-full"
                />
                {errors.city?.type === "required" && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              {/* {/* post code */}
              <div>
                <label className="text-gray-400 font-semibold text-sm">
                  full address
                </label>
                <input
                  {...register("address", { required: true })}
                  type="text"
                  placeholder="kushtia kataukhana more, kushtia"
                  className="input input-bordered w-full"
                />
                {errors.address?.type === "required" && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              {/* {/* post code*/}
              <div>
                <label className="text-gray-400 font-semibold text-sm">
                  Post Code
                </label>
                <input
                  {...register("postCode", { required: true })}
                  type="text"
                  placeholder="postCode"
                  className="input input-bordered w-full"
                />
                {errors.postCode?.type === "required" && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressBook;
