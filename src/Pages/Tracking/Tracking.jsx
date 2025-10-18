
import { FaTruck, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";

const Tracking = () => {
    const {loading} = useAuth()
  const parcel ={
    trackingId: "TRK-1005",
    status: "Delivered", // Delivered, Pending, In Transit, Cancelled
    sender: "Fuad Ahmed",
    recipient: "Raisa Akter",
    pickupDate: "2025-10-16",
    estimatedDelivery: "2025-10-19",
    currentLocation: "Dhaka, Bangladesh",
    rider: {
      name: "Hasan Ali",
      phone: "+880 1234 567890",
    },
    history: [
      { date: "2025-10-16", location: "Dhaka Hub", status: "Picked up" },
      { date: "2025-10-17", location: "Gazipur", status: "In Transit" },
      { date: "2025-10-18", location: "Dhaka", status: "Out for Delivery" },
    ],
  }

  // Status color mapping
  const statusColor = {
    "Delivered": "text-green-500",
    "In Transit": "text-blue-500",
    "Pending": "text-yellow-500",
    "Cancelled": "text-red-500",
  };
  if(loading){
    return <Loading></Loading>
  }
  return (
    <div className="p-4 md:p-8 bg-indigo-200 min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-2">
        📦 Track Your Parcel
      </h2>
      <p className="text-gray-600 mb-6">
        Enter your tracking ID to see the real-time status of your parcel.
      </p>

      {/* Parcel Overview */}
      <div className="bg-indigo-950 rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">
          Tracking ID: <span className="font-bold">{parcel.trackingId}</span>
        </h3>
        <p className={`font-semibold text-lg ${statusColor[parcel.status]}`}>
          Status: {parcel.status}
        </p>
        <p className="text-gray-300 mt-2">Current Location: {parcel.currentLocation}</p>
        <p className="text-gray-300">Estimated Delivery: {parcel.estimatedDelivery}</p>
      </div>

      {/* Rider Info */}
      <div className="bg-indigo-950 rounded-xl shadow-lg p-6 mb-6 text-gray-200">
        <h3 className="text-lg font-semibold mb-2">Rider Details</h3>
        <p><strong>Name:</strong> {parcel.rider.name}</p>
        <p><strong>Phone:</strong> {parcel.rider.phone}</p>
      </div>

      {/* Tracking History */}
      <div className="bg-indigo-950 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Parcel History</h3>
        <div className="space-y-4">
          {parcel.history.map((event, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                {event.status === "Delivered" ? (
                  <FaCheckCircle className="text-green-600 text-xl" />
                ) : event.status === "In Transit" ? (
                  <FaTruck className="text-blue-500 text-xl" />
                ) : (
                  <FaHourglassHalf className="text-yellow-500 text-xl" />
                )}
                {index !== parcel.history.length - 1 && (
                  <div className="w-px h-10 bg-gray-300 mt-1"></div>
                )}
              </div>
              <div>
                <p className="font-semibold text-base-100">{event.status}</p>
                <p className="text-gray-400 text-sm">{event.date} - {event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tracking;