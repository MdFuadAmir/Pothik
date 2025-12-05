import { useState } from "react";
import { FaUserCircle, FaEdit, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Profile = () => {
  const [edit, setEdit] = useState(false);

  const user = {
    name: "Mahfuzur Rahman",
    email: "mahfuz@example.com",
    phone: "+880170000000",
    address: "Gazipur, Bangladesh",
    avatar: "",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8">
        
        {/* Header */}
        <div className="flex items-center gap-6 border-b pb-6">
          {user.avatar ? (
            <img
              src={user.avatar}
              className="w-24 h-24 rounded-full border"
            />
          ) : (
            <FaUserCircle className="text-gray-500 w-24 h-24" />
          )}

          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
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

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <FaEnvelope className="text-blue-600 text-xl" />
            <p className="text-gray-700">{user.email}</p>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <FaPhone className="text-green-600 text-xl" />
            <p className="text-gray-700">{user.phone}</p>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <FaMapMarkerAlt className="text-red-600 text-xl" />
            <p className="text-gray-700">{user.address}</p>
          </div>
        </div>

        {/* Edit Mode */}
        {edit && (
          <div className="mt-8 p-6 bg-gray-100 rounded-xl shadow-inner">
            <h2 className="font-bold text-xl mb-4">Edit Your Info</h2>

            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="p-3 border rounded-lg"
                defaultValue={user.name}
              />
              <input
                type="email"
                placeholder="Email"
                className="p-3 border rounded-lg"
                defaultValue={user.email}
              />
              <input
                type="text"
                placeholder="Phone"
                className="p-3 border rounded-lg"
                defaultValue={user.phone}
              />
              <input
                type="text"
                placeholder="Address"
                className="p-3 border rounded-lg"
                defaultValue={user.address}
              />

              <button className="w-full bg-green-600 text-white p-3 rounded-lg mt-3">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
