import React, { useEffect, useState } from 'react';
import api from '../../Interceptor/Api';
import { Loader2, PackageCheck, Clock, XCircle } from "lucide-react";

const TodayReceivedOrders = () => {

    const [receivedOrders, setReceivedOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = () => {
        const url = "order/todayReceivedOrders";
        api.get(url)
            .then(res => {
                if (res.status !== 200) {
                    console.error("Something  Wrong");
                    return
                }
                setReceivedOrders(res.data)
                setLoading(false)

            })
            .catch(err => {
                console.error(err.message)
            })
    }
    useEffect(() => {
        loadData();
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            {loading ? (
                <div className="flex flex-col justify-center items-center h-[70vh] space-y-4">
                    <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
                    <h1 className="text-2xl font-semibold text-gray-600 animate-pulse">
                        Loading received orders...
                    </h1>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        📥 Received Orders{" "}
                        <span className="text-blue-600">
                            ({receivedOrders.length})
                        </span>
                    </h1>

                    {receivedOrders.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                                alt="No Orders"
                                className="w-40 mb-6 opacity-80"
                            />
                            <h2 className="text-xl font-semibold text-gray-600">
                                No Orders Received Today
                            </h2>
                            <p className="text-gray-500 mt-2">
                                You haven’t received any new orders yet.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-100">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-50 text-gray-700 text-sm uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">Order ID</th>
                                        <th className="px-6 py-4 text-left font-semibold">Total</th>
                                        <th className="px-6 py-4 text-left font-semibold">DeliveryMan ID</th>
                                        <th className="px-6 py-4 text-left font-semibold">Status</th>
                                        <th className="px-6 py-4 text-left font-semibold">Order Date</th>
                                        <th className="px-6 py-4 text-left font-semibold">Delivered Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {receivedOrders.map((ro, idx) => {
                                        const status = ro?.OrderStatus?.Status;
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
                                            <tr
                                                key={idx}
                                                className="hover:bg-gray-50 transition duration-150"
                                            >
                                                <td className="px-6 py-4 font-medium text-gray-900">
                                                    #{ro?.Id}
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-blue-600">
                                                    ৳ {ro?.Total}
                                                </td>
                                                <td className="px-6 py-4 text-gray-700">
                                                    {ro?.DeliveryManId || (
                                                        <span className="italic text-gray-400">
                                                            Not assigned
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusClasses}`}
                                                    >
                                                        {statusIcon}
                                                        {status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-700">
                                                    {ro?.Date
                                                        ? new Date(ro.Date).toLocaleDateString()
                                                        : "—"}
                                                </td>
                                                <td className="px-6 py-4 text-gray-700">
                                                    {ro?.DeliveredAt
                                                        ? new Date(ro.DeliveredAt).toLocaleDateString()
                                                        : <span className="text-gray-400 italic">Not delivered</span>}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TodayReceivedOrders;