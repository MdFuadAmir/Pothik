import SectionTitle from "../../../Shared/Sectiontitle/SectionTitle";
import { useState } from "react";
import { FaMotorcycle } from "react-icons/fa";

// 🧾 Example rider data
const riderData = [
  {
    _id: "1",
    name: "Mango Mama",
    email: "mango@gmail.com",
    workLocation: "Dhaka",
    vehicle: "Bike",
    status: "active",
  },
  {
    _id: "2",
    name: "Rider Two",
    email: "rider2@gmail.com",
    workLocation: "Chattogram",
    vehicle: "Bike",
    status: "inactive",
  },
  {
    _id: "3",
    name: "Rider Three",
    email: "rider3@gmail.com",
    workLocation: "Dhaka",
    vehicle: "Van",
    status: "active",
  },
  {
    _id: "4",
    name: "Rider Four",
    email: "rider4@gmail.com",
    workLocation: "Khulna",
    vehicle: "Bike",
    status: "active",
  },
  {
    _id: "5",
    name: "Rider Five",
    email: "rider5@gmail.com",
    workLocation: "Rajshahi",
    vehicle: "Van",
    status: "active",
  },
  {
    _id: "6",
    name: "Rider Six",
    email: "rider6@gmail.com",
    workLocation: "Barishal",
    vehicle: "Bike",
    status: "inactive",
  },
  {
    _id: "7",
    name: "Rider Seven",
    email: "rider7@gmail.com",
    workLocation: "Dhaka",
    vehicle: "Van",
    status: "active",
  },
  {
    _id: "8",
    name: "Rider Eight",
    email: "rider8@gmail.com",
    workLocation: "Chattogram",
    vehicle: "Bike",
    status: "active",
  },
  {
    _id: "9",
    name: "Rider Nine",
    email: "rider9@gmail.com",
    workLocation: "Khulna",
    vehicle: "Van",
    status: "active",
  },
  {
    _id: "10",
    name: "Rider Ten",
    email: "rider10@gmail.com",
    workLocation: "Dhaka",
    vehicle: "Bike",
    status: "active",
  },
  {
    _id: "11",
    name: "Rider Eleven",
    email: "rider11@gmail.com",
    workLocation: "Dhaka",
    vehicle: "Bike",
    status: "active",
  },
  {
    _id: "12",
    name: "Rider Twelve",
    email: "rider12@gmail.com",
    workLocation: "Chattogram",
    vehicle: "Van",
    status: "active",
  },
  {
    _id: "13",
    name: "Rider Thirteen",
    email: "rider13@gmail.com",
    workLocation: "Barishal",
    vehicle: "Bike",
    status: "active",
  },
  {
    _id: "14",
    name: "Rider Fourteen",
    email: "rider14@gmail.com",
    workLocation: "Dhaka",
    vehicle: "Van",
    status: "active",
  },
  {
    _id: "15",
    name: "Rider Fifteen",
    email: "rider15@gmail.com",
    workLocation: "Khulna",
    vehicle: "Bike",
    status: "inactive",
  },
  {
    _id: "16",
    name: "Rider Sixteen",
    email: "rider16@gmail.com",
    workLocation: "Rajshahi",
    vehicle: "Van",
    status: "active",
  },
  {
    _id: "17",
    name: "Rider Seventeen",
    email: "rider17@gmail.com",
    workLocation: "Dhaka",
    vehicle: "Bike",
    status: "active",
  },
  {
    _id: "18",
    name: "Rider Eighteen",
    email: "rider18@gmail.com",
    workLocation: "Chattogram",
    vehicle: "Van",
    status: "active",
  },
  {
    _id: "19",
    name: "Rider Nineteen",
    email: "rider19@gmail.com",
    workLocation: "Khulna",
    vehicle: "Bike",
    status: "active",
  },
  {
    _id: "20",
    name: "Rider Twenty",
    email: "rider20@gmail.com",
    workLocation: "Dhaka",
    vehicle: "Van",
    status: "active",
  },
  // ... আরও rider add করা যাবে
];

// 🏙 Example districts
const districts = [
  "All Districts",
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Barishal",
];

const SellerAssignRider = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [requestedRider, setRequestedRider] = useState(null);

  const handleRequestRider = (rider) => {
    setRequestedRider(rider);
    alert(`Request sent to ${rider.name}`);
  };

  // Filter riders by selected district
  let filteredRiders =
    selectedDistrict && selectedDistrict !== "All Districts"
      ? riderData.filter((rider) => rider.workLocation === selectedDistrict)
      : riderData;

  // Limit to 15 riders for UI
  filteredRiders = filteredRiders.slice(0, 15);

  return (
    <section className="p-6 bg-indigo-200">
      <SectionTitle
        sectionTitle="Assign Rider"
        sectionSubTitle="Select a district to view available riders"
      />

      {/* Dropdown to select district */}
      <div className="mb-6 w-full md:w-1/3">
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="select select-bordered w-full"
        >
          {districts.map((district, idx) => (
            <option key={idx} value={district}>
              {district}
            </option>
          ))}
        </select>
      </div>

      {/* Rider List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRiders.length > 0 ? (
          filteredRiders.map((rider) => (
            <div
              key={rider._id}
              className="bg-indigo-950 text-white p-4 rounded-xl shadow flex flex-col justify-between"
            >
              <div className="flex items-center gap-3 mb-2">
                <FaMotorcycle className="text-yellow-400 text-2xl" />
                <div>
                  <h3 className="font-semibold">{rider.name}</h3>
                  <p className="text-sm text-gray-300 capitalize">
                    {rider.vehicle} -{" "}
                    {rider.status === "active" ? "Available" : "Not Available"}
                  </p>
                </div>
              </div>

              {rider.status === "active" ? (
                <button
                  onClick={() => handleRequestRider(rider)}
                  className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-all"
                >
                  Send Request
                </button>
              ) : (
                <button
                  disabled
                  className="mt-2 w-full bg-gray-400 text-white py-2 rounded-lg font-semibold cursor-not-allowed"
                >
                  Not Available
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-700 font-semibold p-6 bg-white rounded-xl shadow">
            No riders available
          </div>
        )}
      </div>

      {requestedRider && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg shadow">
          Request sent to: {requestedRider.name} ({requestedRider.vehicle})
        </div>
      )}
    </section>
  );
};

export default SellerAssignRider;
