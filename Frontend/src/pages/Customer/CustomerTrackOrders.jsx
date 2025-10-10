import { useEffect, useState } from "react";
import api from "../../Interceptor/Api";
import { Link } from "react-router-dom";


const CustomerTrackOrders = () => {

    const [trackOrders, setTrackOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("customer/trackOrders")
            .then(res => {
                if (res.status !== 200) {
                    console.log("Something wrong");
                    return;
                }
                setTrackOrders(res.data);
                setLoading(false)
                console.log(res.data);
            })
            .catch(err => {
                console.error(err.messages);
            })
    }, [])

    function convertDateFormate(date) {
        return new Date(date).toLocaleString("en-US", {
            year: "numeric",    // 2025
            month: "short",     // Sep
            day: "numeric",     // 22
            hour: "2-digit",    // 05
            minute: "2-digit",  // 31
            hour12: true        // AM/PM format
        })
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <h1 className="text-2xl font-semibold text-gray-600 animate-pulse">
                        Loading your orders...
                    </h1>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">
                        📦 Track Your Orders{" "}
                        <span className="text-blue-600">
                            ({trackOrders.length})
                        </span>
                    </h1>

                    {/* Empty state */}
                    {trackOrders.length === 0 ? (
                        <div className="bg-white p-10 rounded-xl shadow-md text-center">
                            <h2 className="text-xl font-semibold text-gray-600 mb-2">
                                No orders found
                            </h2>
                            <p className="text-gray-500 mb-6">
                                You haven't placed any orders yet.
                            </p>
                            <Link
                                to="/shop"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
                            >
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-100">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 text-left">Order ID</th>
                                        <th className="px-6 py-4 text-left">Date</th>
                                        <th className="px-6 py-4 text-left">Status</th>
                                        <th className="px-6 py-4 text-left">Deliveryman</th>
                                        <th className="px-6 py-4 text-left">Total</th>
                                        <th className="px-6 py-4 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {trackOrders.map((trackOrder, idx) => (
                                        <tr
                                            key={idx}
                                            className="hover:bg-blue-50/40 transition duration-200"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                #{trackOrder?.Id}
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {convertDateFormate(trackOrder?.Date)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${trackOrder?.OrderStatus?.Status === "Delivered"
                                                            ? "bg-green-100 text-green-700"
                                                            : trackOrder?.OrderStatus?.Status === "Pending"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {trackOrder?.OrderStatus?.Status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-700">
                                                {trackOrder?.DeliveryManId !== 0 ? (
                                                    <span className="font-medium text-gray-800">
                                                        #{trackOrder?.DeliveryManId}
                                                    </span>
                                                ) : (
                                                    <span className="italic text-gray-500">
                                                        Not assigned yet
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-blue-600">
                                                ৳ {trackOrder?.Total}
                                            </td>
                                            <td className="px-6 py-4 flex justify-center gap-3">
                                                <Link
                                                    to={`/customerDashboard/trackOrderDetails/${trackOrder.Id}`}
                                                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition"
                                                >
                                                    Details
                                                </Link>
                                                <button
                                                    className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg font-medium transition"
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
        
    );
};

export default CustomerTrackOrders;