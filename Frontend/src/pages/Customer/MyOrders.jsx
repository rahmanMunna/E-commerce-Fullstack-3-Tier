import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Interceptor/Api";
import { Loader2, PackageCheck, Clock, XCircle, Truck } from "lucide-react";

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("customer/myOrders");
                if (res.status === 200) setMyOrders(res.data);
                else console.error("Something went wrong");
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {loading ? (
                <div className="flex flex-col justify-center items-center h-[70vh] space-y-4">
                    <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
                    <h1 className="text-2xl font-semibold text-gray-600 animate-pulse">
                        Loading your orders...
                    </h1>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        🛒 My Orders{" "}
                        <span className="text-blue-600">({myOrders.length})</span>
                    </h1>

                    {myOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                                alt="No Orders"
                                className="w-40 mb-6 opacity-80"
                            />
                            <h2 className="text-xl font-semibold text-gray-600">
                                You haven't placed any orders yet
                            </h2>
                            <p className="text-gray-500 mt-2">
                                Start shopping and your orders will appear here.
                            </p>
                            <Link
                                to="/shop"
                                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition"
                            >
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {myOrders.map((order, idx) => {
                                const status = order?.OrderStatus?.Status;
                                const statusClasses =
                                    status === "Delivered"
                                        ? "bg-green-100 text-green-700"
                                        : status === "Pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700";

                                const statusIcon =
                                    status === "Delivered" ? (
                                        <PackageCheck className="inline w-4 h-4 mr-1" />
                                    ) : status === "Pending" ? (
                                        <Clock className="inline w-4 h-4 mr-1" />
                                    ) : (
                                        <XCircle className="inline w-4 h-4 mr-1" />
                                    );

                                return (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-100"
                                    >
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                Order #{order.Id}
                                            </h2>
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusClasses}`}
                                            >
                                                {statusIcon}
                                                {status}
                                            </span>
                                        </div>

                                        <div className="text-gray-600 text-sm space-y-2">
                                            <p>
                                                <span className="font-medium text-gray-800">
                                                    Date:
                                                </span>{" "}
                                                {order?.Date
                                                    ? new Date(order.Date).toLocaleDateString()
                                                    : "N/A"}
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800">
                                                    Total:
                                                </span>{" "}
                                                <span className="text-blue-600 font-semibold">
                                                    ৳ {order?.Total}
                                                </span>
                                            </p>
                                            <p>
                                                <span className="font-medium text-gray-800">
                                                    Deliveryman:
                                                </span>{" "}
                                                {order?.DeliveryManId !== 0 ? (
                                                    <span className="flex items-center gap-1 text-gray-700">
                                                        <Truck className="w-4 h-4 text-blue-500" />
                                                        #{order?.DeliveryManId}
                                                    </span>
                                                ) : (
                                                    <span className="italic text-gray-400">
                                                        Not assigned yet
                                                    </span>
                                                )}
                                            </p>
                                        </div>

                                        <div className="mt-5 flex justify-end">
                                            <Link
                                                to={`/customerDashboard/trackOrderDetails/${order.Id}`}
                                                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg shadow transition"
                                            >
                                                View Details
                                            </Link>
                                        
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
