import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";
import Swal from "sweetalert2";

const ManageOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/notifications/${user.email}`);
      return res.data;
    },
  });
   // ✅ শুধুমাত্র Pending order filter করা হচ্ছে
  const pendingOrders = notifications.filter(
    (notif) => notif.order?.orderStatus === "Pending"
  );
  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-indigo-200 h-full">
      <h2 className="text-2xl font-bold text-indigo-900 mb-4">
        🧾 Manage Orders
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {pendingOrders.map((notif, index) => (
            <div
              key={notif._id}
              className="bg-white shadow-lg rounded-xl border border-indigo-200 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-indigo-900 text-white px-4 py-3 flex justify-between items-center">
                <h3 className="font-semibold text-lg">Order #{index + 1}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    notif.order?.orderStatus === "Pending"
                      ? "bg-yellow-400 text-yellow-900"
                      : notif.order?.orderStatus === "Cancelled"
                      ? "bg-red-400 text-white"
                      : "bg-green-400 text-green-900"
                  }`}
                >
                  {notif.order?.orderStatus}
                </span>
              </div>
              {/* Body */}
              <div className="p-4 space-y-4">
                {/* Buyer Info */}
                <div>
                  <h4 className="text-indigo-800 font-bold mb-1">Buyer Info</h4>
                  <p className="font-semibold text-gray-800">
                    {notif.order?.buyerName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {notif.order?.buyerEmail}
                  </p>
                </div>
                {/* Address */}
                {notif.order?.defaultAddress && (
                  <div className="bg-indigo-50 border-l-4 border-indigo-600 p-3 rounded">
                    <h4 className="font-semibold text-indigo-900 mb-1">
                      Delivery Address
                    </h4>
                    <p>{notif.order.defaultAddress.name}</p>
                    <p>{notif.order.defaultAddress.phone}</p>
                    <p className="text-sm text-gray-600">
                      {notif.order.defaultAddress.address},{" "}
                      {notif.order.defaultAddress.city} -{" "}
                      {notif.order.defaultAddress.postCode}
                    </p>
                  </div>
                )}
                {/* Products */}
                <div>
                  <h4 className="text-indigo-800 font-bold mb-1">Products</h4>
                  <div className="space-y-2">
                    {notif.order?.items?.map((p, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center border-b border-gray-200 pb-1"
                      >
                        <div>
                          <p className="font-medium text-indigo-900">
                            {p.name} [{p.productId}]
                          </p>
                          <p className="text-sm text-gray-600">
                            Qty: {p.quantity} × ৳{p.price}
                          </p>
                        </div>
                        <span className="font-semibold text-gray-700">
                          ৳{p.total}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Totals */}
                <div className="bg-indigo-100 rounded-lg p-3">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Subtotal</span>
                    <span>৳{notif.order?.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Delivery</span>
                    <span>৳{notif.order?.totalDeliveryCharge}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-indigo-900 mt-1 border-t pt-1">
                    <span>Total</span>
                    <span>৳{notif.order?.grandTotal}</span>
                  </div>
                </div>

                {/* Payment & Tracking */}
                <div className="flex flex-wrap justify-between items-center mt-3 text-sm text-gray-700">
                  <p>
                  <span className="font-medium">{notif.order?.paymentMethod}
                    </span>
                  </p>
                  <p>
                    Tracking ID:{" "}
                    <span className="font-semibold">
                      {notif.order?.trackingId}
                    </span>
                  </p>
                </div>

                {/* Date */}
                <div className="text-right text-xs text-gray-500">{new Date(notif.date).toLocaleString()}</div>

                <div className="text-right text-xs text-white">
                  <button className="btn btn-sm bg-green-500 mr-4">Accept</button>
                  <button className="btn btn-sm bg-red-500">Reject</button>
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="bg-indigo-950 p-4 text-green-300 rounded-lg h-fit">
          <h3 className="text-lg font-bold text-white">Notifications</h3>
          <hr className="my-2 border-indigo-700" />
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className="text-sm bg-indigo-900 text-white p-2 rounded"
              >
                <p>{notification.message}</p>
                <p className="text-xs text-gray-300">
                  {new Date(notification.date).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};



export default ManageOrders;
