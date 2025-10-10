import { useEffect, useState } from "react";
import api from "../../Interceptor/Api";
import { Link } from "react-router-dom";

const TrackOrders = () => {
    const [trackOrders, setTrackOrder] = useState([]);
    const [countDeliveredOrders, setCountDeliveredOrders] = useState(0);
    const [countOnTheWayOrders, setCountOnTheWayOrders] = useState(0);
    const [countAssignedOrders, setCountAssignedOrders] = useState(0);

    const convertDateFormate = (date) =>
        new Date(date).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

    const count = (orders, statusId) =>
        orders.filter((order) => order.OrderStatusID === statusId).length;

    const loadAllData = () => {
        api
            .get("order/trackOrders")
            .then((res) => {
                if (res.status !== 200) {
                    alert("Unauthorized action");
                    return;
                }
                setTrackOrder(res.data);
                setCountAssignedOrders(count(res.data, 3));
                setCountOnTheWayOrders(count(res.data, 4));
                setCountDeliveredOrders(count(res.data, 5));
            })
            .catch((err) => console.error(err));
    };

    useEffect(loadAllData, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {trackOrders.length > 0 && (
                <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white shadow-md rounded-lg p-4 text-center">
                            <h2 className="text-sm text-gray-500">Total Orders</h2>
                            <p className="text-2xl font-bold text-indigo-600">{trackOrders.length}</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-4 text-center">
                            <h2 className="text-sm text-gray-500">Assigned</h2>
                            <p className="text-2xl font-bold text-yellow-600">{countAssignedOrders}</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-4 text-center">
                            <h2 className="text-sm text-gray-500">On The Way</h2>
                            <p className="text-2xl font-bold text-blue-600">{countOnTheWayOrders}</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg p-4 text-center">
                            <h2 className="text-sm text-gray-500">Delivered</h2>
                            <p className="text-2xl font-bold text-green-600">{countDeliveredOrders}</p>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="overflow-x-auto bg-white rounded-xl shadow-lg ring-1 ring-gray-200">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700 uppercase font-semibold tracking-wide">
                                <tr>
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4">Shipping Address</th>
                                    <th className="px-6 py-4">Deliveryman</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                {trackOrders.map((to) => (
                                    <tr key={to.Id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">#{to.Id}</td>
                                        <td className="px-6 py-4 text-gray-700">{to.Customer?.Name}</td>
                                        <td className="px-6 py-4 text-gray-600">{convertDateFormate(to.Date)}</td>
                                        <td className="px-6 py-4 text-gray-700">{to.Total} TK</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {to.Customer?.ShippingAddress?.City}, {to.Customer?.ShippingAddress?.Location}
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">{to.DeliveryManId || "—"}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${to.OrderStatus?.Status === "Delivered"
                                                        ? "bg-green-100 text-green-700"
                                                        : to.OrderStatus?.Status === "On The Way"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : to.OrderStatus?.Status === "Assigned"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {to.OrderStatus?.Status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Link
                                                to={`/adminDashboard/viewPlaceOrderDetails/${to.Id}`}
                                                className="inline-block px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition"
                                            >
                                                View
                                            </Link>
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

        </div>
    );
};

export default TrackOrders;