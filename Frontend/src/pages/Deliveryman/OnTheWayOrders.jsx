import React, { useEffect, useState } from 'react';
import OrdersTable from '../../components/OrdersTable';
import { toast } from 'react-toastify';
import api from '../../Interceptor/Api';

const OnTheWayOrders = () => {

    const [onTheWayOrders, setOnTheWayOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDeliveredBtn = async (id) => {
        const response = await api.put(`order/delivered/${id}`);
        if (response.data) {
            setLoading(true)
            toast.success("Order : " + id + " has  been delivered");
        }

    }

    useEffect(() => {
        api.get("order/getOnTheWayOrder")
            .then(response => {
                setOnTheWayOrders(response.data)
                setLoading(false)
                console.log(response)
            })
            .catch(err => {
                console.error(err.message)
            })

    }, [loading])



    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6">
            <div className="container mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        On The Way 
                    </h1>
                    <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
                        Total: {onTheWayOrders.length}
                    </span>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <h2 className="text-lg font-semibold text-gray-500 animate-pulse">
                            Loading orders...
                        </h2>
                    </div>
                ) : onTheWayOrders.length === 0 ? (
                    <div className="flex justify-center items-center py-20">
                        <h2 className="text-lg font-semibold text-gray-500">
                            No orders on the way.
                        </h2>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                        <table className="min-w-full border-collapse text-sm">
                            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 font-semibold uppercase text-[13px]">
                                <tr>
                                    <th className="px-6 py-3 text-left">Order ID</th>
                                    <th className="px-6 py-3 text-left">Order Date</th>
                                    <th className="px-6 py-3 text-left">Customer</th>
                                    <th className="px-6 py-3 text-left">Status</th>
                                    <th className="px-6 py-3 text-left">Shipping Address</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
                                {onTheWayOrders.map((order, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-blue-50 transition-all duration-200 ease-in-out"
                                    >
                                        {/* Order ID */}
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            #{order?.Id}
                                        </td>

                                        {/* Order Date */}
                                        <td className="px-6 py-4 text-gray-600">
                                            {new Date(order?.Date).toLocaleDateString("en-GB")}
                                        </td>

                                        {/* Customer */}
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {order?.Customer?.Name || "N/A"}
                                        </td>

                                        {/* Status Badge */}
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold bg-indigo-300`}
                                            >
                                                {order?.OrderStatus?.Status}
                                            </span>
                                        </td>

                                        {/* Shipping Address */}
                                        <td className="px-6 py-4 text-gray-600">
                                            {order?.Customer?.ShippingAddress
                                                ? `${order?.Customer?.ShippingAddress?.Location}, ${order?.Customer?.ShippingAddress?.City}`
                                                : "N/A"}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleDeliveredBtn(order.Id)}
                                                    className="px-4 py-2 btn bg-green-500 hover:bg-green-600 hover:scale-105 text-white rounded-md text-xs font-medium shadow transition duration-200"
                                                >
                                                    Mark Delivered
                                                </button>
                                               
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>

    );
};

export default OnTheWayOrders;