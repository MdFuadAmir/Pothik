import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";
import { FaPlus, FaTrashAlt, FaCheckCircle } from "react-icons/fa";

const AddressBook = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    postalCode: "",
  });

  // Fetch all addresses for current user
  const { data: addresses = [], isLoading } = useQuery({
    queryKey: ["addresses", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/addresses/${user.email}`);
      return res.data;
    },
  });

  // Add new address
  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const newAddress = {
        ...formData,
        userEmail: user.email,
        isDefault: addresses.length === 0, // প্রথম Address ডিফল্ট হবে
      };
      const res = await axiosSecure.post("/addresses", newAddress);
      if (res.data.insertedId) {
        Swal.fire("Success", "New address added successfully!", "success");
        setShowModal(false);
        setFormData({
          fullName: "",
          phone: "",
          addressLine: "",
          city: "",
          postalCode: "",
        });
        queryClient.invalidateQueries(["addresses", user?.email]);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add address", "error");
    }
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
      await axiosSecure.delete(`/addresses/${id}`);
      queryClient.invalidateQueries(["addresses", user?.email]);
      Swal.fire("Deleted!", "Address removed successfully.", "success");
    }
  };

  // Set default address
  const handleSetDefault = async (id) => {
    await axiosSecure.patch(`/addresses/default/${user.email}`, { id });
    queryClient.invalidateQueries(["addresses", user?.email]);
    Swal.fire("Updated", "Default address updated successfully!", "success");
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-indigo-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-900">📍 My Address Book</h2>
        <button
          onClick={() => setShowModal(true)}
          className="btn bg-indigo-600 text-white hover:bg-indigo-700"
        >
          <FaPlus className="mr-2" /> Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No address found 😴</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className={`p-4 rounded-lg border-2 ${
                addr.isDefault ? "border-green-500 bg-green-50" : "border-gray-200 bg-white"
              } shadow`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-900">{addr.fullName}</h3>
                  <p className="text-gray-600 text-sm">{addr.phone}</p>
                  <p className="text-gray-600 text-sm">{addr.addressLine}</p>
                  <p className="text-gray-600 text-sm">
                    {addr.city}, {addr.postalCode}
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-indigo-900">Add New Address</h3>
            <form onSubmit={handleAddAddress} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                placeholder="Address Line"
                value={formData.addressLine}
                onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="input input-bordered w-full"
                required
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                className="input input-bordered w-full"
                required
              />

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
