import React, { useContext, useEffect, useState } from 'react';
import OrdersTable from '../../components/OrdersTable';
import { toast } from 'react-toastify';
import api from '../../Interceptor/Api';
import AuthContext from '../../context/AuthContext';


const AssignedOrders = () => {

    const [assignedOrders, setAssignedOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    

    useEffect(() => {
        if (user == null)
            return;

        const url = `order/getAssignedOrder/${user?.Id}`;
        api.get(url)
            .then(res => {
                if (res.status !== 200) {
                    alert("Unauthorize Action");
                    return;
                }
                setAssignedOrders(res.data);
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
            })

    }, [user])
    console.log(assignedOrders)

    const handleAcceptBtn = async (id) => {

        try {
            const response = await api.put(`order/ontheway/${id}`)
            if (response.data) {
                const newAssignedOrders = assignedOrders.filter(order => order.Id !== id)
                setAssignedOrders(newAssignedOrders);
                toast.success("Accept  OrderId : " + id);
                return;
            }
            toast.success("Order Cant Accept");
        }
        catch (err) {
            console.log(err.message)
        }


    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-6">
            <div className="container mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 border-b pb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Assigned Orders
                        </h1>
                        <p className="text-sm text-gray-500">
                            Orders assigned to you for delivery
                        </p>
                    </div>
                    <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm font-medium">
                        Total: {assignedOrders.length}
                    </span>
                </div>

                {/* Table or Loading */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <h2 className="text-lg font-semibold text-gray-500 animate-pulse">
                            Loading orders...
                        </h2>
                    </div>
                ) : assignedOrders.length === 0 ? (
                    <div className="flex justify-center items-center py-20">
                        <h2 className="text-lg font-semibold text-gray-500">
                            No assigned orders found.
                        </h2>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                        <table className="min-w-full border-collapse text-sm">
                            <thead className="bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 font-semibold uppercase text-[13px]">
                                <tr>
                                    <th className="px-6 py-4 text-left">Order ID</th>
                                    <th className="px-6 py-4 text-left">Order Date</th>
                                    <th className="px-6 py-4 text-left">Customer</th>
                                    <th className="px-6 py-4 text-left">Status</th>
                                    <th className="px-6 py-4 text-left">Shipping Address</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
                                {assignedOrders.map((order, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-indigo-50 transition-all duration-200 ease-in-out"
                                    >
                                        {/* Order ID */}
                                        <td className="px-6 py-4 font-medium text-gray-900">
                                            #{order?.Id}
                                        </td>

                                        {/* Date */}
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
                                                className={`px-3 py-1 rounded-full text-xs font-semibold 
                                                ${order?.OrderStatus?.Status === "Delivered"
                                                        ? "bg-green-100 text-green-700"
                                                        : order?.OrderStatus?.Status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : order?.OrderStatus?.Status === "Cancelled"
                                                                ? "bg-red-100 text-red-700"
                                                                : "bg-blue-100 text-blue-700"
                                                    }`}
                                            >
                                                {order?.OrderStatus?.Status}
                                            </span>
                                        </td>

                                        {/* Address */}
                                        <td className="px-6 py-4 text-gray-600">
                                            {order?.Customer?.ShippingAddress
                                                ? `${order?.Customer?.ShippingAddress?.Location}, ${order?.Customer?.ShippingAddress?.City}`
                                                : "N/A"}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleAcceptBtn(order.Id)}
                                                    className="btn px-4 py-2 bg-green-700 hover:bg-indigo-600 text-white rounded-md text-xs font-medium shadow transition duration-200"
                                                >
                                                    Accept
                                                </button>

                                                <button
                                                    className="btn btn-error px-4 py-2  hover:bg-red-600 text-white rounded-md text-xs font-medium shadow transition duration-200"
                                                >
                                                    Cancel
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

export default AssignedOrders;